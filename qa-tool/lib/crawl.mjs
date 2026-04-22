import { chromium } from 'playwright'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { writeFile, mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pageCheckScript, seoCheckScript } from './checks.mjs'
import { compareOrSave } from './visual.mjs'
import { slugifyUrl, sameOrigin, finding, SEVERITY } from './util.mjs'

const require = createRequire(import.meta.url)

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1 },
  { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
]

async function loadAxeSource() {
  // Read axe-core bundle from node_modules so it runs entirely offline.
  const axePath = require.resolve('axe-core/axe.min.js')
  return readFile(axePath, 'utf8')
}

async function runOnPage({ page, url, viewport, axeSource }) {
  const consoleMessages = []
  const pageErrors = []
  const failedRequests = []
  const badResponses = []

  page.on('console', (msg) => {
    const type = msg.type()
    if (type === 'error' || type === 'warning') {
      consoleMessages.push({ type, text: msg.text(), location: msg.location() })
    }
  })
  page.on('pageerror', (err) => pageErrors.push({ name: err.name, message: err.message, stack: err.stack }))
  page.on('requestfailed', (req) => {
    failedRequests.push({ url: req.url(), method: req.method(), failure: req.failure()?.errorText })
  })
  page.on('response', (res) => {
    const status = res.status()
    if (status >= 400) badResponses.push({ url: res.url(), status, method: res.request().method() })
  })

  const start = Date.now()
  let navResponse
  try {
    navResponse = await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 })
  } catch (err) {
    return {
      url, viewport: viewport.name,
      loadMs: Date.now() - start,
      status: 0,
      findings: [finding(SEVERITY.ERROR, 'nav-failed', `Navigation failed: ${err.message}`)],
      links: [],
      screenshot: null,
    }
  }
  const loadMs = Date.now() - start
  const status = navResponse?.status() ?? 0

  // Settle: give animations/fonts/images a beat.
  await page.waitForLoadState('domcontentloaded').catch(() => {})
  try { await page.evaluate(() => document.fonts && document.fonts.ready) } catch {}
  await page.waitForTimeout(400)

  const findings = []
  if (status >= 400) {
    findings.push(finding(SEVERITY.ERROR, 'http-error', `Page returned HTTP ${status}`, { status }))
  }

  // Run in-page DOM + SEO checks
  const domFindings = await page.evaluate(pageCheckScript())
  const seoFindings = await page.evaluate(seoCheckScript())
  for (const f of [...domFindings, ...seoFindings]) findings.push(f)

  // Console + network
  for (const c of consoleMessages) {
    findings.push(finding(
      c.type === 'error' ? SEVERITY.ERROR : SEVERITY.WARN,
      `console-${c.type}`,
      c.text.slice(0, 300),
      { location: c.location }
    ))
  }
  for (const e of pageErrors) {
    findings.push(finding(SEVERITY.ERROR, 'uncaught-exception', `${e.name}: ${e.message}`, { stack: e.stack }))
  }
  for (const r of failedRequests) {
    // Ignore beacons / analytics failures that are routine in dev
    if (/google-analytics|googletagmanager|doubleclick|facebook\.com\/tr/.test(r.url)) continue
    findings.push(finding(SEVERITY.WARN, 'request-failed', `Network request failed: ${r.url}`, r))
  }
  for (const r of badResponses) {
    findings.push(finding(
      r.status >= 500 ? SEVERITY.ERROR : SEVERITY.WARN,
      'http-bad-response',
      `${r.status} on ${r.url}`,
      r
    ))
  }

  // Axe a11y scan
  try {
    await page.addScriptTag({ content: axeSource })
    const axeResult = await page.evaluate(async () => {
      return await window.axe.run(document, {
        resultTypes: ['violations'],
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'best-practice'] },
      })
    })
    for (const v of axeResult.violations) {
      const sev = v.impact === 'critical' || v.impact === 'serious' ? SEVERITY.ERROR : SEVERITY.WARN
      findings.push(finding(sev, `a11y-${v.id}`, `${v.help} (${v.nodes.length} node${v.nodes.length === 1 ? '' : 's'})`, {
        impact: v.impact,
        helpUrl: v.helpUrl,
        nodes: v.nodes.slice(0, 3).map((n) => ({ target: n.target, html: n.html.slice(0, 200) })),
      }))
    }
  } catch (err) {
    findings.push(finding(SEVERITY.INFO, 'a11y-scan-skipped', `axe-core scan failed: ${err.message}`))
  }

  // Extract same-origin links
  const links = await page.evaluate(() => {
    const out = new Set()
    for (const a of document.querySelectorAll('a[href]')) {
      try {
        const u = new URL(a.getAttribute('href'), location.href)
        u.hash = ''
        if (u.protocol === 'http:' || u.protocol === 'https:') out.add(u.href)
      } catch {}
    }
    return [...out]
  })

  return { url, viewport: viewport.name, loadMs, status, findings, links }
}

export async function crawl({ seedUrl, outputDir, baselinesDir, maxPages, updateBaseline, only, viewports }) {
  const axeSource = await loadAxeSource()
  const browser = await chromium.launch()
  const results = []
  const visited = new Set()
  const queue = [seedUrl]
  const onlySet = only ? new Set(only) : null

  const vpNames = viewports || VIEWPORTS.map((v) => v.name)
  const activeVps = VIEWPORTS.filter((v) => vpNames.includes(v.name))

  try {
    while (queue.length && visited.size < maxPages) {
      const url = queue.shift()
      if (visited.has(url)) continue
      if (!sameOrigin(url, seedUrl)) continue
      if (onlySet && !onlySet.has(url)) continue
      visited.add(url)

      for (const viewport of activeVps) {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
          deviceScaleFactor: viewport.deviceScaleFactor,
          isMobile: viewport.isMobile,
          hasTouch: viewport.hasTouch,
          userAgent: viewport.isMobile
            ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 site-qa'
            : undefined,
        })
        const page = await context.newPage()
        let res
        try {
          res = await runOnPage({ page, url, viewport, axeSource })

          // Screenshot + visual diff
          const slug = slugifyUrl(url)
          const shotPath = join(outputDir, 'screenshots', `${slug}-${viewport.name}.png`)
          await mkdir(dirname(shotPath), { recursive: true })
          const buf = await page.screenshot({ fullPage: true, type: 'png' })
          await writeFile(shotPath, buf)

          const baselinePath = join(baselinesDir, `${slug}-${viewport.name}.png`)
          const diffPath = join(outputDir, 'diffs', `${slug}-${viewport.name}.png`)
          const visual = await compareOrSave({
            pngBuffer: buf,
            baselinePath,
            diffPath,
            updateBaseline,
          })
          res.screenshot = shotPath
          res.baseline = baselinePath
          res.diff = visual.status === 'diff' || visual.status === 'size-changed' ? diffPath : null
          res.visual = visual
          if (visual.status === 'diff' && visual.diffRatio > 0.01) {
            res.findings.push(finding(SEVERITY.WARN, 'visual-regression',
              `Visual diff vs baseline: ${(visual.diffRatio * 100).toFixed(2)}% of pixels changed`,
              visual))
          }
          if (visual.status === 'size-changed') {
            res.findings.push(finding(SEVERITY.WARN, 'visual-size-changed',
              `Screenshot size changed vs baseline`, visual))
          }

          // Only queue internal links from desktop pass to avoid dup work
          if (viewport.name === activeVps[0].name) {
            for (const link of res.links || []) {
              if (!visited.has(link) && sameOrigin(link, seedUrl)) queue.push(link)
            }
          }
        } finally {
          await context.close()
        }
        results.push(res)
      }
    }
  } finally {
    await browser.close()
  }

  return { results, visited: [...visited] }
}
