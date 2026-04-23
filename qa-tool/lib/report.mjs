import { writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const SEV_ORDER = { error: 0, warn: 1, info: 2 }
const SEV_MD = { error: 'Errors', warn: 'Warnings', info: 'Info' }

// Collapse deeply-nested detail into a terse one-line hint a dev can act on.
function reproHint(f) {
  const d = f.detail || {}
  const bits = []
  if (d.selector) bits.push(`selector \`${d.selector}\``)
  if (d.src) bits.push(`src \`${d.src}\``)
  if (d.href) bits.push(`href \`${d.href}\``)
  if (d.width !== undefined && d.height !== undefined) bits.push(`size ${d.width}×${d.height}`)
  if (d.viewportWidth) bits.push(`viewport ${d.viewportWidth}px`)
  if (d.status) bits.push(`HTTP ${d.status}`)
  if (d.impact) bits.push(`impact: ${d.impact}`)
  if (d.offenders && d.offenders.length) bits.push(`offenders: ${d.offenders.map((o) => o.tag + (o.classes ? '.' + o.classes.split(' ').slice(0, 2).join('.') : '')).slice(0, 2).join(', ')}`)
  return bits.join(' · ')
}

// Build the DEVELOPER.md — one-line-per-finding, grouped by URL then severity.
function buildDeveloperMd({ seedUrl, startedAt, summary, pages, lighthouse }) {
  const byUrl = new Map()
  for (const p of pages) {
    const key = p.url
    if (!byUrl.has(key)) byUrl.set(key, { errors: [], warn: [], info: [], meta: [] })
    const bucket = byUrl.get(key)
    for (const f of p.findings || []) {
      const ctx = p.browser && p.viewport ? ` (${p.browser}/${p.viewport})` : ''
      const hint = reproHint(f)
      const line = `- **[${f.code}]**${ctx} ${f.message}${hint ? ` — ${hint}` : ''}`
      if (f.severity === 'error') bucket.errors.push(line)
      else if (f.severity === 'warn') bucket.warn.push(line)
      else bucket.info.push(line)
    }
  }

  const totals = { error: 0, warn: 0, info: 0 }
  for (const f of pages.flatMap((p) => p.findings || [])) totals[f.severity] = (totals[f.severity] || 0) + 1

  const lhBlock = lighthouse ? [
    '',
    `## Lighthouse (${lighthouse.preset})`,
    '',
    ...Object.entries(lighthouse.scores).map(([k, v]) => {
      const pct = v === null ? '—' : Math.round(v * 100)
      return `- **${k}**: ${pct}`
    }),
    ...(lighthouse.failingAudits?.length ? [
      '',
      '### Top failing audits',
      ...lighthouse.failingAudits.slice(0, 8).map((a) => `- \`${a.id}\` (${a.category}) — ${a.title}${a.displayValue ? ` — ${a.displayValue}` : ''}`),
    ] : []),
  ].join('\n') : ''

  const urlBlocks = [...byUrl.entries()]
    .sort((a, b) => (b[1].errors.length - a[1].errors.length) || (b[1].warn.length - a[1].warn.length))
    .map(([url, b]) => {
      const sections = []
      if (b.errors.length) sections.push(`### Errors (${b.errors.length})\n\n${b.errors.join('\n')}`)
      if (b.warn.length) sections.push(`### Warnings (${b.warn.length})\n\n${b.warn.join('\n')}`)
      if (b.info.length) sections.push(`### Info (${b.info.length})\n\n${b.info.join('\n')}`)
      if (sections.length === 0) sections.push(`_No findings._`)
      return `## ${url}\n\n${sections.join('\n\n')}`
    })

  return [
    `# QA Findings — ${seedUrl}`,
    ``,
    `_Generated ${startedAt}_`,
    `_${summary.pageCount} URL${summary.pageCount === 1 ? '' : 's'} · ${summary.browsers?.join(', ') || '?'} · ${summary.viewports?.join(', ') || '?'}_`,
    ``,
    `**Totals:** ${totals.error || 0} error · ${totals.warn || 0} warn · ${totals.info || 0} info`,
    lhBlock,
    ``,
    urlBlocks.join('\n\n'),
    ``,
  ].join('\n')
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[c]))

const SEV_COLOR = { error: '#c53030', warn: '#c99408', info: '#3a6ea5' }
const SEV_LABEL = { error: 'ERROR', warn: 'WARN', info: 'INFO' }

function countBy(findings, severity) {
  return findings.filter((f) => f.severity === severity).length
}

function groupFindingsByUrl(pages) {
  const map = new Map()
  for (const p of pages) {
    if (!map.has(p.url)) map.set(p.url, { url: p.url, entries: [] })
    map.get(p.url).entries.push(p)
  }
  return [...map.values()]
}

function findingRow(f) {
  const detail = f.detail ? `<pre class="detail">${esc(JSON.stringify(f.detail, null, 2))}</pre>` : ''
  return `
    <div class="finding sev-${f.severity}">
      <div class="finding-head">
        <span class="badge" style="background:${SEV_COLOR[f.severity]}">${SEV_LABEL[f.severity]}</span>
        <span class="code">${esc(f.code)}</span>
      </div>
      <div class="msg">${esc(f.message)}</div>
      ${detail}
    </div>`
}

function pageCard(url, entries, outputDir) {
  const findings = entries.flatMap((e) => e.findings || [])
  const errs = countBy(findings, 'error')
  const warns = countBy(findings, 'warn')
  const infos = countBy(findings, 'info')
  const shots = entries.map((e) => {
    const rel = e.screenshot ? relative(outputDir, e.screenshot) : null
    const fold = e.foldScreenshot ? relative(outputDir, e.foldScreenshot) : null
    const hero = e.heroScreenshot ? relative(outputDir, e.heroScreenshot) : null
    const diff = e.diff ? relative(outputDir, e.diff) : null
    return {
      viewport: e.viewport, browser: e.browser, rel, fold, hero, diff, visual: e.visual,
      status: e.status, loadMs: e.loadMs, consent: e.consent,
    }
  })
  const interactions = entries.find((e) => e.interactions)?.interactions
  return `
  <section class="page-card">
    <h3><a href="${esc(url)}" target="_blank">${esc(url)}</a></h3>
    <div class="counts">
      <span class="count err">${errs} error${errs === 1 ? '' : 's'}</span>
      <span class="count warn">${warns} warning${warns === 1 ? '' : 's'}</span>
      <span class="count info">${infos} info</span>
    </div>
    ${interactions && interactions.length ? `
      <details class="interactions">
        <summary>Interactions (${interactions.length} step${interactions.length === 1 ? '' : 's'})</summary>
        <ul>${interactions.map((i) => `<li><code>${esc(i.step)}</code> ${i.cta ? `— CTA: <em>${esc(i.cta)}</em>` : ''}${i.fields !== undefined ? ` — fields: ${i.fields}` : ''}${i.navigated ? ` — navigated` : ''}${i.selector ? ` — <code>${esc(i.selector)}</code>` : ''}</li>`).join('')}</ul>
      </details>` : ''}
    <div class="shots">
      ${shots.map((s) => `
        <figure>
          <figcaption>
            ${esc(s.browser || '')} / ${esc(s.viewport)} — HTTP ${s.status} — ${s.loadMs}ms${s.visual ? ` — ${esc(s.visual.status)}` : ''}
            ${s.consent?.dismissed ? ` · <span class="tag">consent dismissed</span>` : ''}
          </figcaption>
          <div class="shot-grid">
            ${s.fold ? `<div class="shot-tile"><div class="shot-label">above-the-fold</div><a href="${esc(s.fold)}" target="_blank"><img loading="lazy" src="${esc(s.fold)}" alt="above-the-fold"></a></div>` : ''}
            ${s.hero ? `<div class="shot-tile"><div class="shot-label">hero crop</div><a href="${esc(s.hero)}" target="_blank"><img loading="lazy" src="${esc(s.hero)}" alt="hero crop"></a></div>` : ''}
            ${s.rel ? `<div class="shot-tile"><div class="shot-label">full page</div><a href="${esc(s.rel)}" target="_blank"><img loading="lazy" src="${esc(s.rel)}" alt="full page"></a></div>` : '<div class="no-shot">no screenshot</div>'}
          </div>
          ${s.diff ? `<a href="${esc(s.diff)}" target="_blank" class="diff-link">view pixel diff</a>` : ''}
        </figure>`).join('')}
    </div>
    <div class="findings">
      ${findings.length ? findings.map(findingRow).join('') : '<div class="clean">No findings</div>'}
    </div>
  </section>`
}

export async function writeReport({ outputDir, seedUrl, startedAt, finishedAt, pages, lighthouse, summary, interactionLogs }) {
  const byUrl = groupFindingsByUrl(pages)
  const totalFindings = pages.flatMap((p) => p.findings || [])
  const errs = countBy(totalFindings, 'error')
  const warns = countBy(totalFindings, 'warn')
  const infos = countBy(totalFindings, 'info')

  const lighthouseSection = lighthouse ? `
    <section class="lh-section">
      <h2>Lighthouse (${esc(lighthouse.preset)})</h2>
      <div class="lh-scores">
        ${Object.entries(lighthouse.scores).map(([k, v]) => {
          const pct = v === null ? '—' : Math.round(v * 100)
          const cls = v === null ? 'na' : v >= 0.9 ? 'good' : v >= 0.5 ? 'mid' : 'bad'
          return `<div class="lh-score ${cls}"><div class="lh-num">${pct}</div><div class="lh-label">${esc(k)}</div></div>`
        }).join('')}
      </div>
      ${lighthouse.failingAudits?.length ? `
        <details open>
          <summary>Top failing audits (${lighthouse.failingAudits.length})</summary>
          <table>
            <thead><tr><th>Category</th><th>Audit</th><th>Score</th><th>Value</th></tr></thead>
            <tbody>
              ${lighthouse.failingAudits.map((a) => `
                <tr>
                  <td>${esc(a.category)}</td>
                  <td title="${esc(a.description)}">${esc(a.title)}</td>
                  <td>${a.score === null ? '—' : Math.round(a.score * 100)}</td>
                  <td>${esc(a.displayValue || '')}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </details>` : ''}
    </section>` : ''

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>QA Report — ${esc(seedUrl)}</title>
<style>
  :root { --bg:#0f172a; --fg:#e2e8f0; --card:#1e293b; --muted:#94a3b8; --border:#334155; }
  * { box-sizing: border-box; }
  body { font: 14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 0; background: var(--bg); color: var(--fg); }
  header { padding: 24px 32px; border-bottom: 1px solid var(--border); background: #0b1120; }
  h1 { margin: 0 0 8px; font-size: 20px; }
  .meta { color: var(--muted); font-size: 13px; }
  .summary { display: flex; gap: 12px; padding: 16px 32px; flex-wrap: wrap; }
  .stat { padding: 12px 18px; border-radius: 8px; background: var(--card); min-width: 120px; }
  .stat .n { font-size: 26px; font-weight: 600; }
  .stat.err .n { color: #fc8181; }
  .stat.warn .n { color: #f6ad55; }
  .stat.info .n { color: #63b3ed; }
  .stat .l { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
  main { padding: 0 32px 48px; }
  h2 { margin: 32px 0 16px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
  .page-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 20px; margin-bottom: 20px; }
  .page-card h3 { margin: 0 0 12px; font-size: 15px; }
  .page-card h3 a { color: #90cdf4; text-decoration: none; word-break: break-all; }
  .page-card h3 a:hover { text-decoration: underline; }
  .counts { display: flex; gap: 12px; margin-bottom: 16px; font-size: 12px; color: var(--muted); }
  .count.err { color: #fc8181; }
  .count.warn { color: #f6ad55; }
  .count.info { color: #63b3ed; }
  .shots { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 16px; }
  figure { margin: 0; background: #0b1120; border: 1px solid var(--border); border-radius: 8px; padding: 8px; }
  figcaption { color: var(--muted); font-size: 12px; padding-bottom: 6px; }
  figure img { width: 100%; height: auto; display: block; border-radius: 4px; }
  .shot-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
  .shot-tile { display: flex; flex-direction: column; gap: 4px; }
  .shot-label { color: var(--muted); font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
  .diff-link { display: inline-block; margin-top: 6px; font-size: 12px; color: #f6ad55; }
  .no-shot { color: var(--muted); padding: 40px; text-align: center; font-size: 12px; }
  .findings { display: flex; flex-direction: column; gap: 8px; }
  .finding { padding: 10px 12px; border-left: 3px solid var(--border); background: #0b1120; border-radius: 4px; }
  .finding.sev-error { border-left-color: #fc8181; }
  .finding.sev-warn { border-left-color: #f6ad55; }
  .finding.sev-info { border-left-color: #63b3ed; }
  .finding-head { display: flex; gap: 10px; align-items: center; margin-bottom: 4px; }
  .badge { display: inline-block; color: white; font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 3px; letter-spacing: 0.5px; }
  .code { font-family: ui-monospace, SFMono-Regular, monospace; color: var(--muted); font-size: 12px; }
  .msg { color: var(--fg); }
  .detail { margin: 8px 0 0; padding: 8px; background: #020617; border-radius: 4px; font-size: 11px; color: var(--muted); overflow-x: auto; max-height: 160px; }
  .clean { color: #68d391; font-size: 13px; }
  .lh-section { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 20px; margin-bottom: 20px; }
  .lh-scores { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin: 16px 0; }
  .lh-score { text-align: center; padding: 16px; background: #0b1120; border-radius: 8px; }
  .lh-score .lh-num { font-size: 32px; font-weight: 600; }
  .lh-score .lh-label { color: var(--muted); font-size: 12px; text-transform: uppercase; }
  .lh-score.good .lh-num { color: #68d391; }
  .lh-score.mid .lh-num { color: #f6ad55; }
  .lh-score.bad .lh-num { color: #fc8181; }
  .lh-score.na .lh-num { color: var(--muted); }
  table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px; }
  th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--border); }
  th { color: var(--muted); font-weight: 500; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px; }
  details summary { cursor: pointer; color: #90cdf4; padding: 8px 0; }
  .interactions { margin-bottom: 12px; }
  .interactions ul { margin: 4px 0 0 16px; padding: 0; }
  .interactions li { padding: 2px 0; font-size: 13px; color: var(--muted); }
  .interactions code { color: #90cdf4; font-family: ui-monospace, SFMono-Regular, monospace; font-size: 12px; }
  .tag { display: inline-block; font-size: 10px; background: #2d3748; color: var(--muted); padding: 2px 6px; border-radius: 3px; letter-spacing: 0.5px; text-transform: uppercase; }
</style>
</head>
<body>
<header>
  <h1>QA Report — ${esc(seedUrl)}</h1>
  <div class="meta">
    Started ${esc(startedAt)} · Finished ${esc(finishedAt)} · ${esc(summary.duration)}<br>
    ${esc(String(summary.pageCount))} URL${summary.pageCount === 1 ? '' : 's'}
    ${summary.browsers ? `× ${summary.browsers.length} browser${summary.browsers.length === 1 ? '' : 's'} (${esc(summary.browsers.join(', '))})` : ''}
    ${summary.viewports ? `× ${summary.viewports.length} viewport${summary.viewports.length === 1 ? '' : 's'} (${esc(summary.viewports.join(', '))})` : ''}
  </div>
</header>
<section class="summary">
  <div class="stat err"><div class="n">${errs}</div><div class="l">Errors</div></div>
  <div class="stat warn"><div class="n">${warns}</div><div class="l">Warnings</div></div>
  <div class="stat info"><div class="n">${infos}</div><div class="l">Info</div></div>
</section>
<main>
  ${lighthouseSection}
  <h2>Pages</h2>
  ${byUrl.map((g) => pageCard(g.url, g.entries, outputDir)).join('')}
</main>
</body>
</html>`

  const reportPath = join(outputDir, 'report.html')
  await writeFile(reportPath, html)

  const jsonPath = join(outputDir, 'report.json')
  await writeFile(jsonPath, JSON.stringify({
    seedUrl, startedAt, finishedAt, summary,
    passed: errs === 0,
    totals: { errors: errs, warnings: warns, info: infos },
    pages, lighthouse,
  }, null, 2))

  const devMdPath = join(outputDir, 'DEVELOPER.md')
  await writeFile(devMdPath, buildDeveloperMd({ seedUrl, startedAt, summary, pages, lighthouse }))

  return { reportPath, jsonPath, devMdPath }
}
