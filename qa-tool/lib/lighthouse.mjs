import { finding, SEVERITY } from './util.mjs'

export async function runLighthouse({ url, preset }) {
  const { default: lighthouse } = await import('lighthouse')
  const chromeLauncher = await import('chrome-launcher')

  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
  })

  try {
    const options = {
      logLevel: 'error',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    }
    const config = preset === 'desktop'
      ? {
          extends: 'lighthouse:default',
          settings: {
            formFactor: 'desktop',
            throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1 },
            screenEmulation: { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1, disabled: false },
          },
        }
      : undefined

    const runnerResult = await lighthouse(url, options, config)
    const lhr = runnerResult.lhr

    const scores = {
      performance: lhr.categories.performance?.score ?? null,
      accessibility: lhr.categories.accessibility?.score ?? null,
      'best-practices': lhr.categories['best-practices']?.score ?? null,
      seo: lhr.categories.seo?.score ?? null,
    }

    const findings = []
    const thresholds = { performance: 0.8, accessibility: 0.9, 'best-practices': 0.9, seo: 0.9 }
    for (const [cat, score] of Object.entries(scores)) {
      if (score === null) continue
      const pct = Math.round(score * 100)
      const threshold = thresholds[cat]
      if (score < threshold) {
        findings.push(finding(
          score < threshold - 0.15 ? SEVERITY.ERROR : SEVERITY.WARN,
          `lighthouse-${cat}`,
          `Lighthouse ${cat} score ${pct} below threshold ${Math.round(threshold * 100)} (${preset || 'mobile'})`,
          { score: pct, threshold: Math.round(threshold * 100), preset: preset || 'mobile' }
        ))
      }
    }

    // Surface the top-N failing audits per category so the report is actionable.
    const failingAudits = []
    for (const [catId, cat] of Object.entries(lhr.categories)) {
      for (const ref of cat.auditRefs) {
        const audit = lhr.audits[ref.id]
        if (!audit || audit.score === null) continue
        if (audit.score < 0.9 && (ref.weight || 0) > 0) {
          failingAudits.push({
            category: catId,
            id: audit.id,
            title: audit.title,
            description: audit.description,
            score: audit.score,
            displayValue: audit.displayValue,
            weight: ref.weight,
          })
        }
      }
    }
    failingAudits.sort((a, b) => b.weight - a.weight)

    return { scores, findings, failingAudits: failingAudits.slice(0, 20), preset: preset || 'mobile' }
  } finally {
    await chrome.kill()
  }
}
