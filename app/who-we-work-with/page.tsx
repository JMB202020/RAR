import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import SegmentSection from '@/components/SegmentSection'
import CTABar from '@/components/CTABar'

export const metadata: Metadata = {
  title: 'Who We Work With — Rep & Reach',
  description:
    'We work with independent gyms, boutique studios, CrossFit boxes, Hyrox facilities, and franchise gyms worldwide.',
  openGraph: {
    title: 'Who We Work With — Rep & Reach',
    description:
      'We work with independent gyms, boutique studios, CrossFit boxes, Hyrox facilities, and franchise gyms worldwide.',
    type: 'website',
    url: 'https://repandreach.com/who-we-work-with',
  },
}

const SEGMENTS = [
  {
    eyebrow: 'Independent gyms',
    heading: 'The best gyms in the world are independents.',
    body: [
      "You've built something real. What you don't have is time — or a marketing team that understands the fitness industry. We handle the lead generation so you can focus on running a great gym.",
    ],
    bullets: [
      'Consistent monthly enquiries via paid ads',
      'Compelling membership offer that converts',
      'Fast, consistent lead follow-up',
      'Active organic social between campaigns',
    ],
  },
  {
    eyebrow: 'Boutique studios',
    heading: 'Premium experience, premium marketing.',
    body: [
      'Boutique fitness has higher price points and more selective members. We understand the positioning and match the marketing to it — no bargain-gym playbooks.',
    ],
    bullets: [
      'Targeted ads for the right demographic',
      'Google search for local high-intent prospects',
      'Editorial organic social presence',
      'Email flows that convert trials into long-term members',
    ],
  },
  {
    eyebrow: 'CrossFit boxes',
    heading: 'The CrossFit community rewards authenticity.',
    body: [
      'Boxes live on community, not just fitness. We market that — attracting the right members who stay, contribute, and refer others.',
    ],
    bullets: [
      'Campaigns that communicate community',
      'Local search for active prospects',
      'Warm-lead remarketing',
      'Built-in referral mechanics',
    ],
  },
  {
    eyebrow: 'Hyrox facilities',
    heading: "Fastest-growing format in fitness.",
    body: [
      "Hyrox is exploding, and so is the pool of athletes actively looking to train for it. We help Hyrox-focused facilities and hybrid gyms tap into that demand directly.",
    ],
    bullets: [
      'Targeting Hyrox athletes and functional enthusiasts',
      'Search campaigns for Hyrox-related terms',
      'Training-environment video ads',
      'Community content for organic social',
    ],
  },
  {
    eyebrow: 'Franchise gyms',
    heading: 'Local marketing for franchisees who want to grow.',
    body: [
      "Head office sets the brand. Filling your location is your job. We handle local lead generation within franchise compliance requirements — so you grow without friction from head office.",
    ],
    bullets: [
      'Location-specific paid campaigns',
      'Local Google search for your catchment',
      'Franchise-compliant creative and copy',
      'Independent CRM and lead follow-up',
    ],
  },
]

export default function WhoWeWorkWithPage() {
  return (
    <>
      <Hero
        eyebrow="Who we work with"
        heading="We work with gyms. All of them."
        body="Independent operators, boutique studios, CrossFit boxes, Hyrox facilities, franchise gyms — if you run a fitness business and need more members, Rep & Reach was built for you."
      />

      {SEGMENTS.map((segment, i) => (
        <SegmentSection key={segment.eyebrow} {...segment} alt={i % 2 === 1} />
      ))}

      <CTABar />
    </>
  )
}
