// Runs inside the page context via page.evaluate. Returns findings
// (no Node imports here, and no use of closures from the outer module).
export function pageCheckScript() {
  return () => {
    const findings = []
    const push = (severity, code, message, detail) =>
      findings.push({ severity, code, message, detail })

    const abs = (el, attr) => {
      const v = el.getAttribute(attr)
      return v ? new URL(v, location.href).href : ''
    }

    const visibleText = (el) => (el.textContent || '').trim()

    // Concise-but-useful CSS selector for a finding. Prefers id, else tag +
    // up to 2 classes, optionally with nth-of-type.
    const selectorFor = (el) => {
      if (!el || el.nodeType !== 1) return ''
      if (el.id) return `#${el.id}`
      const tag = el.tagName.toLowerCase()
      const cls = (typeof el.className === 'string' ? el.className : '')
        .trim().split(/\s+/).filter(Boolean).slice(0, 2).join('.')
      const base = cls ? `${tag}.${cls}` : tag
      const parent = el.parentElement
      if (!parent) return base
      const siblings = [...parent.children].filter((c) => c.tagName === el.tagName)
      if (siblings.length === 1) return base
      const idx = siblings.indexOf(el) + 1
      return `${base}:nth-of-type(${idx})`
    }

    const isVisible = (el) => {
      const r = el.getBoundingClientRect()
      if (r.width === 0 || r.height === 0) return false
      const cs = window.getComputedStyle(el)
      if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false
      return true
    }

    // Broken images
    for (const img of document.images) {
      if (!img.complete || img.naturalWidth === 0) {
        push('error', 'broken-image', `Image failed to load: ${img.currentSrc || img.src}`, {
          selector: selectorFor(img),
          src: img.currentSrc || img.src,
          alt: img.alt,
        })
      }
    }

    // Missing alt attributes (decorative must have alt="")
    for (const img of document.images) {
      if (!img.hasAttribute('alt')) {
        push('error', 'img-missing-alt', `<img> missing alt attribute: ${img.src}`, {
          selector: selectorFor(img),
          src: img.currentSrc || img.src,
        })
      }
    }

    // Horizontal overflow
    const docW = document.documentElement.scrollWidth
    const winW = window.innerWidth
    if (docW - winW > 1) {
      const offenders = []
      for (const el of document.querySelectorAll('body *')) {
        const rect = el.getBoundingClientRect()
        if (rect.right > winW + 1 && rect.width > 0 && rect.height > 0) {
          offenders.push({
            tag: el.tagName.toLowerCase(),
            id: el.id || null,
            classes: el.className && typeof el.className === 'string' ? el.className.slice(0, 80) : null,
            right: Math.round(rect.right),
          })
          if (offenders.length >= 5) break
        }
      }
      push('error', 'horizontal-overflow',
        `Page scrolls horizontally: document ${docW}px vs viewport ${winW}px`,
        { docWidth: docW, viewport: winW, offenders })
    }

    // Duplicate IDs
    const idCounts = new Map()
    for (const el of document.querySelectorAll('[id]')) {
      idCounts.set(el.id, (idCounts.get(el.id) || 0) + 1)
    }
    for (const [id, count] of idCounts) {
      if (count > 1) push('warn', 'duplicate-id', `Duplicate id="${id}" (${count} elements)`, { id, count })
    }

    // Empty or suspicious links
    for (const a of document.querySelectorAll('a')) {
      const href = a.getAttribute('href')
      if (!href || href === '#' || href.trim() === '') {
        push('warn', 'empty-link', `Link with empty/placeholder href: "${visibleText(a).slice(0, 60)}"`, {
          text: visibleText(a).slice(0, 120),
        })
      }
      if (a.target === '_blank') {
        const rel = (a.getAttribute('rel') || '').toLowerCase()
        if (!rel.includes('noopener')) {
          push('warn', 'target-blank-no-noopener', `target="_blank" without rel="noopener": ${abs(a, 'href')}`, {
            href: abs(a, 'href'),
          })
        }
      }
      if (href && href.toLowerCase().startsWith('javascript:')) {
        push('warn', 'javascript-link', `javascript: href found`, { href })
      }
    }

    // Heading hierarchy
    const headings = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((h) => ({
      level: parseInt(h.tagName.slice(1), 10),
      text: visibleText(h).slice(0, 80),
    }))
    const h1Count = headings.filter((h) => h.level === 1).length
    if (h1Count === 0) push('error', 'no-h1', 'Page has no <h1>')
    if (h1Count > 1) push('warn', 'multiple-h1', `Page has ${h1Count} <h1> elements`, { count: h1Count })
    for (let i = 1; i < headings.length; i++) {
      const diff = headings[i].level - headings[i - 1].level
      if (diff > 1) {
        push('warn', 'skipped-heading',
          `Heading jumps from h${headings[i - 1].level} to h${headings[i].level}: "${headings[i].text}"`,
          { from: headings[i - 1].level, to: headings[i].level })
      }
    }

    // Form inputs without labels
    for (const input of document.querySelectorAll('input, select, textarea')) {
      if (input.type === 'hidden' || input.type === 'submit' || input.type === 'button') continue
      const id = input.id
      const hasLabel = id && document.querySelector(`label[for="${CSS.escape(id)}"]`)
      const wrapped = input.closest('label')
      const aria = input.getAttribute('aria-label') || input.getAttribute('aria-labelledby')
      const placeholder = input.getAttribute('placeholder')
      if (!hasLabel && !wrapped && !aria) {
        push('warn', 'input-no-label',
          `Form control without label: <${input.tagName.toLowerCase()} name="${input.name || ''}">`,
          { name: input.name, placeholder })
      }
    }

    // Placeholder / leaked content
    const bodyText = document.body ? document.body.innerText : ''
    const placeholders = [
      ['lorem-ipsum', /lorem ipsum/i],
      ['todo-marker', /\b(TODO|FIXME|XXX)\b/],
      ['undefined-leak', /\bundefined\b/],
      ['object-object', /\[object Object\]/],
      ['nan-leak', /\bNaN\b/],
      ['double-brace', /\{\{.*?\}\}/],
      ['null-leak', /(^|\W)null(\W|$)/],
    ]
    for (const [code, re] of placeholders) {
      const m = bodyText.match(re)
      if (m) {
        const idx = Math.max(0, m.index - 40)
        const ctx = bodyText.slice(idx, idx + 120).replace(/\s+/g, ' ')
        push(code === 'null-leak' ? 'info' : 'warn',
          `placeholder-${code}`,
          `Suspicious content found: ${m[0]}`,
          { context: ctx })
      }
    }

    // <html lang>
    const lang = document.documentElement.getAttribute('lang')
    if (!lang) push('error', 'html-no-lang', '<html> missing lang attribute')

    // Empty sections (tall containers with no content)
    for (const section of document.querySelectorAll('section, main, article, header, footer')) {
      const rect = section.getBoundingClientRect()
      if (rect.height > 100 && visibleText(section).length === 0 && !section.querySelector('img, video, svg, canvas, iframe')) {
        push('warn', 'empty-section',
          `<${section.tagName.toLowerCase()}> appears empty (${Math.round(rect.height)}px tall)`,
          { height: Math.round(rect.height), selector: selectorFor(section) })
      }
    }

    // Touch target audit (mobile/tablet viewports only — <900px)
    if (window.innerWidth < 900) {
      const interactive = document.querySelectorAll(
        'a[href], button, input[type="submit"], input[type="button"], [role="button"], [role="link"]'
      )
      for (const el of interactive) {
        if (!isVisible(el)) continue
        const r = el.getBoundingClientRect()
        if (r.width < 44 || r.height < 44) {
          push('warn', 'touch-target-too-small',
            `Touch target ${Math.round(r.width)}×${Math.round(r.height)}px (min 44×44): ${selectorFor(el)}`,
            {
              selector: selectorFor(el),
              width: Math.round(r.width),
              height: Math.round(r.height),
              text: visibleText(el).slice(0, 40),
              viewportWidth: window.innerWidth,
            })
        }
      }
    }

    // Large-image / hero-image responsiveness audit
    for (const img of document.images) {
      const r = img.getBoundingClientRect()
      // Only check prominent images (plausibly hero/banner/feature)
      if (r.width < 400 || r.height < 200) continue
      if (!isVisible(img)) continue

      // srcset / responsive-image check
      const hasSrcset = !!img.getAttribute('srcset')
      const inPicture = !!img.closest('picture') && !!img.closest('picture').querySelector('source[srcset]')
      if (!hasSrcset && !inPicture) {
        push('warn', 'hero-img-no-srcset',
          `Large image lacks srcset — retina users will see upscaled: ${img.currentSrc || img.src}`,
          {
            selector: selectorFor(img),
            src: img.currentSrc || img.src,
            rendered: { width: Math.round(r.width), height: Math.round(r.height) },
          })
      }

      // Aspect-ratio sanity vs container (object-fit crops)
      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
        const imageAR = img.naturalWidth / img.naturalHeight
        const containerAR = r.width / r.height
        const ratio = Math.max(imageAR, containerAR) / Math.min(imageAR, containerAR)
        if (ratio > 2.5) {
          push('info', 'hero-img-aspect-mismatch',
            `Image ${img.naturalWidth}×${img.naturalHeight} (AR ${imageAR.toFixed(2)}) rendered in ${Math.round(r.width)}×${Math.round(r.height)} container (AR ${containerAR.toFixed(2)}) — heavy crop likely`,
            {
              selector: selectorFor(img),
              natural: { w: img.naturalWidth, h: img.naturalHeight },
              rendered: { w: Math.round(r.width), h: Math.round(r.height) },
              ratio: +ratio.toFixed(2),
            })
        }
      }

      // Missing width/height hints → CLS risk
      if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
        push('info', 'hero-img-no-dimensions',
          `Large image missing width/height attributes — can cause CLS: ${img.currentSrc || img.src}`,
          { selector: selectorFor(img), src: img.currentSrc || img.src })
      }
    }

    return findings
  }
}

export function seoCheckScript() {
  return () => {
    const findings = []
    const push = (severity, code, message, detail) =>
      findings.push({ severity, code, message, detail })

    const meta = (name) => {
      const el = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`)
      return el ? el.getAttribute('content') : null
    }

    const title = document.title.trim()
    if (!title) push('error', 'seo-no-title', '<title> is empty')
    else if (title.length < 10) push('warn', 'seo-title-short', `Title is short (${title.length} chars): "${title}"`, { title, length: title.length })
    else if (title.length > 70) push('warn', 'seo-title-long', `Title is long (${title.length} chars): "${title}"`, { title, length: title.length })

    const desc = meta('description')
    if (!desc) push('error', 'seo-no-description', 'Missing meta description')
    else if (desc.length < 50) push('warn', 'seo-description-short', `Meta description short (${desc.length} chars)`, { length: desc.length, description: desc })
    else if (desc.length > 170) push('warn', 'seo-description-long', `Meta description long (${desc.length} chars)`, { length: desc.length, description: desc })

    // OpenGraph
    for (const tag of ['og:title', 'og:description', 'og:image', 'og:url']) {
      if (!meta(tag)) push('warn', `seo-no-${tag.replace(':', '-')}`, `Missing ${tag}`)
    }

    // Twitter card
    if (!meta('twitter:card')) push('info', 'seo-no-twitter-card', 'Missing twitter:card')

    // Canonical
    const canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) push('warn', 'seo-no-canonical', 'Missing <link rel="canonical">')

    // Viewport
    const viewport = meta('viewport')
    if (!viewport) push('error', 'seo-no-viewport', 'Missing <meta name="viewport">')

    // Favicon
    if (!document.querySelector('link[rel~="icon"]')) push('info', 'seo-no-favicon', 'No favicon link tag')

    // robots
    const robots = meta('robots')
    if (robots && /noindex/i.test(robots)) push('warn', 'seo-noindex', `robots="${robots}" — page blocked from indexing`, { robots })

    return findings
  }
}
