'use client'

import Link from 'next/link'
import {
  Check,
  Target,
  MessageSquare,
  MapPin,
  Share2,
  Phone,
  Rocket,
} from 'lucide-react'
import {
  CORE_PACKAGE,
  ADDON_SERVICES,
  formatPrice,
  currencyForLocale,
} from '@/lib/pricing'
import { useLocale } from '@/lib/useLocale'
import { localePath } from '@/lib/locales'

const ADDON_ICONS: Record<string, React.ElementType> = {
  'lead-nurture-crm': MessageSquare,
  'local-search': MapPin,
  'organic-social-media': Share2,
  'out-of-hours-phone': Phone,
  'pre-sale-conversion': Rocket,
}

interface PricingCardsProps {
  heading?: React.ReactNode
  label?: string
  description?: string | null
}

export default function PricingCards({
  heading,
  label = 'What we do',
  description = 'One core package. Add what you need.',
}: PricingCardsProps) {
  const locale = useLocale()

  return (
    <div className="mx-auto w-full max-w-[1160px] px-6 lg:px-20">
      {(label || heading || description) && (
        <div className="max-w-[640px]">
          {label && (
            <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-accent">
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

      {/* Core package — visually dominant */}
      <div className="mt-12 rounded-[12px] border-2 border-brand-accent bg-brand-bg-dark p-8 text-brand-inverse md:p-10">
        <div className="flex items-center gap-3">
          <Target size={20} className="text-brand-accent" aria-hidden />
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-accent">
            Core package &middot; Start here
          </p>
        </div>
        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-4">
          <h3 className="font-[family-name:var(--font-display)] text-[36px] leading-[1.1] text-brand-inverse">
            {CORE_PACKAGE.label}
          </h3>
          <p className="font-[family-name:var(--font-mono)] text-[24px] font-semibold text-brand-accent tabular">
            {formatPrice(
              CORE_PACKAGE.prices[locale],
              locale,
              CORE_PACKAGE.prefix,
            )}
          </p>
        </div>
        <div className="mt-6 h-px w-full bg-white/10" />
        <p className="mt-6 text-[15px] font-medium text-white/90">
          {CORE_PACKAGE.tagline}
        </p>
        <p className="mt-4 max-w-[640px] text-[17px] leading-[1.75] text-white/70">
          {CORE_PACKAGE.description}
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {CORE_PACKAGE.includes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[15px] leading-[1.6] text-white/70"
            >
              <Check
                size={18}
                className="mt-[3px] shrink-0 text-brand-accent"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[14px] leading-[1.6] text-white/50">
          + Recommended ad spend:{' '}
          <span className="text-white/80">
            {formatPrice(CORE_PACKAGE.adSpend[locale], locale)}
          </span>
          <br />
          (paid directly to Meta/Google — not included above)
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href={localePath(locale, '/contact')}
            className="inline-flex items-center gap-2 rounded-[6px] bg-brand-accent px-8 py-3.5 text-[15px] font-medium text-brand-accent-text transition-all duration-200 hover:opacity-90 hover:shadow-lg"
          >
            Get started <span aria-hidden>&rarr;</span>
          </Link>
          <Link
            href={localePath(locale, '/services/performance')}
            className="inline-flex items-center gap-1.5 text-[15px] font-medium text-white/70 underline-offset-4 hover:text-white hover:underline"
          >
            Learn more <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Add-on services grid */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ADDON_SERVICES.map((addon) => {
          const Icon = ADDON_ICONS[addon.slug] ?? Target
          const cardLabel =
            'cardLabel' in addon && addon.cardLabel
              ? addon.cardLabel
              : 'Add-on'
          const note = 'note' in addon ? (addon.note as string | null) : null
          return (
            <div
              key={addon.slug}
              className="group flex flex-col rounded-[8px] border border-[rgba(0,0,0,0.12)] bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  size={20}
                  className="text-brand-tertiary transition-colors duration-200 group-hover:text-brand-accent"
                  aria-hidden
                />
                <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                  {cardLabel}
                </p>
              </div>
              <h3 className="mt-4 text-[20px] font-semibold leading-[1.25] text-brand-primary">
                {addon.label}
              </h3>
              <p className="mt-3 font-[family-name:var(--font-mono)] text-[18px] font-medium text-brand-primary tabular">
                {formatPrice(addon.prices[locale], locale, addon.prefix)}
              </p>
              {note && (
                <p className="mt-1 text-[12px] text-brand-tertiary">{note}</p>
              )}
              <p className="mt-4 flex-1 text-[14px] leading-[1.65] text-brand-secondary">
                {addon.tagline}
              </p>
              <Link
                href={localePath(locale, `/services/${addon.slug}`)}
                className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-brand-primary transition-colors duration-150 hover:text-brand-accent"
              >
                Learn more <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          )
        })}
      </div>

      <p className="mt-8 text-[13px] leading-[1.6] text-brand-tertiary">
        Most add-ons pair with the Performance package. Prices shown in{' '}
        {currencyForLocale(locale)}. Pre-sale engagements are 3-month minimum.
      </p>
    </div>
  )
}
