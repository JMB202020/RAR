'use client'

import { useEffect, useState } from 'react'
import { DEFAULT_LOCALE, type Locale } from './pricing'

/**
 * useLocale — returns the viewer's pricing locale.
 *
 * Today this just inspects the browser language on mount and picks between
 * 'en-GB' (default) and 'en-US'. Kept as a hook so we can later swap in a
 * cookie-backed / IP-based / user-preference locale without touching every
 * component that displays a price.
 */
export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE)

  useEffect(() => {
    if (typeof navigator === 'undefined') return
    const lang = navigator.language.toLowerCase()
    if (lang.startsWith('en-us') || lang === 'en') {
      // Conservative default: only switch to USD on explicit en-US.
      // TODO: also honour en-CA, en-AU with their own locales once added.
      if (lang.startsWith('en-us')) setLocale('en-US')
    }
  }, [])

  return locale
}
