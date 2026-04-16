import { notFound } from 'next/navigation'
import Hero from '@/components/Hero'
import PlatformsStrip from '@/components/PlatformsStrip'
import BenchmarkBar from '@/components/BenchmarkBar'
import PricingCards from '@/components/PricingCards'
import WhoWeWorkWith from '@/components/WhoWeWorkWith'
import HowItWorks from '@/components/HowItWorks'
import VideoPlaceholder from '@/components/VideoPlaceholder'
import ApproachSection from '@/components/ApproachSection'
import FAQ from '@/components/FAQ'
import LeadMagnet from '@/components/LeadMagnet'
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
        proofLine="Trusted by fitness operators across the UK. New clients onboarding now."
        ctas={[
          { label: 'Enquire', path: '/contact', variant: 'primary' },
          { label: 'See our services', path: '/services', variant: 'secondary' },
        ]}
        fullHeight
        withVisual
      />
      <PlatformsStrip />
      <BenchmarkBar />
      <section className="bg-brand-bg-secondary py-24 md:py-[96px]">
        <PricingCards
          heading={
            <>
              Simple, transparent pricing.
            </>
          }
          description="One core package. Add what you need."
        />
      </section>
      <WhoWeWorkWith />
      <HowItWorks />
      <VideoPlaceholder />
      <ApproachSection />
      <FAQ />
      <LeadMagnet />
      <CTABar />
    </>
  )
}
