import { notFound } from 'next/navigation'
import Hero from '@/components/Hero'
import HeroPricingNote from '@/components/HeroPricingNote'
import PlatformsStrip from '@/components/PlatformsStrip'
import PricingCards from '@/components/PricingCards'
import WhoWeWorkWith from '@/components/WhoWeWorkWith'
import HowItWorks from '@/components/HowItWorks'
import ResultsGrid from '@/components/ResultsGrid'
import CTABar from '@/components/CTABar'
import { isLocale } from '@/lib/locales'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <>
      <Hero
        eyebrow="Performance marketing for gyms & fitness studios"
        heading={
          <>
            We fill gyms.
            <br />
            That&apos;s all we do.
          </>
        }
        body="Meta and Google ads built exclusively for gyms and fitness studios. More enquiries. More members. Less guesswork."
        pricingNote={<HeroPricingNote />}
        ctas={[
          { label: 'See our services', path: '/services', variant: 'primary' },
          { label: 'Book a free call', path: '/contact', variant: 'secondary' },
        ]}
        fullHeight
        withVisual
      />
      <PlatformsStrip />
      <section className="bg-brand-bg-secondary py-20 md:py-[120px]">
        <PricingCards
          heading={
            <>
              Simple, transparent pricing.
              <br />
              One core package. Add what you need.
            </>
          }
        />
      </section>
      <WhoWeWorkWith />
      <HowItWorks />
      <ResultsGrid />
      <CTABar />
    </>
  )
}
