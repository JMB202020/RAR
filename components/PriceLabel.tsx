'use client'

import { formatPrice, type PriceAmount } from '@/lib/pricing'
import { type LocaleSlug } from '@/lib/locales'
import { useLocale } from '@/lib/useLocale'

interface PriceLabelProps {
  prices: Record<LocaleSlug, PriceAmount>
  prefix?: 'from' | null
}

/**
 * Tiny client-only wrapper around formatPrice + useLocale, so server pages
 * can drop a localised price into static layouts without becoming client
 * components themselves.
 */
export default function PriceLabel({ prices, prefix }: PriceLabelProps) {
  const locale = useLocale()
  return <>{formatPrice(prices[locale], locale, prefix)}</>
}
