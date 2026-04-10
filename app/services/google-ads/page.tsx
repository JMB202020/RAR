import type { Metadata } from 'next'
import ServiceDetail from '@/components/ServiceDetail'
import CTABar from '@/components/CTABar'

export const metadata: Metadata = {
  title: 'Google Ads & YouTube for Gyms — Rep & Reach',
  description:
    'Google Search and YouTube ad campaigns for gyms and fitness studios. Capture high-intent prospects and build local awareness.',
  openGraph: {
    title: 'Google Ads & YouTube for Gyms — Rep & Reach',
    description:
      'Google Search and YouTube ad campaigns for gyms and fitness studios. Capture high-intent prospects and build local awareness.',
    type: 'website',
    url: 'https://repandreach.com/services/google-ads',
  },
}

export default function GoogleAdsPage() {
  return (
    <>
      <ServiceDetail
        label="02 — Core Service"
        heading="Capture demand. Build awareness."
        body={[
          'When someone searches "gym near me" or "personal training in [city]", you want to be the first thing they see. Google Search campaigns put you there — capturing high-intent prospects at the exact moment they\'re ready to act.',
          "YouTube pre-roll ads work differently. They build awareness with people in your local area before they've started searching — so when they do, your gym is already familiar. Together, Search and YouTube cover both ends of the funnel.",
        ]}
        includes={[
          'Google Search campaign setup and management',
          'YouTube pre-roll campaign setup and management',
          'Keyword research and negative keyword management',
          'Ad copy writing and testing',
          'Conversion tracking setup (calls, form fills, visits)',
          'Google Analytics integration',
          'Monthly reporting',
        ]}
        bestFor="All gym types, particularly those in competitive local markets"
      />
      <CTABar />
    </>
  )
}
