// lib/pricing.ts
// Single source of truth for all service pricing on the site.
// Access via the useLocale() hook + formatPrice() helper so currency can
// switch later without hunting through components.

export type Locale = 'en-GB' | 'en-US'

export type PriceAmount = {
  // Minor units (pence, cents) so we don't hit floating-point rounding.
  // e.g. £495 => 49500
  minor: number
  // 'monthly' | 'one-off' | null (null means "no suffix, just the number")
  cadence: 'monthly' | 'one-off' | null
}

export type ServicePricing = {
  slug: string
  label: string // short marketing name, e.g. 'Performance'
  tagline: string // one-line summary
  prefix?: 'from' | null // prepend "From" to price display
  prices: Record<Locale, PriceAmount>
}

export const LOCALE_CURRENCY: Record<Locale, { code: string; symbol: string }> = {
  'en-GB': { code: 'GBP', symbol: '£' },
  'en-US': { code: 'USD', symbol: '$' },
}

export const DEFAULT_LOCALE: Locale = 'en-GB'

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
  prices: {
    'en-GB': { minor: 49500, cadence: 'monthly' as const },
    'en-US': { minor: 59500, cadence: 'monthly' as const }, // TODO: confirm US pricing
  },
  adSpend: {
    'en-GB': { minor: 50000, cadence: 'monthly' as const },
    'en-US': { minor: 60000, cadence: 'monthly' as const },
  },
} satisfies ServicePricing & {
  description: string
  includes: string[]
  bestFor: string
  adSpend: Record<Locale, PriceAmount>
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
    prices: {
      'en-GB': { minor: 129500, cadence: 'monthly' as const },
      'en-US': { minor: 155000, cadence: 'monthly' as const },
    },
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
    prices: {
      'en-GB': { minor: 34900, cadence: 'monthly' as const },
      'en-US': { minor: 42000, cadence: 'monthly' as const },
    },
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
    prices: {
      'en-GB': { minor: 49900, cadence: 'one-off' as const },
      'en-US': { minor: 59900, cadence: 'one-off' as const },
    },
  },
] satisfies (ServicePricing & {
  description: string
  includes: string[]
  bestFor: string
})[]

/**
 * Format a PriceAmount into a display string like "£495/month" or "From £499 one-off".
 */
export function formatPrice(
  amount: PriceAmount,
  locale: Locale,
  prefix?: 'from' | null,
): string {
  const { symbol } = LOCALE_CURRENCY[locale]
  const whole = Math.floor(amount.minor / 100)
  const formattedNumber = whole.toLocaleString(locale)
  const cadenceSuffix =
    amount.cadence === 'monthly'
      ? '/month'
      : amount.cadence === 'one-off'
        ? ' one-off'
        : ''
  const prefixText = prefix === 'from' ? 'From ' : ''
  return `${prefixText}${symbol}${formattedNumber}${cadenceSuffix}`
}
