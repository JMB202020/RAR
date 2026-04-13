// lib/locales.ts
// Source of truth for which locales the site is published in.
// Add a new region by appending here, then dropping its prices into
// lib/pricing.ts under the same slug.

export type LocaleSlug =
  | 'en-gb'
  | 'en-ie'
  | 'en-us'
  | 'en-au'
  | 'en-ca'
  | 'en-sg'
  | 'en-nz'

export type LocaleDef = {
  slug: LocaleSlug
  /** ISO/BCP-47 tag used for Intl APIs (capitalised region). */
  intlTag: string
  /** Country name shown in the locale picker. */
  country: string
  /** Short country code shown after the country name (US, GB, etc). */
  code: string
  /** ISO 4217 currency code used by Intl.NumberFormat. */
  currency: string
  /** Single-character emoji flag for the picker. */
  flag: string
}

export const LOCALES: LocaleDef[] = [
  {
    slug: 'en-gb',
    intlTag: 'en-GB',
    country: 'United Kingdom',
    code: 'GB',
    currency: 'GBP',
    flag: '🇬🇧',
  },
  {
    slug: 'en-ie',
    intlTag: 'en-IE',
    country: 'Ireland',
    code: 'IE',
    currency: 'EUR',
    flag: '🇮🇪',
  },
  {
    slug: 'en-us',
    intlTag: 'en-US',
    country: 'United States',
    code: 'US',
    currency: 'USD',
    flag: '🇺🇸',
  },
  {
    slug: 'en-au',
    intlTag: 'en-AU',
    country: 'Australia',
    code: 'AU',
    currency: 'AUD',
    flag: '🇦🇺',
  },
  {
    slug: 'en-ca',
    intlTag: 'en-CA',
    country: 'Canada',
    code: 'CA',
    currency: 'CAD',
    flag: '🇨🇦',
  },
  {
    slug: 'en-sg',
    intlTag: 'en-SG',
    country: 'Singapore',
    code: 'SG',
    currency: 'SGD',
    flag: '🇸🇬',
  },
  {
    slug: 'en-nz',
    intlTag: 'en-NZ',
    country: 'New Zealand',
    code: 'NZ',
    currency: 'NZD',
    flag: '🇳🇿',
  },
]

export const LOCALE_SLUGS: LocaleSlug[] = LOCALES.map((l) => l.slug)
export const DEFAULT_LOCALE: LocaleSlug = 'en-gb'

export function isLocale(value: string): value is LocaleSlug {
  return (LOCALE_SLUGS as string[]).includes(value)
}

export function getLocale(slug: string): LocaleDef {
  return LOCALES.find((l) => l.slug === slug) ?? LOCALES[0]
}

/**
 * Build a locale-aware path. `/services` + en-us -> `/en-us/services`.
 * Pass `/` for the homepage; you'll get `/en-us`.
 */
export function localePath(locale: LocaleSlug, path: string): string {
  const trimmed = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`
  return `/${locale}${trimmed}`
}

/**
 * Pull the locale segment out of a URL pathname. Returns null if the path
 * doesn't start with a known locale (e.g. /styles, /favicon.ico).
 */
export function extractLocale(pathname: string): LocaleSlug | null {
  const segment = pathname.split('/')[1] || ''
  return isLocale(segment) ? segment : null
}

/**
 * Pick the best supported locale from an Accept-Language header.
 * Falls back to the default if nothing matches.
 */
export function negotiateLocale(acceptLanguage: string | null): LocaleSlug {
  if (!acceptLanguage) return DEFAULT_LOCALE

  const requested = acceptLanguage
    .split(',')
    .map((part) => part.trim().split(';')[0].toLowerCase())

  // Exact-tag match first (en-gb, en-us, etc.)
  for (const tag of requested) {
    if (isLocale(tag)) return tag as LocaleSlug
  }

  // Then language-only fallbacks for English speakers in regions we cover
  // but where the browser only sent "en".
  for (const tag of requested) {
    if (tag === 'en') return DEFAULT_LOCALE
  }

  return DEFAULT_LOCALE
}
