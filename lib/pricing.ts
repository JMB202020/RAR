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

export type ServiceImage = {
  src: string
  alt: string
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
  image: {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop',
    alt: 'Ad performance dashboard showing gym campaign results',
  },
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
  image: ServiceImage
  adSpend: Record<LocaleSlug, PriceAmount>
}

export const ADDON_SERVICES = [
  {
    slug: 'lead-nurture-crm',
    label: 'Lead Nurture & CRM',
    tagline: 'Email, SMS, WhatsApp & full pipeline management.',
    description:
      'Automated lead nurture sequences, lapsed-member re-engagement, and full CRM setup — so no enquiry ever goes cold.',
    includes: [
      'Email platform setup and sequence build',
      'SMS integration for time-sensitive follow-up',
      'WhatsApp follow-up sequences (highest open-rate channel)',
      'CRM setup or audit',
      'Lead intake and pipeline tracking',
      'Monthly performance review',
    ],
    bestFor: 'Gyms generating leads but not converting enough into members',
    prefix: null,
    image: {
      src: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=900&q=80&auto=format&fit=crop',
      alt: 'CRM dashboard for managing gym leads',
    },
    cardImage: {
      src: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80&auto=format&fit=crop',
      alt: 'Gym staff following up with a lead on their phone',
    },
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
    slug: 'local-search',
    label: 'Local Search & Reputation',
    tagline:
      'Google Business Profile, local rankings, and reputation management.',
    description:
      'When someone searches "gym near me", the gyms that appear at the top of Google Maps with strong ratings win the click before any ad is seen. We make sure your gym is found first — and looks the part when they do.',
    includes: [
      'Google Business Profile setup and optimisation',
      'Local citation building and cleanup',
      'Review request sequences (email + SMS + WhatsApp)',
      'Review monitoring and response management',
      'Weekly GBP posts to keep your profile active',
      'Local ranking tracking across target keywords',
      'Monthly local search performance report',
    ],
    bestFor:
      'Any gym that wants to dominate local search and build a strong reputation before — or alongside — running paid ads',
    prefix: null,
    image: {
      src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&q=80&auto=format&fit=crop',
      alt: 'Local search results showing gym listings on Google Maps',
    },
    cardImage: {
      src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80&auto=format&fit=crop',
      alt: 'Google Business Profile and local search results on a smartphone',
    },
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
    image: {
      src: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=900&q=80&auto=format&fit=crop',
      alt: 'Organic social media content for a fitness brand',
    },
    cardImage: {
      src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80&auto=format&fit=crop',
      alt: 'Social media content being created for a fitness studio',
    },
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
] satisfies (ServicePricing & {
  description: string
  includes: string[]
  bestFor: string
  image: ServiceImage
  cardImage: ServiceImage
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
