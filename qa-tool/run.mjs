#!/usr/bin/env node
import { mkdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { parseArgs, hostSlug, timestamp, fmtDuration } from './lib/util.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))

const USAGE = `site-qa — local QA for any URL

  node run.mjs <url> [flags]

Flags
  --max-pages=N           cap crawl to N unique URLs (default: 25)
  --only=url1,url2        only test these exact URLs (still need seed)
  --viewports=desktop,mobile   viewport set (default: both)
  --no-lighthouse         skip Lighthouse
  --lighthouse=desktop    run Lighthouse against desktop preset (default: mobile)
  --update-baseline       overwrite visual baselines with current screenshots
  --fail-on=error|warn    exit non-zero on this severity or worse (default: error)
  --output=DIR            output directory (default: ./output/<host>-<timestamp>)

Examples
  node run.mjs http://localhost:3000
  node run.mjs https://staging.example.com --max-pages=10
  node run.mjs http://localhost:3000 --update-baseline
  node run.mjs http://localhost:3000 --only=http://localhost:3000/,http://localhost:3000/about
`

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.flags.help || args.flags.h || args._.length === 0) {
    process.stdout.write(USAGE)
    process.exit(args._.length === 0 ? 1 : 0)
  }

  const seedUrl = args._[0]
  try {
    new URL(seedUrl)
  } catch {
    console.error(`Invalid URL: ${seedUrl}`)
    process.exit(1)
  }

  const maxPages = parseInt(args.flags['max-pages'] ?? '25', 10)
  const only = args.flags.only ? args.flags.only.split(',').map((s) => s.trim()) : null
  const viewports = args.flags.viewports ? args.flags.viewports.split(',').map((s) => s.trim()) : null
  const noLighthouse = !!args.flags['no-lighthouse']
  const lighthousePreset = args.flags.lighthouse === 'desktop' ? 'desktop' : 'mobile'
  const updateBaseline = !!args.flags['update-baseline']
  const failOn = args.flags['fail-on'] === 'warn' ? 'warn' : 'error'

  const host = hostSlug(seedUrl)
  const ts = timestamp()
  const outputDir = args.flags.output
    ? resolve(args.flags.output)
    : join(__dirname, 'output', `${host}-${ts}`)
  const baselinesDir = join(__dirname, 'baselines', host)

  await mkdir(outputDir, { recursive: true })
  await mkdir(baselinesDir, { recursive: true })

  let crawl, runLighthouse, writeReport
  try {
    const crawlMod = await import('./lib/crawl.mjs')
    const lhMod = await import('./lib/lighthouse.mjs')
    const reportMod = await import('./lib/report.mjs')
    crawl = crawlMod.crawl
    runLighthouse = lhMod.runLighthouse
    writeReport = reportMod.writeReport
  } catch (err) {
    if (err.code === 'ERR_MODULE_NOT_FOUND') {
      console.error(`\n[site-qa] Missing dependencies. From ${__dirname} run:\n  npm install\n`)
      console.error(`(Original error: ${err.message})`)
      process.exit(2)
    }
    throw err
  }

  const startedAt = new Date()
  process.stdout.write(`\n[site-qa] seed ${seedUrl}\n`)
  process.stdout.write(`[site-qa] output ${outputDir}\n`)
  process.stdout.write(`[site-qa] baselines ${baselinesDir}${updateBaseline ? ' (updating)' : ''}\n\n`)

  // Crawl
  const crawlStart = Date.now()
  process.stdout.write('[site-qa] crawling + screenshotting…\n')
  const { results, visited } = await crawl({
    seedUrl, outputDir, baselinesDir, maxPages, updateBaseline, only, viewports,
  })
  process.stdout.write(`[site-qa] crawled ${visited.length} URL(s) in ${fmtDuration(Date.now() - crawlStart)}\n`)

  // Lighthouse (seed URL only, both categories)
  let lighthouse = null
  if (!noLighthouse) {
    const lhStart = Date.now()
    process.stdout.write(`[site-qa] running Lighthouse (${lighthousePreset})…\n`)
    try {
      lighthouse = await runLighthouse({ url: seedUrl, preset: lighthousePreset })
      // Attach LH findings to the first page entry for the seed URL, or create a synthetic bucket
      const seedEntries = results.filter((r) => r.url === seedUrl || r.url === seedUrl + '/')
      if (seedEntries.length) {
        seedEntries[0].findings.push(...(lighthouse.findings || []))
      } else {
        results.push({
          url: seedUrl, viewport: 'lighthouse', status: 0, loadMs: 0,
          findings: lighthouse.findings || [], links: [], screenshot: null,
        })
      }
      process.stdout.write(`[site-qa] Lighthouse done in ${fmtDuration(Date.now() - lhStart)}\n`)
    } catch (err) {
      process.stderr.write(`[site-qa] Lighthouse failed: ${err.message}\n`)
    }
  }

  const finishedAt = new Date()
  const duration = fmtDuration(finishedAt - startedAt)

  const { reportPath, jsonPath } = await writeReport({
    outputDir,
    seedUrl,
    startedAt: startedAt.toISOString(),
    finishedAt: finishedAt.toISOString(),
    pages: results,
    lighthouse,
    summary: {
      duration,
      pageCount: visited.length,
      viewportCount: viewports?.length || 2,
    },
  })

  const all = results.flatMap((r) => r.findings || [])
  const errs = all.filter((f) => f.severity === 'error').length
  const warns = all.filter((f) => f.severity === 'warn').length
  const infos = all.filter((f) => f.severity === 'info').length

  process.stdout.write(`\n[site-qa] findings: ${errs} error, ${warns} warn, ${infos} info\n`)
  process.stdout.write(`[site-qa] report: ${pathToFileURL(reportPath).href}\n`)
  process.stdout.write(`[site-qa] json:   ${jsonPath}\n`)

  const shouldFail = failOn === 'warn' ? (errs + warns) > 0 : errs > 0
  process.exit(shouldFail ? 1 : 0)
}

main().catch((err) => {
  console.error(err.stack || err.message || err)
  process.exit(2)
})
