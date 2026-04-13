'use client'

import { CORE_PACKAGE, formatPrice } from '@/lib/pricing'
import { useLocale } from '@/lib/useLocale'

/**
 * Hero pricing anchor used under the homepage body copy. Locale-aware so it
 * reads "From £495/month" in the UK and "From $595/month" in the US, etc.
 */
export default function HeroPricingNote() {
  const locale = useLocale()
  const main = formatPrice(
    CORE_PACKAGE.prices[locale],
    locale,
    CORE_PACKAGE.prefix,
  )
  const adSpend = formatPrice(CORE_PACKAGE.adSpend[locale], locale)
  return (
    <>
      {main} · Recommended ad spend {adSpend}
    </>
  )
}
