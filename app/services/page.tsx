import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import CTABar from '@/components/CTABar'
import FadeUp from '@/components/FadeUp'
import { SERVICES_CORE, SERVICES_ADDONS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Services — Rep & Reach',
  description:
    'Full-service performance marketing for fitness businesses. Meta ads, Google ads, YouTube, remarketing, email, SMS, social media, landing pages, and CRM.',
  openGraph: {
    title: 'Services — Rep & Reach',
    description:
      'Full-service performance marketing for fitness businesses. Meta ads, Google ads, YouTube, remarketing, email, SMS, social media, landing pages, and CRM.',
    type: 'website',
    url: 'https://repandreach.com/services',
  },
}

const ALL_SERVICES = [
  {
    ...SERVICES_CORE[0],
    label: '01 — CORE SERVICE',
    heading: 'Meta ads that fill your gym.',
    body: [
      "Facebook and Instagram are where your potential members spend their time. We build and manage paid social campaigns that put your gym in front of the right people — those who are actively looking for a fitness solution, in your area, right now.",
      "We handle everything: audience targeting, creative direction, ad copy, campaign structure, A/B testing, and monthly optimisation. You focus on the gym. We focus on the leads.",
    ],
    includes: [
      'Campaign strategy and setup',
      'Audience research and targeting',
      'Ad creative direction and copy',
      'A/B testing of creatives and audiences',
      'Pixel setup and conversion tracking',
      'Weekly performance monitoring',
      'Monthly reporting and review call',
    ],
    bestFor: 'Independent gyms, boutique studios, CrossFit boxes, Hyrox facilities',
  },
  {
    ...SERVICES_CORE[1],
    label: '02 — CORE SERVICE',
    heading: 'Capture demand. Build awareness.',
    body: [
      'When someone searches "gym near me" or "personal training in [city]", you want to be the first thing they see. Google Search campaigns put you there — capturing high-intent prospects at the exact moment they\'re ready to act.',
      "YouTube pre-roll ads work differently. They build awareness with people in your local area before they've started searching — so when they do, your gym is already familiar. Together, Search and YouTube cover both ends of the funnel.",
    ],
    includes: [
      'Google Search campaign setup and management',
      'YouTube pre-roll campaign setup and management',
      'Keyword research and negative keyword management',
      'Ad copy writing and testing',
      'Conversion tracking setup (calls, form fills, visits)',
      'Google Analytics integration',
      'Monthly reporting',
    ],
    bestFor: 'All gym types, particularly those in competitive local markets',
  },
  {
    ...SERVICES_CORE[2],
    label: '03 — CORE SERVICE',
    heading: "Most leads don't convert first time. We fix that.",
    body: [
      "The majority of people who click your ads won't enquire immediately. They'll visit your website, get distracted, and move on. Remarketing brings them back.",
      "We run targeted follow-up campaigns across Meta and Google that re-engage people who've already shown interest — website visitors, video viewers, people who started but didn't complete an enquiry form. These audiences convert at a significantly higher rate than cold audiences, and at a much lower cost per lead.",
    ],
    includes: [
      'Custom audience setup (website visitors, video viewers, engagement audiences)',
      'Remarketing creative and copy tailored to warm audiences',
      'Cross-platform campaigns (Meta + Google simultaneously)',
      'Sequential messaging strategy',
      'Frequency management to avoid ad fatigue',
      'Integration with core Meta and Google campaigns',
    ],
    bestFor: 'Any gym already running ads that wants to lower cost per lead',
  },
]

const ALL_ADDONS = [
  {
    ...SERVICES_ADDONS[0],
    label: '04 — ADD-ON SERVICE',
    heading: 'Nurture leads. Retain members.',
    body: [
      "Generating a lead is only half the job. Email and SMS marketing ensures every enquiry is followed up properly, every trial is converted, and every member stays engaged long after they join.",
      "We build automated sequences that work in the background — welcome flows, lead nurture sequences, trial-to-member conversion emails, re-engagement campaigns for lapsed members, and referral mechanics. Set up once, running always.",
    ],
    includes: [
      'Email platform setup (we work with most major platforms)',
      'Lead nurture sequence (5–7 email flow post-enquiry)',
      'Trial conversion sequence',
      'Monthly member engagement email',
      'Lapsed member re-engagement campaign',
      'SMS integration for time-sensitive follow-up',
      'Monthly performance reporting',
    ],
    bestFor: 'Gyms with a steady lead flow that want to convert more of them',
  },
  {
    ...SERVICES_ADDONS[1],
    label: '05 — ADD-ON SERVICE',
    heading: 'Stay visible between campaigns.',
    body: [
      "Paid ads generate leads. Organic social builds trust. When a prospect clicks your ad and visits your Instagram, they want to see an active, credible account — not three posts from six months ago.",
      "We manage your Instagram and Facebook presence: content calendar, caption writing, hashtag strategy, and posting schedule. We work with whatever content you can provide (photos, videos, stories from inside the gym) and turn it into a consistent, on-brand feed.",
    ],
    includes: [
      'Monthly content calendar',
      'Caption writing and hashtag strategy',
      '12–16 posts per month (feed + stories)',
      'Community management (comments, DMs — response templates)',
      'Monthly performance review',
      'Coordination with paid ad creative for consistency',
    ],
    bestFor: 'Gyms that want to look active and credible to warm leads',
  },
  {
    ...SERVICES_ADDONS[2],
    label: '06 — ADD-ON SERVICE / ONE-OFF FEE',
    heading: 'Give your ads somewhere worth sending traffic.',
    body: [
      "Most gym websites aren't built to convert ad traffic. They're general brochure sites — great for browsing, not built for a prospect who's clicked an ad and wants to enquire right now.",
      "A dedicated landing page changes that. One focused page, one goal: get the visitor to submit their details. No distractions, no navigation away, no reason to leave without enquiring. Our landing pages are built specifically to pair with your ad campaigns.",
    ],
    includes: [
      'Strategy and wireframe',
      'Copywriting (offer, headline, body, form)',
      'Design and development (Next.js or Webflow)',
      'Mobile-optimised',
      'Form integration (connected to your CRM or email platform)',
      'A/B test-ready structure',
      'Delivered within 10 working days',
    ],
    bestFor: 'Any gym starting a new campaign or promoting a specific offer',
    note: 'This is a one-off project fee, not a monthly retainer.',
  },
  {
    ...SERVICES_ADDONS[3],
    label: '07 — ADD-ON SERVICE / ONE-OFF FEE',
    heading: 'The right offer changes everything.',
    body: [
      '"Join now" is not an offer. The gyms that generate leads consistently have a compelling reason for a prospect to take action today — a trial, a transformation challenge, a free class, a referral incentive.',
      "We work with you to build a membership offer that converts, a lead magnet that attracts the right people, and a follow-up funnel that turns enquiries into members. This is strategic work — and it's the foundation that makes everything else perform better.",
    ],
    includes: [
      'Offer audit (review of your current offer and positioning)',
      'Competitor analysis (what other gyms in your market are doing)',
      'Lead magnet strategy (what to offer to get the enquiry)',
      'Membership offer design (trial, pricing, incentive structure)',
      'Follow-up funnel map (what happens after someone enquires)',
      'Implementation guidance',
    ],
    bestFor: 'Gyms starting from scratch or struggling to convert leads to members',
    note: 'This is a one-off strategy engagement, not a monthly retainer.',
  },
  {
    ...SERVICES_ADDONS[4],
    label: '08 — ADD-ON SERVICE',
    heading: 'Never let a lead go cold.',
    body: [
      "Most gyms have a lead problem. Not generating them — following up on them. Enquiries come in, staff get busy, leads wait too long for a response, and the moment is lost.",
      "We take over your CRM, set up automated and manual follow-up workflows, and ensure every lead is contacted quickly, consistently, and with the right message at the right time. We track enquiry-to-trial and trial-to-member conversion so you always know what's working.",
    ],
    includes: [
      'CRM setup or audit (we work with most major platforms)',
      'Lead intake workflow setup',
      'Response template creation',
      'Follow-up sequence build (calls + email + SMS)',
      'Pipeline tracking and reporting',
      'Enquiry-to-member conversion reporting',
      'Monthly pipeline review',
    ],
    bestFor: 'Gyms generating leads but not converting enough into members',
  },
]

export default function ServicesPage() {
  return (
    <>
      <Hero
        eyebrow="Our services"
        heading="Performance marketing, end to end."
        body="We offer everything a gym needs to generate leads, convert members, and grow consistently. Start with ads. Add more when you're ready."
      />

      {/* Core services */}
      {ALL_SERVICES.map((service, idx) => (
        <section
          key={service.slug}
          className={`border-t border-[var(--color-border-light)] py-20 ${
            idx % 2 === 1 ? 'bg-brand-bg-secondary' : ''
          }`}
        >
          <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
            <div className={`grid gap-16 md:grid-cols-2 ${idx % 2 === 1 ? 'md:direction-rtl' : ''}`}>
              <div className={idx % 2 === 1 ? 'md:order-2' : ''}>
                <FadeUp>
                  <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                    {service.label}
                  </p>
                </FadeUp>
                <FadeUp delay={0.08}>
                  <h2 className="mt-4 font-[family-name:var(--font-display)] text-[36px] leading-[1.2] text-brand-primary">
                    {service.heading}
                  </h2>
                </FadeUp>
                {service.body.map((p, i) => (
                  <FadeUp key={i} delay={0.16 + i * 0.08}>
                    <p className="mt-4 text-[16px] leading-[1.7] text-brand-secondary">{p}</p>
                  </FadeUp>
                ))}
                <FadeUp delay={0.32}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-8 inline-block rounded-[6px] border border-brand-primary px-6 py-2.5 text-[14px] font-medium text-brand-primary transition-all duration-150 hover:bg-brand-primary hover:text-brand-inverse"
                  >
                    Learn more &rarr;
                  </Link>
                </FadeUp>
              </div>
              <div className={`flex items-center justify-center ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                <FadeUp delay={0.12}>
                  <div className="flex h-[300px] w-full items-center justify-center rounded-lg bg-brand-bg-secondary border border-[var(--color-border-light)]">
                    <span className="font-[family-name:var(--font-mono)] text-[64px] font-medium text-brand-tertiary/20">
                      {service.number}
                    </span>
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Add-on services */}
      {ALL_ADDONS.map((service, idx) => (
        <section
          key={service.slug}
          className={`border-t border-[var(--color-border-light)] py-20 ${
            idx % 2 === 0 ? 'bg-brand-bg-secondary' : ''
          }`}
        >
          <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
            <div className="grid gap-16 md:grid-cols-2">
              <div className={idx % 2 === 0 ? 'md:order-2' : ''}>
                <FadeUp>
                  <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                    {service.label}
                  </p>
                </FadeUp>
                <FadeUp delay={0.08}>
                  <h2 className="mt-4 font-[family-name:var(--font-display)] text-[36px] leading-[1.2] text-brand-primary">
                    {service.heading}
                  </h2>
                </FadeUp>
                {service.body.map((p, i) => (
                  <FadeUp key={i} delay={0.16 + i * 0.08}>
                    <p className="mt-4 text-[16px] leading-[1.7] text-brand-secondary">{p}</p>
                  </FadeUp>
                ))}
                <FadeUp delay={0.32}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="mt-8 inline-block rounded-[6px] border border-brand-primary px-6 py-2.5 text-[14px] font-medium text-brand-primary transition-all duration-150 hover:bg-brand-primary hover:text-brand-inverse"
                  >
                    Learn more &rarr;
                  </Link>
                </FadeUp>
              </div>
              <div className={`flex items-center justify-center ${idx % 2 === 0 ? 'md:order-1' : ''}`}>
                <FadeUp delay={0.12}>
                  <div className="flex h-[300px] w-full items-center justify-center rounded-lg bg-brand-bg-secondary border border-[var(--color-border-light)]">
                    <span className="font-[family-name:var(--font-mono)] text-[64px] font-medium text-brand-tertiary/20">
                      {service.number}
                    </span>
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>
      ))}

      <CTABar />
    </>
  )
}
