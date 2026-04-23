import { writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const SEV_ORDER = { error: 0, warn: 1, info: 2 }
const SEV_MD = { error: 'Errors', warn: 'Warnings', info: 'Info' }

// What matters for look-and-feel QA. Category order == display order.
const CATEGORIES = [
  { id: 'design',       label: 'Design & responsiveness', codes: /^(horizontal-overflow|hero-img-|sticky-header-|visual-regression|visual-size-changed|empty-section|img-missing-alt|broken-image)/ },
  { id: 'functionality', label: 'Functionality',          codes: /^(mobile-menu-|nav-link-|nav-hash-|form-|interaction-|console-error|uncaught-exception|http-error|http-bad-response|request-failed|nav-failed)/ },
  { id: 'accessibility', label: 'Accessibility',          codes: /^(a11y-|no-focus-ring|touch-target-|no-h1|multiple-h1|skipped-heading|html-no-lang|input-no-label|duplicate-id)/ },
  { id: 'seo',          label: 'SEO & metadata',          codes: /^(seo-)/ },
  { id: 'content',      label: 'Content hygiene',         codes: /^(placeholder-|empty-link|target-blank-no-noopener|javascript-link)/ },
  { id: 'performance',  label: 'Performance',             codes: /^(lighthouse-)/ },
  { id: 'other',        label: 'Other',                   codes: /.*/ },
]

function categoryFor(code) {
  return CATEGORIES.find((c) => c.codes.test(code))?.id || 'other'
}

// Dedup key: same URL + same code + same concrete target (selector/src/href)
// means the "same issue", regardless of which browser×viewport observed it.
function dedupKey(url, f) {
  const d = f.detail || {}
  const target = d.selector || d.src || d.href || d.id || ''
  return `${url}|${f.code}|${target}`
}

// Collapse per-combo findings into a deduplicated issue list. Each unique
// (url, code, target) becomes one issue with a `combos` list + `count`.
function dedupIssues(pages) {
  const map = new Map()
  for (const p of pages) {
    for (const f of p.findings || []) {
      const key = dedupKey(p.url, f)
      if (!map.has(key)) {
        map.set(key, {
          url: p.url,
          code: f.code,
          severity: f.severity,
          message: f.message,
          detail: f.detail || {},
          category: categoryFor(f.code),
          combos: [],
        })
      }
      const issue = map.get(key)
      if (p.browser && p.viewport) issue.combos.push(`${p.browser}/${p.viewport}`)
      // Preserve highest severity if the same issue is tagged differently
      if (SEV_ORDER[f.severity] < SEV_ORDER[issue.severity]) issue.severity = f.severity
    }
  }
  const issues = [...map.values()]
  for (const i of issues) {
    i.combos = [...new Set(i.combos)]
    i.count = i.combos.length || 1
  }
  // Rank: error > warn > info, then by number of combos affected (wider = worse)
  issues.sort((a, b) =>
    SEV_ORDER[a.severity] - SEV_ORDER[b.severity]
    || b.count - a.count
    || a.code.localeCompare(b.code)
  )
  return issues
}

function combosLabel(issue, totalCombos) {
  if (!issue.combos.length) return ''
  if (issue.combos.length === totalCombos) return 'all browser × viewport combos'
  if (issue.combos.length > 6) return `${issue.combos.length}/${totalCombos} combos`
  return issue.combos.join(', ')
}

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

// Build the DEVELOPER.md — grouped by CATEGORY first (design/functionality/etc)
// with "top priority" first, then by URL as a secondary view.
function buildDeveloperMd({ seedUrl, startedAt, summary, pages, lighthouse, issues }) {
  const totals = { error: 0, warn: 0, info: 0 }
  for (const i of issues) totals[i.severity] = (totals[i.severity] || 0) + 1

  const totalCombos = (summary.browsers?.length || 1) * (summary.viewports?.length || 1)

  // Only show errors + warns in the top priority section. Info goes at the end.
  const topIssues = issues
    .filter((i) => i.severity !== 'info')
    .slice(0, 20)

  const categoryBlocks = CATEGORIES.map((cat) => {
    const catIssues = issues.filter((i) => i.category === cat.id && i.severity !== 'info')
    if (!catIssues.length) return null
    return [
      `### ${cat.label} (${catIssues.length})`,
      '',
      ...catIssues.map((i) => {
        const hint = reproHint({ detail: i.detail })
        const where = combosLabel(i, totalCombos)
        return `- **[${i.code}]** \`${i.url.replace(seedUrl, '') || '/'}\` — ${i.message}${hint ? ` · ${hint}` : ''}${where ? ` · _${where}_` : ''}`
      }),
    ].join('\n')
  }).filter(Boolean)

  const lhBlock = lighthouse ? [
    '',
    `## Lighthouse (${lighthouse.preset})`,
    '',
    ...Object.entries(lighthouse.scores).map(([k, v]) => {
      const pct = v === null ? '—' : Math.round(v * 100)
      const flag = v === null ? '' : v >= 0.9 ? ' ✓' : v >= 0.5 ? ' ~' : ' ✗'
      return `- **${k}**: ${pct}${flag}`
    }),
    ...(lighthouse.failingAudits?.length ? [
      '',
      '#### Top failing audits',
      ...lighthouse.failingAudits.slice(0, 8).map((a) => `- \`${a.id}\` (${a.category}) — ${a.title}${a.displayValue ? ` — ${a.displayValue}` : ''}`),
    ] : []),
  ].join('\n') : ''

  return [
    `# QA Findings — ${seedUrl}`,
    ``,
    `_Generated ${startedAt}_  `,
    `_${summary.pageCount} URL${summary.pageCount === 1 ? '' : 's'} · ${summary.browsers?.join(', ') || '?'} × ${summary.viewports?.join(', ') || '?'} = ${totalCombos} combos_`,
    ``,
    `**Unique issues:** ${totals.error || 0} error · ${totals.warn || 0} warn · ${totals.info || 0} info`,
    ``,
    `---`,
    ``,
    `## Top priority (${topIssues.length})`,
    ``,
    topIssues.length
      ? topIssues.map((i, idx) => {
          const hint = reproHint({ detail: i.detail })
          const where = combosLabel(i, totalCombos)
          const sev = i.severity.toUpperCase()
          return `${idx + 1}. **[${sev}] [${i.code}]** \`${i.url.replace(seedUrl, '') || '/'}\` — ${i.message}${hint ? `  \n   ↳ ${hint}` : ''}${where ? `  \n   ↳ seen on: ${where}` : ''}`
        }).join('\n\n')
      : `_No errors or warnings._`,
    ``,
    `---`,
    ``,
    `## By category`,
    ``,
    categoryBlocks.length ? categoryBlocks.join('\n\n') : `_No findings._`,
    lhBlock,
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

function issueRow(i, seedUrl, totalCombos) {
  const detail = i.detail && Object.keys(i.detail).length
    ? `<pre class="detail">${esc(JSON.stringify(i.detail, null, 2))}</pre>` : ''
  const path = i.url.replace(seedUrl, '') || '/'
  const where = combosLabel(i, totalCombos)
  return `
    <div class="finding sev-${i.severity}">
      <div class="finding-head">
        <span class="badge" style="background:${SEV_COLOR[i.severity]}">${SEV_LABEL[i.severity]}</span>
        <span class="code">${esc(i.code)}</span>
        <span class="path">${esc(path)}</span>
        ${where ? `<span class="where">${esc(where)}</span>` : ''}
      </div>
      <div class="msg">${esc(i.message)}</div>
      ${detail}
    </div>`
}

function pageCard(url, entries, outputDir, deduped, seedUrl, totalCombos) {
  const errs = deduped.filter((i) => i.severity === 'error').length
  const warns = deduped.filter((i) => i.severity === 'warn').length
  const infos = deduped.filter((i) => i.severity === 'info').length
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
      ${deduped.length ? deduped.map((i) => issueRow(i, seedUrl, totalCombos)).join('') : '<div class="clean">No findings</div>'}
    </div>
  </section>`
}

export async function writeReport({ outputDir, seedUrl, startedAt, finishedAt, pages, lighthouse, summary, interactionLogs }) {
  const byUrl = groupFindingsByUrl(pages)
  const issues = dedupIssues(pages)
  const totalCombos = (summary.browsers?.length || 1) * (summary.viewports?.length || 1)
  const errs = issues.filter((i) => i.severity === 'error').length
  const warns = issues.filter((i) => i.severity === 'warn').length
  const infos = issues.filter((i) => i.severity === 'info').length
  const rawTotals = pages.flatMap((p) => p.findings || [])
    .reduce((m, f) => (m[f.severity] = (m[f.severity] || 0) + 1, m), {})

  // Group deduped issues per URL for the per-page screenshot cards
  const issuesByUrl = new Map()
  for (const i of issues) {
    if (!issuesByUrl.has(i.url)) issuesByUrl.set(i.url, [])
    issuesByUrl.get(i.url).push(i)
  }

  // Category-grouped priority block
  const byCategory = CATEGORIES.map((cat) => {
    const catIssues = issues.filter((i) => i.category === cat.id && i.severity !== 'info')
    return { cat, items: catIssues }
  }).filter((g) => g.items.length)

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
  .priority { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 20px; margin: 0 0 20px; }
  .priority h2 { margin-top: 0; border: none; padding: 0; }
  .priority-item { display: flex; gap: 12px; padding: 12px; border-left: 3px solid var(--border); background: #0b1120; border-radius: 4px; margin-bottom: 8px; }
  .priority-item.sev-error { border-left-color: #fc8181; }
  .priority-item.sev-warn { border-left-color: #f6ad55; }
  .priority-item .rank { color: var(--muted); font-family: ui-monospace, monospace; min-width: 24px; }
  .priority-item .body { flex: 1; }
  .priority-item .hdr { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .priority-item .hdr .path { color: #90cdf4; font-family: ui-monospace, monospace; font-size: 12px; }
  .priority-item .hint { color: var(--muted); font-size: 12px; margin-top: 4px; }
  .priority-item .where { color: var(--muted); font-size: 11px; margin-top: 2px; font-style: italic; }
  .cat-block { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 16px 20px; margin-bottom: 14px; }
  .cat-block h3 { margin: 0 0 10px; font-size: 14px; color: var(--fg); }
  .cat-block .cat-count { color: var(--muted); font-weight: normal; font-size: 12px; margin-left: 8px; }
  .finding .path { color: #90cdf4; font-family: ui-monospace, monospace; font-size: 11px; }
  .finding .where { color: var(--muted); font-size: 10px; font-style: italic; margin-left: auto; }
  .raw-counts { color: var(--muted); font-size: 11px; margin-top: 4px; }
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
  <div class="stat err"><div class="n">${errs}</div><div class="l">Unique errors</div></div>
  <div class="stat warn"><div class="n">${warns}</div><div class="l">Unique warnings</div></div>
  <div class="stat info"><div class="n">${infos}</div><div class="l">Unique info</div></div>
</section>
<div class="raw-counts" style="padding: 0 32px;">
  Raw total (before dedup across ${totalCombos} browser × viewport combos): ${rawTotals.error || 0} error · ${rawTotals.warn || 0} warn · ${rawTotals.info || 0} info
</div>
<main>
  <section class="priority">
    <h2>Top priority (${issues.filter((i) => i.severity !== 'info').length})</h2>
    ${issues.filter((i) => i.severity !== 'info').length === 0
      ? '<div class="clean">No errors or warnings found — clean pass.</div>'
      : issues.filter((i) => i.severity !== 'info').slice(0, 20).map((i, idx) => {
          const hint = reproHint({ detail: i.detail })
          const where = combosLabel(i, totalCombos)
          const path = i.url.replace(seedUrl, '') || '/'
          return `<div class="priority-item sev-${i.severity}">
            <div class="rank">#${idx + 1}</div>
            <div class="body">
              <div class="hdr">
                <span class="badge" style="background:${SEV_COLOR[i.severity]}">${SEV_LABEL[i.severity]}</span>
                <span class="code">${esc(i.code)}</span>
                <span class="path">${esc(path)}</span>
              </div>
              <div class="msg">${esc(i.message)}</div>
              ${hint ? `<div class="hint">${esc(hint)}</div>` : ''}
              ${where ? `<div class="where">Seen on: ${esc(where)}</div>` : ''}
            </div>
          </div>`
        }).join('')}
  </section>

  <h2>By category</h2>
  ${byCategory.length === 0
    ? '<div class="clean">No categorised findings.</div>'
    : byCategory.map((g) => `
        <div class="cat-block">
          <h3>${esc(g.cat.label)} <span class="cat-count">${g.items.length} issue${g.items.length === 1 ? '' : 's'}</span></h3>
          <div class="findings">
            ${g.items.map((i) => issueRow(i, seedUrl, totalCombos)).join('')}
          </div>
        </div>`).join('')}

  ${lighthouseSection}

  <h2>Per-page screenshots</h2>
  ${byUrl.map((g) => pageCard(g.url, g.entries, outputDir, issuesByUrl.get(g.url) || [], seedUrl, totalCombos)).join('')}
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
    rawTotals,
    issues,
    pages,
    lighthouse,
  }, null, 2))

  const devMdPath = join(outputDir, 'DEVELOPER.md')
  await writeFile(devMdPath, buildDeveloperMd({ seedUrl, startedAt, summary, pages, lighthouse, issues }))

  return { reportPath, jsonPath, devMdPath }
}
