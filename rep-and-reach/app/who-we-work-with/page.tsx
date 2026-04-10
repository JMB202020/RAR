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
      "Independent gym owners are some of the most motivated operators we work with. You've built something real, you know your members personally, and you care deeply about the community you've created. What you often don't have is time — and a marketing team that understands the fitness industry.",
      "That's where we come in. We handle the lead generation so you can focus on running a great gym.",
    ],
    bullets: [
      'Generating consistent monthly enquiries via Meta and Google',
      'Building a compelling membership offer that converts',
      'Following up leads quickly so none go cold',
      'Staying visible on social between campaigns',
    ],
  },
  {
    eyebrow: 'Boutique studios',
    heading: 'Premium experience deserves premium marketing.',
    body: [
      "Pilates studios, yoga studios, boxing gyms, cycling studios, barre classes — boutique fitness has higher price points, more selective members, and a community feel that makes word of mouth powerful. But word of mouth alone isn't enough to fill a new studio or replace natural churn.",
      "We understand boutique positioning. We don't run the same campaigns for a £200/month unlimited yoga studio that we run for a budget gym.",
    ],
    bullets: [
      'Targeted Meta ads that attract the right demographic',
      'Google ads that capture local intent searches',
      'Organic social to maintain the premium, editorial feel of the brand',
      'Email sequences that convert trials into long-term members',
    ],
  },
  {
    eyebrow: 'CrossFit boxes',
    heading: 'The CrossFit community rewards authenticity.',
    body: [
      "CrossFit boxes live and die on community. Your members aren't just customers — they're part of something. That makes marketing different: it's not just about generating enquiries, it's about attracting the right people who will stay, contribute to the culture, and refer others.",
      "We know how CrossFit works. We've marketed boxes before. We understand On-Ramp programmes, open gym structures, competition seasons, and the community dynamics that make CrossFit different.",
    ],
    bullets: [
      'Meta campaigns that communicate community, not just fitness',
      'Google Search campaigns for local prospects actively searching',
      'Remarketing to warm leads who\'ve visited the website or social profile',
      'Referral mechanics built into email and SMS campaigns',
    ],
  },
  {
    eyebrow: 'Hyrox facilities',
    heading: "The fastest-growing format in fitness. We're already here.",
    body: [
      "Hyrox is growing faster than almost any other format in the industry. New facilities are opening, existing gyms are adding Hyrox programming, and the community of athletes is expanding globally. The opportunity is significant — but so is the competition.",
      "We work with Hyrox-focused facilities and hybrid gyms with Hyrox programming to generate leads from the growing pool of athletes who are actively looking to train specifically for the event format.",
    ],
    bullets: [
      'Targeted campaigns to Hyrox athletes and functional fitness enthusiasts',
      'Google Search campaigns for "Hyrox training" and related terms',
      'YouTube ads that demonstrate the training environment',
      'Community-building content for organic social',
    ],
  },
  {
    eyebrow: 'Franchise gyms',
    heading: 'Local marketing for franchisees who want to grow.',
    body: [
      "Franchise gym owners often have national brand support — but local marketing is down to you. Head office sets the brand standards, but filling your specific location with members is your responsibility.",
      "We work directly with franchisees who want to invest in local lead generation beyond what the franchisor provides. We understand franchise compliance requirements, and we build campaigns that work within brand guidelines while being specific enough to your location to actually convert.",
    ],
    bullets: [
      'Location-specific Meta and Google campaigns',
      'Local Google Search campaigns for your catchment area',
      'Franchise-compliant creative and copy',
      "Independent CRM and lead follow-up if head office systems don't cover it",
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

      {SEGMENTS.map((segment) => (
        <SegmentSection key={segment.eyebrow} {...segment} />
      ))}

      <CTABar />
    </>
  )
}
