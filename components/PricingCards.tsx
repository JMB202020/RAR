'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
import {
  CORE_PACKAGE,
  ADDON_SERVICES,
  formatPrice,
} from '@/lib/pricing'
import { useLocale } from '@/lib/useLocale'

interface PricingCardsProps {
  /** Heading shown above the cards. Page-specific. */
  heading?: React.ReactNode
  /** Optional muted intro paragraph above the heading. */
  label?: string
  /**
   * Optional one-line description that sits below the heading.
   * Pass null to suppress entirely (e.g. on the services page where the hero
   * already says "Performance marketing, end to end").
   */
  description?: string | null
}

export default function PricingCards({
  heading,
  label = 'What we do',
  description = "One core package. Add what you need.",
}: PricingCardsProps) {
  const locale = useLocale()

  return (
    <div className="mx-auto w-full max-w-[1160px] px-6 lg:px-20">
      {(label || heading || description) && (
        <div className="max-w-[640px]">
          {label && (
            <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
              {label}
            </p>
          )}
          {heading && (
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[32px] leading-[1.1] text-brand-primary md:text-[40px]">
              {heading}
            </h2>
          )}
          {description && (
            <p className="mt-4 text-[17px] leading-[1.75] text-brand-secondary">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Core package — full width prominent card */}
      <div className="mt-12 rounded-[12px] border border-[rgba(0,0,0,0.12)] bg-white p-8 md:p-10">
        <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
          Core package
        </p>
        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-4">
          <h3 className="font-[family-name:var(--font-display)] text-[36px] leading-[1.1] text-brand-primary">
            {CORE_PACKAGE.label}
          </h3>
          <p className="font-[family-name:var(--font-mono)] text-[24px] font-semibold text-brand-primary tabular">
            {formatPrice(
              CORE_PACKAGE.prices[locale],
              locale,
              CORE_PACKAGE.prefix,
            )}
          </p>
        </div>
        <div className="mt-6 h-px w-full bg-[var(--color-border-light)]" />
        <p className="mt-6 text-[15px] font-medium text-brand-primary">
          {CORE_PACKAGE.tagline}
        </p>
        <p className="mt-4 max-w-[640px] text-[17px] leading-[1.75] text-brand-secondary">
          {CORE_PACKAGE.description}
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {CORE_PACKAGE.includes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[15px] leading-[1.6] text-brand-secondary"
            >
              <Check
                size={18}
                className="mt-[3px] shrink-0 text-brand-primary"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[14px] leading-[1.6] text-brand-tertiary">
          + Recommended ad spend:{' '}
          <span className="text-brand-primary">
            {formatPrice(CORE_PACKAGE.adSpend[locale], locale)}
          </span>
          <br />
          <span className="text-brand-tertiary">
            (paid directly to Meta/Google — not included above)
          </span>
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-[6px] bg-brand-primary px-8 py-3.5 text-[15px] font-medium text-brand-inverse transition-opacity duration-150 hover:opacity-80"
          >
            Get started <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Add-on services — 3 column grid */}
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {ADDON_SERVICES.map((addon) => (
          <div
            key={addon.slug}
            className="flex flex-col rounded-[8px] border border-[rgba(0,0,0,0.12)] bg-white p-7"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
              Add-on
            </p>
            <h3 className="mt-4 text-[20px] font-semibold leading-[1.25] text-brand-primary">
              {addon.label}
            </h3>
            <p className="mt-3 font-[family-name:var(--font-mono)] text-[18px] font-medium text-brand-primary tabular">
              {formatPrice(addon.prices[locale], locale, addon.prefix)}
            </p>
            <p className="mt-4 flex-1 text-[14px] leading-[1.65] text-brand-secondary">
              {addon.tagline}
            </p>
            <Link
              href={`/services#${addon.slug}`}
              className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-brand-primary transition-opacity duration-150 hover:opacity-70"
            >
              Learn more <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-8 text-[13px] leading-[1.6] text-brand-tertiary">
        All add-ons require the Performance package. Prices shown in{' '}
        {locale === 'en-GB' ? 'GBP' : 'USD'}.
      </p>
    </div>
  )
}
