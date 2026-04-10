import type { Metadata } from 'next'
import ServiceDetail from '@/components/ServiceDetail'
import CTABar from '@/components/CTABar'

export const metadata: Metadata = {
  title: 'Remarketing for Gyms — Rep & Reach',
  description:
    'Remarketing campaigns across Meta and Google that re-engage warm leads and lower your cost per lead.',
  openGraph: {
    title: 'Remarketing for Gyms — Rep & Reach',
    description:
      'Remarketing campaigns across Meta and Google that re-engage warm leads and lower your cost per lead.',
    type: 'website',
    url: 'https://repandreach.com/services/remarketing',
  },
}

export default function RemarketingPage() {
  return (
    <>
      <ServiceDetail
        label="03 — Core Service"
        heading="Most leads don't convert first time. We fix that."
        body={[
          "The majority of people who click your ads won't enquire immediately. They'll visit your website, get distracted, and move on. Remarketing brings them back.",
          "We run targeted follow-up campaigns across Meta and Google that re-engage people who've already shown interest — website visitors, video viewers, people who started but didn't complete an enquiry form. These audiences convert at a significantly higher rate than cold audiences, and at a much lower cost per lead.",
        ]}
        includes={[
          'Custom audience setup (website visitors, video viewers, engagement audiences)',
          'Remarketing creative and copy tailored to warm audiences',
          'Cross-platform campaigns (Meta + Google simultaneously)',
          'Sequential messaging strategy',
          'Frequency management to avoid ad fatigue',
          'Integration with core Meta and Google campaigns',
        ]}
        bestFor="Any gym already running ads that wants to lower cost per lead"
      />
      <CTABar />
    </>
  )
}
