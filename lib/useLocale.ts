'use client'

import { usePathname } from 'next/navigation'
import { DEFAULT_LOCALE, extractLocale, type LocaleSlug } from './locales'

/**
 * useLocale — returns the current locale based on the URL.
 *
 * Reads the first segment of the pathname (e.g. /en-us/services -> 'en-us').
 * Falls back to the default locale on routes that aren't under [locale]/
 * (such as the internal /styles preview page).
 */
export function useLocale(): LocaleSlug {
  const pathname = usePathname() ?? ''
  return extractLocale(pathname) ?? DEFAULT_LOCALE
}
