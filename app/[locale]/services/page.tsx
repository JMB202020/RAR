import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import Hero from '@/components/Hero'
import PricingCards from '@/components/PricingCards'
import CTABar from '@/components/CTABar'
import FadeUp from '@/components/FadeUp'
import {
  CORE_PACKAGE,
  ADDON_SERVICES,
  type ServicePricing,
} from '@/lib/pricing'
import PriceLabel from '@/components/PriceLabel'
import { isLocale, localePath, type LocaleSlug } from '@/lib/locales'

export const metadata: Metadata = {
  title: 'Services — Rep & Reach',
  description:
    'Performance marketing for fitness businesses. One core package plus add-ons for lead nurture, organic social, and landing pages.',
  openGraph: {
    title: 'Services — Rep & Reach',
    description:
      'Performance marketing for fitness businesses. One core package plus add-ons for lead nurture, organic social, and landing pages.',
    type: 'website',
    url: 'https://repandreach.com/services',
  },
}

type ServiceDetail = ServicePricing & {
  description: string
  includes: string[]
  bestFor: string
  kind: 'core' | 'addon'
}

const SERVICES: ServiceDetail[] = [
  { ...CORE_PACKAGE, kind: 'core' },
  ...ADDON_SERVICES.map((a) => ({ ...a, kind: 'addon' as const })),
]

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <>
      <Hero
        eyebrow="Our services"
        heading="Performance marketing, end to end."
        body="Everything a gym needs to generate leads, convert members, and grow — under one roof."
      />

      <section className="bg-brand-bg-secondary py-20 md:py-[120px]">
        <PricingCards label="Pricing" heading="Simple, transparent pricing." />
      </section>

      {SERVICES.map((service, idx) => (
        <ServiceDetailSection
          key={service.slug}
          service={service}
          alt={idx % 2 === 0}
          locale={locale}
        />
      ))}

      <CTABar />
    </>
  )
}

function ServiceDetailSection({
  service,
  alt,
  locale,
}: {
  service: ServiceDetail
  alt: boolean
  locale: LocaleSlug
}) {
  return (
    <section
      id={service.slug}
      className={`scroll-mt-24 py-20 md:py-[120px] ${
        alt ? 'bg-white' : 'bg-brand-bg-secondary'
      }`}
    >
      <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Left column — name, price, CTA */}
          <div className="md:col-span-5">
            <FadeUp>
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                {service.kind === 'core' ? 'Core service' : 'Add-on service'}
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-[32px] leading-[1.05] text-brand-primary md:text-[40px]">
                {service.label}
              </h2>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="mt-4 font-[family-name:var(--font-mono)] text-[20px] font-semibold text-brand-primary tabular">
                <PriceLabel
                  prices={service.prices}
                  prefix={service.prefix}
                />
              </p>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mt-5 max-w-[360px] text-[15px] leading-[1.65] text-brand-secondary">
                {service.tagline}
              </p>
            </FadeUp>
            <FadeUp delay={0.24}>
              <Link
                href={localePath(locale, '/contact')}
                className="mt-8 inline-flex items-center gap-1.5 rounded-[6px] bg-brand-primary px-7 py-3 text-[15px] font-medium text-brand-inverse transition-opacity duration-150 hover:opacity-80"
              >
                Get started <span aria-hidden>&rarr;</span>
              </Link>
            </FadeUp>
          </div>

          {/* Right column — what's included + best for */}
          <div className="md:col-span-7 md:border-l md:border-[var(--color-border-light)] md:pl-16">
            <FadeUp delay={0.12}>
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                What&apos;s included
              </p>
              <ul className="mt-6 flex flex-col gap-3.5">
                {service.includes.map((item) => (
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

              <p className="mt-10 text-[14px] leading-[1.65] text-brand-tertiary">
                <span className="font-medium text-brand-primary">
                  Best for:
                </span>{' '}
                {service.bestFor}
              </p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
