import type { Metadata } from 'next'
import ServiceDetail from '@/components/ServiceDetail'
import CTABar from '@/components/CTABar'

export const metadata: Metadata = {
  title: 'Meta Ads for Gyms — Rep & Reach',
  description:
    'Facebook and Instagram ad campaigns built exclusively for gyms and fitness studios. More membership enquiries, more trial sign-ups.',
  openGraph: {
    title: 'Meta Ads for Gyms — Rep & Reach',
    description:
      'Facebook and Instagram ad campaigns built exclusively for gyms and fitness studios. More membership enquiries, more trial sign-ups.',
    type: 'website',
    url: 'https://repandreach.com/services/meta-ads',
  },
}

export default function MetaAdsPage() {
  return (
    <>
      <ServiceDetail
        label="01 — Core Service"
        heading="Meta ads that fill your gym."
        body={[
          "Facebook and Instagram are where your potential members spend their time. We build and manage paid social campaigns that put your gym in front of the right people — those who are actively looking for a fitness solution, in your area, right now.",
          "We handle everything: audience targeting, creative direction, ad copy, campaign structure, A/B testing, and monthly optimisation. You focus on the gym. We focus on the leads.",
        ]}
        includes={[
          'Campaign strategy and setup',
          'Audience research and targeting',
          'Ad creative direction and copy',
          'A/B testing of creatives and audiences',
          'Pixel setup and conversion tracking',
          'Weekly performance monitoring',
          'Monthly reporting and review call',
        ]}
        bestFor="Independent gyms, boutique studios, CrossFit boxes, Hyrox facilities"
      />
      <CTABar />
    </>
  )
}
