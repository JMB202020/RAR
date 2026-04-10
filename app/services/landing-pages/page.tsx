import type { Metadata } from 'next'
import ServiceDetail from '@/components/ServiceDetail'
import CTABar from '@/components/CTABar'

export const metadata: Metadata = {
  title: 'Landing Pages for Gyms — Rep & Reach',
  description:
    'High-converting landing pages built for gym ad campaigns. One focused page, one goal: get the visitor to enquire.',
  openGraph: {
    title: 'Landing Pages for Gyms — Rep & Reach',
    description:
      'High-converting landing pages built for gym ad campaigns. One focused page, one goal: get the visitor to enquire.',
    type: 'website',
    url: 'https://repandreach.com/services/landing-pages',
  },
}

export default function LandingPagesPage() {
  return (
    <>
      <ServiceDetail
        label="06 — Add-on Service / One-off Fee"
        heading="Give your ads somewhere worth sending traffic."
        body={[
          "Most gym websites aren't built to convert ad traffic. They're general brochure sites — great for browsing, not built for a prospect who's clicked an ad and wants to enquire right now.",
          "A dedicated landing page changes that. One focused page, one goal: get the visitor to submit their details. No distractions, no navigation away, no reason to leave without enquiring. Our landing pages are built specifically to pair with your ad campaigns.",
        ]}
        includes={[
          'Strategy and wireframe',
          'Copywriting (offer, headline, body, form)',
          'Design and development (Next.js or Webflow)',
          'Mobile-optimised',
          'Form integration (connected to your CRM or email platform)',
          'A/B test-ready structure',
          'Delivered within 10 working days',
        ]}
        bestFor="Any gym starting a new campaign or promoting a specific offer"
        note="This is a one-off project fee, not a monthly retainer."
      />
      <CTABar />
    </>
  )
}
