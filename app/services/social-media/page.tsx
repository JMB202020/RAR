import type { Metadata } from 'next'
import ServiceDetail from '@/components/ServiceDetail'
import CTABar from '@/components/CTABar'

export const metadata: Metadata = {
  title: 'Organic Social Media for Gyms — Rep & Reach',
  description:
    'Instagram and Facebook management for gyms and fitness studios. Consistent, on-brand content that builds trust with warm leads.',
  openGraph: {
    title: 'Organic Social Media for Gyms — Rep & Reach',
    description:
      'Instagram and Facebook management for gyms and fitness studios. Consistent, on-brand content that builds trust with warm leads.',
    type: 'website',
    url: 'https://repandreach.com/services/social-media',
  },
}

export default function SocialMediaPage() {
  return (
    <>
      <ServiceDetail
        label="05 — Add-on Service"
        heading="Stay visible between campaigns."
        body={[
          "Paid ads generate leads. Organic social builds trust. When a prospect clicks your ad and visits your Instagram, they want to see an active, credible account — not three posts from six months ago.",
          "We manage your Instagram and Facebook presence: content calendar, caption writing, hashtag strategy, and posting schedule. We work with whatever content you can provide (photos, videos, stories from inside the gym) and turn it into a consistent, on-brand feed.",
        ]}
        includes={[
          'Monthly content calendar',
          'Caption writing and hashtag strategy',
          '12–16 posts per month (feed + stories)',
          'Community management (comments, DMs — response templates)',
          'Monthly performance review',
          'Coordination with paid ad creative for consistency',
        ]}
        bestFor="Gyms that want to look active and credible to warm leads"
      />
      <CTABar />
    </>
  )
}
