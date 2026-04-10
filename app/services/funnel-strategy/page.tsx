import type { Metadata } from 'next'
import ServiceDetail from '@/components/ServiceDetail'
import CTABar from '@/components/CTABar'

export const metadata: Metadata = {
  title: 'Offer & Funnel Strategy for Gyms — Rep & Reach',
  description:
    'Strategic offer design, lead magnet creation, and follow-up funnel mapping for gyms and fitness studios.',
  openGraph: {
    title: 'Offer & Funnel Strategy for Gyms — Rep & Reach',
    description:
      'Strategic offer design, lead magnet creation, and follow-up funnel mapping for gyms and fitness studios.',
    type: 'website',
    url: 'https://repandreach.com/services/funnel-strategy',
  },
}

export default function FunnelStrategyPage() {
  return (
    <>
      <ServiceDetail
        label="07 — Add-on Service / One-off Fee"
        heading="The right offer changes everything."
        body={[
          '"Join now" is not an offer. The gyms that generate leads consistently have a compelling reason for a prospect to take action today — a trial, a transformation challenge, a free class, a referral incentive.',
          "We work with you to build a membership offer that converts, a lead magnet that attracts the right people, and a follow-up funnel that turns enquiries into members. This is strategic work — and it's the foundation that makes everything else perform better.",
        ]}
        includes={[
          'Offer audit (review of your current offer and positioning)',
          'Competitor analysis (what other gyms in your market are doing)',
          'Lead magnet strategy (what to offer to get the enquiry)',
          'Membership offer design (trial, pricing, incentive structure)',
          'Follow-up funnel map (what happens after someone enquires)',
          'Implementation guidance',
        ]}
        bestFor="Gyms starting from scratch or struggling to convert leads to members"
        note="This is a one-off strategy engagement, not a monthly retainer."
      />
      <CTABar />
    </>
  )
}
