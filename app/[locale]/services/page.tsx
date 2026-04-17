import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Hero from '@/components/Hero'
import PricingCards from '@/components/PricingCards'
import ServiceCombinations from '@/components/ServiceCombinations'
import LeadMagnet from '@/components/LeadMagnet'
import CTABar from '@/components/CTABar'
import { isLocale } from '@/lib/locales'

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
