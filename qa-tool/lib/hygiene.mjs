// Professional QA: stabilize pages before screenshotting + dismiss common
// cookie/consent banners that would otherwise block every screenshot.

export const HYGIENE_CSS = `
  *, *::before, *::after {
    animation-duration: 0.001s !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
    animation-play-state: paused !important;
    transition-duration: 0.001s !important;
    transition-delay: 0s !important;
    caret-color: transparent !important;
  }
  html, body { scroll-behavior: auto !important; }
  input, textarea { caret-color: transparent !important; }
  /* Neutralise parallax / background-attachment: fixed which causes diff noise */
  * { background-attachment: scroll !important; }
`

// Common cookie/consent CMP selectors, in order of specificity.
const CONSENT_SELECTORS = [
  // OneTrust
  '#onetrust-accept-btn-handler',
  '#accept-recommended-btn-handler',
  // Cookiebot
  '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
  '#CybotCookiebotDialogBodyButtonAccept',
  // Didomi
  '#didomi-notice-agree-button',
  // Usercentrics
  'button[data-testid="uc-accept-all-button"]',
  // Quantcast Choice
  '.qc-cmp2-summary-buttons > button:last-child',
  // Osano / Cookie Consent
  '.cc-btn.cc-accept',
  '.cc-btn.cc-dismiss',
  '.cc-btn.cc-allow',
  // TrustArc
  '#truste-consent-button',
  // Iubenda
  '.iubenda-cs-accept-btn',
  // Klaro
  '.klaro .cm-btn-success',
  // CookieYes
  '.cky-btn-accept',
  // Generic aria / id patterns
  'button[aria-label*="accept all" i]',
  'button[aria-label*="accept cookies" i]',
  'button[aria-label*="I agree" i]',
  'button#accept-cookies',
  'button[data-accept-cookies]',
]

export async function installHygiene(page) {
  // Inject the freeze CSS on every page load.
  await page.addInitScript((css) => {
    const inject = () => {
      const style = document.createElement('style')
      style.setAttribute('data-site-qa', 'hygiene')
      style.textContent = css
      document.documentElement.appendChild(style)
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', inject, { once: true })
    } else {
      inject()
    }
  }, HYGIENE_CSS)
}

export async function dismissConsent(page) {
  // Try known CMP selectors first.
  for (const selector of CONSENT_SELECTORS) {
    const locator = page.locator(selector).first()
    try {
      if (await locator.isVisible({ timeout: 150 })) {
        await locator.click({ timeout: 500, force: true })
        await page.waitForTimeout(200)
        return { dismissed: true, via: selector }
      }
    } catch {}
  }

  // Text-based fallback: find a button whose accessible name matches common
  // accept phrases. Kept tight so we never accidentally click "Reject".
  try {
    const btn = page.getByRole('button', {
      name: /^\s*(accept( all| cookies)?|i agree|agree|got it|allow all|ok)\s*$/i,
    }).first()
    if (await btn.isVisible({ timeout: 150 })) {
      await btn.click({ timeout: 500, force: true })
      await page.waitForTimeout(200)
      return { dismissed: true, via: 'role=button text-match' }
    }
  } catch {}

  return { dismissed: false }
}

export async function stabilise(page) {
  // After hygiene CSS is in + consent dismissed, wait for fonts + images.
  try { await page.evaluate(() => document.fonts && document.fonts.ready) } catch {}
  try {
    await page.evaluate(() => Promise.all(
      [...document.images]
        .filter((i) => !i.complete)
        .map((i) => new Promise((r) => { i.onload = i.onerror = r }))
    ))
  } catch {}
  // Scroll to the bottom + back to top to trigger lazy-loaded content,
  // then wait for network to settle.
  try {
    await page.evaluate(async () => {
      const step = 600
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 60))
      }
      window.scrollTo(0, 0)
    })
  } catch {}
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {})
  await page.waitForTimeout(200)
}
