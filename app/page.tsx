import Hero from '@/components/Hero'
import PricingCards from '@/components/PricingCards'
import WhoWeWorkWith from '@/components/WhoWeWorkWith'
import HowItWorks from '@/components/HowItWorks'
import ResultsGrid from '@/components/ResultsGrid'
import CTABar from '@/components/CTABar'

export default function HomePage() {
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
        pricingNote="From £495/month · Recommended ad spend £500/month"
        ctas={[
          { label: 'See our services', href: '/services', variant: 'primary' },
          { label: 'Book a free call', href: '/contact', variant: 'secondary' },
        ]}
        fullHeight
        withStats
      />
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
