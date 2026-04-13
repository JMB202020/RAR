// lib/pricing.ts
// Single source of truth for all service pricing on the site.
// Access via the useLocale() hook + formatPrice() helper so currency can
// switch by region without hunting through components.
//
// IMPORTANT: prices below are rough psychological-pricing equivalents of
// the GBP base rate. Validate with the founder before launch in each market.

import { LOCALES, type LocaleSlug, getLocale } from './locales'

export type PriceAmount = {
  // Minor units (pence, cents, etc.) so we don't hit floating-point rounding.
  // e.g. £495 => 49500
  minor: number
  // 'monthly' | 'one-off' | null (null means "no suffix, just the number")
  cadence: 'monthly' | 'one-off' | null
}

export type ServicePricing = {
  slug: string
  label: string
  tagline: string
  prefix?: 'from' | null
  prices: Record<LocaleSlug, PriceAmount>
}

/**
 * Helper: build a per-locale price record from a single base figure for
 * each locale. Saves repeating cadence on every line.
 */
function priced(
  cadence: PriceAmount['cadence'],
  perLocale: Record<LocaleSlug, number>,
): Record<LocaleSlug, PriceAmount> {
  const out = {} as Record<LocaleSlug, PriceAmount>
  for (const slug of Object.keys(perLocale) as LocaleSlug[]) {
    out[slug] = { minor: perLocale[slug] * 100, cadence }
  }
  return out
}

/**
 * Core package — the only service most clients need.
 */
export const CORE_PACKAGE = {
  slug: 'performance',
  label: 'Performance',
  tagline: 'Meta Ads · Google Ads · YouTube · Remarketing',
  description:
    'The complete lead generation package. We run your paid social and search campaigns end to end.',
  includes: [
    'Campaign strategy & setup',
    'Ad creative direction & copy',
    'A/B testing & optimisation',
    'Monthly reporting & review call',
  ],
  bestFor:
    'Independent gyms, boutique studios, CrossFit boxes, Hyrox facilities',
  prefix: 'from' as const,
  prices: priced('monthly', {
    'en-gb': 495,
    'en-ie': 595,
    'en-us': 595,
    'en-au': 895,
    'en-ca': 795,
    'en-sg': 795,
    'en-nz': 995,
  }),
  adSpend: priced('monthly', {
    'en-gb': 500,
    'en-ie': 600,
    'en-us': 600,
    'en-au': 900,
    'en-ca': 800,
    'en-sg': 800,
    'en-nz': 1000,
  }),
} satisfies ServicePricing & {
  description: string
  includes: string[]
  bestFor: string
  adSpend: Record<LocaleSlug, PriceAmount>
}

export const ADDON_SERVICES = [
  {
    slug: 'lead-nurture-crm',
    label: 'Lead Nurture & CRM',
    tagline: 'Email, SMS & full pipeline management.',
    description:
      'Automated lead nurture sequences, lapsed-member re-engagement, and full CRM setup — so no enquiry ever goes cold.',
    includes: [
      'Email platform setup and sequence build',
      'SMS integration for time-sensitive follow-up',
      'CRM setup or audit',
      'Lead intake and pipeline tracking',
      'Monthly performance review',
    ],
    bestFor: 'Gyms generating leads but not converting enough into members',
    prefix: null,
    prices: priced('monthly', {
      'en-gb': 1295,
      'en-ie': 1495,
      'en-us': 1495,
      'en-au': 2295,
      'en-ca': 1995,
      'en-sg': 1995,
      'en-nz': 2495,
    }),
  },
  {
    slug: 'organic-social-media',
    label: 'Organic Social Media',
    tagline: '12–16 posts / month, fully managed.',
    description:
      'On-brand Instagram and Facebook content, so prospects who land on your profile see an active, credible gym.',
    includes: [
      'Monthly content calendar',
      '12–16 posts per month (feed + stories)',
      'Caption writing and hashtag strategy',
      'Coordination with paid ad creative',
    ],
    bestFor: 'Gyms that want to look active and credible to warm leads',
    prefix: null,
    prices: priced('monthly', {
      'en-gb': 349,
      'en-ie': 395,
      'en-us': 395,
      'en-au': 595,
      'en-ca': 525,
      'en-sg': 525,
      'en-nz': 649,
    }),
  },
  {
    slug: 'landing-page-build',
    label: 'Landing Page Build',
    tagline: 'High-converting page built for your campaigns.',
    description:
      'One focused page, one goal: get the visitor to enquire. No distractions, no navigation away, no reason to leave.',
    includes: [
      'Strategy and wireframe',
      'Copywriting (offer, headline, body, form)',
      'Design and development',
      'Form integration with your CRM',
      'Delivered within 10 working days',
    ],
    bestFor: 'Any gym starting a new campaign or promoting a specific offer',
    prefix: 'from' as const,
    prices: priced('one-off', {
      'en-gb': 499,
      'en-ie': 595,
      'en-us': 595,
      'en-au': 895,
      'en-ca': 795,
      'en-sg': 795,
      'en-nz': 995,
    }),
  },
] satisfies (ServicePricing & {
  description: string
  includes: string[]
  bestFor: string
})[]

/**
 * Format a PriceAmount into a display string like "£495/month" or
 * "From €499 one-off". Uses Intl.NumberFormat for clean currency rendering
 * with the right symbol per locale.
 */
export function formatPrice(
  amount: PriceAmount,
  locale: LocaleSlug,
  prefix?: 'from' | null,
): string {
  const def = getLocale(locale)
  const whole = Math.floor(amount.minor / 100)
  const formatted = new Intl.NumberFormat(def.intlTag, {
    style: 'currency',
    currency: def.currency,
    maximumFractionDigits: 0,
  }).format(whole)

  const cadenceSuffix =
    amount.cadence === 'monthly'
      ? '/month'
      : amount.cadence === 'one-off'
        ? ' one-off'
        : ''
  const prefixText = prefix === 'from' ? 'From ' : ''
  return `${prefixText}${formatted}${cadenceSuffix}`
}

/**
 * Convenience for showing "Prices shown in {currency}" copy.
 */
export function currencyForLocale(locale: LocaleSlug): string {
  return getLocale(locale).currency
}

// Re-export the locales array so callers don't need two imports.
export { LOCALES }
