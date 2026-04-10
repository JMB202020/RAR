import Hero from '@/components/Hero'
import ScrollIndicator from '@/components/ScrollIndicator'
import StatsBar from '@/components/StatsBar'
import ServicesGrid from '@/components/ServicesGrid'
import WhoWeWorkWith from '@/components/WhoWeWorkWith'
import HowItWorks from '@/components/HowItWorks'
import ResultsGrid from '@/components/ResultsGrid'
import TrustStrip from '@/components/TrustStrip'
import CTABar from '@/components/CTABar'

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Performance marketing for fitness businesses"
        heading="We fill gyms. That's all we do."
        body="Meta and Google ads built exclusively for gyms, studios, and fitness facilities. More membership enquiries. More trial sign-ups. Less guesswork."
        ctas={[
          { label: 'See how it works', href: '/services', variant: 'primary' },
          { label: 'View results', href: '/results', variant: 'text' },
        ]}
        fullHeight
      />
      <ScrollIndicator />
      <StatsBar />
      <ServicesGrid />
      <WhoWeWorkWith />
      <HowItWorks />
      <ResultsGrid />
      <TrustStrip />
      <CTABar />
    </>
  )
}
