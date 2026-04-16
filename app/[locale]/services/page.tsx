import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Hero from '@/components/Hero'
import PricingCards from '@/components/PricingCards'
import ServiceCombinations from '@/components/ServiceCombinations'
import LeadMagnet from '@/components/LeadMagnet'
import CTABar from '@/components/CTABar'
import { isLocale } from '@/lib/locales'
import { SERVICES_HERO } from '@/lib/images'

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

      {/* Hero supporting image */}
      <div className="mx-auto -mt-4 mb-4 max-w-[1160px] px-6 lg:px-20">
        <div className="relative h-[260px] w-full overflow-hidden rounded-[12px] bg-brand-bg-secondary md:h-[400px]">
          <Image
            src={SERVICES_HERO.src}
            alt={SERVICES_HERO.alt}
            fill
            sizes="(min-width: 1024px) 1120px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <section className="bg-brand-bg-secondary py-24 md:py-[96px]">
        <PricingCards
          label="Pricing"
          heading="Simple, transparent pricing."
        />
      </section>

      <ServiceCombinations />
      <LeadMagnet />
      <CTABar />
    </>
  )
}
