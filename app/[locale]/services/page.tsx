import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
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
  type ServiceImage,
} from '@/lib/pricing'
import PriceLabel from '@/components/PriceLabel'
import { isLocale, localePath, type LocaleSlug } from '@/lib/locales'

export const metadata: Metadata = {
  title: 'Services — Rep & Reach',
  description:
    'Full-service marketing and sales support for fitness businesses. Meta ads, Google ads, YouTube, remarketing, email, SMS, WhatsApp, social media, local search, reputation, out-of-hours phone cover, and pre-opening campaigns.',
  openGraph: {
    title: 'Services — Rep & Reach',
    description:
      'Full-service marketing and sales support for fitness businesses. Meta ads, Google ads, YouTube, remarketing, email, SMS, WhatsApp, social media, local search, reputation, out-of-hours phone cover, and pre-opening campaigns.',
    type: 'website',
    url: 'https://repandreach.com/services',
  },
}

type ServiceDetail = ServicePricing & {
  description: string
  extendedBody?: string | null
  includes: string[]
  bestFor: string
  image: ServiceImage
  note?: string | null
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

      {/* Hero supporting image — full width below the hero text */}
      <div className="mx-auto -mt-4 mb-4 max-w-[1160px] px-6 lg:px-20">
        <div className="relative h-[260px] w-full overflow-hidden rounded-[12px] bg-brand-bg-secondary md:h-[400px]">
          <Image
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600&q=80&auto=format&fit=crop"
            alt="Professional gym facility with members training"
            fill
            sizes="(min-width: 1024px) 1120px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <section className="bg-brand-bg-secondary py-20 md:py-[120px]">
        <PricingCards label="Pricing" heading="Simple, transparent pricing." />
      </section>

      {SERVICES.map((service, idx) => (
        <ServiceDetailSection
          key={service.slug}
          service={service}
          alt={idx % 2 === 0}
          imageOnLeft={idx % 2 === 1}
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
  imageOnLeft,
  locale,
}: {
  service: ServiceDetail
  alt: boolean
  imageOnLeft: boolean
  locale: LocaleSlug
}) {
  const textBlock = (
    <div className="md:col-span-6">
      <FadeUp>
        <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
          {service.kind === 'core'
            ? 'Core service'
            : service.slug === 'pre-sale-conversion'
              ? 'Add-on service · Pre-opening clubs'
              : 'Add-on service'}
        </p>
      </FadeUp>
      <FadeUp delay={0.08}>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-[32px] leading-[1.05] text-brand-primary md:text-[40px]">
          {service.label}
        </h2>
      </FadeUp>
      <FadeUp delay={0.12}>
        <p className="mt-4 font-[family-name:var(--font-mono)] text-[20px] font-semibold text-brand-primary tabular">
          <PriceLabel prices={service.prices} prefix={service.prefix} />
        </p>
        {service.note && (
          <p className="mt-1 text-[13px] text-brand-tertiary">
            {service.note}
          </p>
        )}
      </FadeUp>
      <FadeUp delay={0.16}>
        <p className="mt-5 max-w-[480px] text-[15px] leading-[1.65] text-brand-secondary">
          {service.description}
        </p>
        {service.extendedBody && (
          <p className="mt-4 max-w-[480px] text-[15px] leading-[1.65] text-brand-secondary">
            {service.extendedBody}
          </p>
        )}
      </FadeUp>
      <FadeUp delay={0.2}>
        <ul className="mt-6 flex flex-col gap-3">
          {service.includes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[15px] leading-[1.55] text-brand-secondary"
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
      </FadeUp>
      <FadeUp delay={0.28}>
        <p className="mt-8 max-w-[480px] text-[14px] leading-[1.65] text-brand-tertiary">
          <span className="font-medium text-brand-primary">Best for:</span>{' '}
          {service.bestFor}
        </p>
      </FadeUp>
      <FadeUp delay={0.32}>
        <Link
          href={localePath(locale, '/contact')}
          className="mt-8 inline-flex items-center gap-1.5 rounded-[6px] bg-brand-primary px-7 py-3 text-[15px] font-medium text-brand-inverse transition-opacity duration-150 hover:opacity-80"
        >
          Get started <span aria-hidden>&rarr;</span>
        </Link>
      </FadeUp>
    </div>
  )

  const imageBlock = (
    <div className="md:col-span-6">
      <FadeUp delay={0.12}>
        <div className="relative h-[240px] w-full overflow-hidden rounded-[12px] bg-brand-bg-secondary md:h-[420px]">
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            sizes="(min-width: 1024px) 540px, 100vw"
            className="object-cover"
          />
        </div>
      </FadeUp>
    </div>
  )

  return (
    <section
      id={service.slug}
      className={`scroll-mt-24 py-20 md:py-[120px] ${
        alt ? 'bg-white' : 'bg-brand-bg-secondary'
      }`}
    >
      <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
          {imageOnLeft ? (
            <>
              {imageBlock}
              {textBlock}
            </>
          ) : (
            <>
              {textBlock}
              {imageBlock}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
