import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Hero from '@/components/Hero'
import SegmentSection from '@/components/SegmentSection'
import CTABar from '@/components/CTABar'
import { isLocale } from '@/lib/locales'

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
    image: {
      src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1000&q=80&auto=format&fit=crop',
      alt: 'Independent gym with free weights and training equipment',
    },
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
    image: {
      src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1000&q=80&auto=format&fit=crop',
      alt: 'Boutique fitness studio with curated equipment',
    },
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
    image: {
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1000&q=80&auto=format&fit=crop',
      alt: 'CrossFit box with athletes training',
    },
  },
  {
    eyebrow: 'Hyrox facilities',
    heading: 'Fastest-growing format in fitness.',
    body: [
      'Hyrox is exploding, and so is the pool of athletes actively looking to train for it. We help Hyrox-focused facilities and hybrid gyms tap into that demand directly.',
    ],
    bullets: [
      'Targeting Hyrox athletes and functional enthusiasts',
      'Search campaigns for Hyrox-related terms',
      'Training-environment video ads',
      'Community content for organic social',
    ],
    image: {
      src: 'https://images.unsplash.com/photo-1554344728-77cf90d9ed26?w=1000&q=80&auto=format&fit=crop',
      alt: 'Functional fitness training facility',
    },
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
    image: {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80&auto=format&fit=crop',
      alt: 'Large modern gym facility',
    },
  },
]

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function WhoWeWorkWithPage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <>
      <Hero
        eyebrow="Who we work with"
        heading="We work with gyms. All of them."
        body="Independent operators, boutique studios, CrossFit boxes, Hyrox facilities, franchise gyms — if you run a fitness business and need more members, Rep & Reach was built for you."
      />

      {/* Full-bleed page hero image */}
      <div className="relative h-[320px] w-full overflow-hidden bg-brand-bg-secondary md:h-[480px]">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1800&q=80&auto=format&fit=crop"
          alt="Modern gym facility"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {SEGMENTS.map((segment, i) => (
        <SegmentSection
          key={segment.eyebrow}
          {...segment}
          alt={i % 2 === 1}
          imageOnLeft={i % 2 === 1}
        />
      ))}

      <CTABar />
    </>
  )
}
