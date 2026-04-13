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
    label: 'Core service',
    heading: 'Meta ads that fill your gym.',
    body: [
      "Facebook and Instagram are where your potential members spend their time. We build and manage paid social campaigns that put your gym in front of the right people — those who are actively looking for a fitness solution, in your area, right now.",
      "We handle everything: audience targeting, creative direction, ad copy, campaign structure, A/B testing, and monthly optimisation. You focus on the gym. We focus on the leads.",
    ],
    bestFor: 'Independent gyms, boutique studios, CrossFit boxes, Hyrox facilities',
  },
  {
    ...SERVICES_CORE[1],
    label: 'Core service',
    heading: 'Capture demand. Build awareness.',
    body: [
      'When someone searches "gym near me" or "personal training in [city]", you want to be the first thing they see. Google Search campaigns put you there — capturing high-intent prospects at the exact moment they\'re ready to act.',
      "YouTube pre-roll ads work differently. They build awareness with people in your local area before they've started searching — so when they do, your gym is already familiar. Together, Search and YouTube cover both ends of the funnel.",
    ],
    bestFor: 'All gym types, particularly those in competitive local markets',
  },
  {
    ...SERVICES_CORE[2],
    label: 'Core service',
    heading: "Most leads don't convert first time. We fix that.",
    body: [
      "The majority of people who click your ads won't enquire immediately. They'll visit your website, get distracted, and move on. Remarketing brings them back.",
      "We run targeted follow-up campaigns across Meta and Google that re-engage people who've already shown interest — website visitors, video viewers, people who started but didn't complete an enquiry form. These audiences convert at a significantly higher rate than cold audiences, and at a much lower cost per lead.",
    ],
    bestFor: 'Any gym already running ads that wants to lower cost per lead',
  },
]

const ALL_ADDONS = [
  {
    ...SERVICES_ADDONS[0],
    label: 'Add-on service',
    heading: 'Nurture leads. Retain members.',
    body: [
      "Generating a lead is only half the job. Email and SMS marketing ensures every enquiry is followed up properly, every trial is converted, and every member stays engaged long after they join.",
      "We build automated sequences that work in the background — welcome flows, lead nurture sequences, trial-to-member conversion emails, re-engagement campaigns for lapsed members, and referral mechanics. Set up once, running always.",
    ],
    bestFor: 'Gyms with a steady lead flow that want to convert more of them',
  },
  {
    ...SERVICES_ADDONS[1],
    label: 'Add-on service',
    heading: 'Stay visible between campaigns.',
    body: [
      "Paid ads generate leads. Organic social builds trust. When a prospect clicks your ad and visits your Instagram, they want to see an active, credible account — not three posts from six months ago.",
      "We manage your Instagram and Facebook presence: content calendar, caption writing, hashtag strategy, and posting schedule. We work with whatever content you can provide and turn it into a consistent, on-brand feed.",
    ],
    bestFor: 'Gyms that want to look active and credible to warm leads',
  },
  {
    ...SERVICES_ADDONS[2],
    label: 'Add-on service / one-off',
    heading: 'Give your ads somewhere worth sending traffic.',
    body: [
      "Most gym websites aren't built to convert ad traffic. They're general brochure sites — great for browsing, not built for a prospect who's clicked an ad and wants to enquire right now.",
      "A dedicated landing page changes that. One focused page, one goal: get the visitor to submit their details. No distractions, no navigation away, no reason to leave without enquiring.",
    ],
    bestFor: 'Any gym starting a new campaign or promoting a specific offer',
  },
  {
    ...SERVICES_ADDONS[3],
    label: 'Add-on service / one-off',
    heading: 'The right offer changes everything.',
    body: [
      '"Join now" is not an offer. The gyms that generate leads consistently have a compelling reason for a prospect to take action today — a trial, a transformation challenge, a free class, a referral incentive.',
      "We work with you to build a membership offer that converts, a lead magnet that attracts the right people, and a follow-up funnel that turns enquiries into members.",
    ],
    bestFor: 'Gyms starting from scratch or struggling to convert leads to members',
  },
  {
    ...SERVICES_ADDONS[4],
    label: 'Add-on service',
    heading: 'Never let a lead go cold.',
    body: [
      "Most gyms have a lead problem. Not generating them — following up on them. Enquiries come in, staff get busy, leads wait too long for a response, and the moment is lost.",
      "We take over your CRM, set up automated and manual follow-up workflows, and ensure every lead is contacted quickly, consistently, and with the right message at the right time.",
    ],
    bestFor: 'Gyms generating leads but not converting enough into members',
  },
]

interface ServiceRowProps {
  number: string
  slug: string
  label: string
  heading: string
  body: string[]
  bestFor: string
  reverse?: boolean
  alt?: boolean
}

function ServiceRow({
  number,
  slug,
  label,
  heading,
  body,
  bestFor,
  reverse,
  alt,
}: ServiceRowProps) {
  return (
    <section
      className={`relative border-t border-[var(--color-border-light)] py-24 ${
        alt ? 'bg-brand-bg-secondary' : ''
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid items-start gap-12 md:grid-cols-12">
          <div
            className={`md:col-span-12 lg:col-span-7 ${
              reverse ? 'lg:col-start-6' : ''
            }`}
          >
            <FadeUp>
              <p className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.18em] text-brand-secondary">
                <span className="block h-px w-8 bg-brand-accent" />
                {label} <span className="text-brand-tertiary">/ {number}</span>
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="mt-6 max-w-[18ch] font-[family-name:var(--font-display)] text-[40px] leading-[1] text-brand-primary md:text-[56px]">
                {heading}
              </h2>
            </FadeUp>
            {body.map((p, i) => (
              <FadeUp key={i} delay={0.16 + i * 0.08}>
                <p className="mt-5 max-w-[560px] text-[16px] leading-[1.7] text-brand-secondary">
                  {p}
                </p>
              </FadeUp>
            ))}
            <FadeUp delay={0.32}>
              <Link
                href={`/services/${slug}`}
                className="group mt-10 inline-flex items-center gap-2 bg-brand-accent px-6 py-3 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.16em] text-brand-accent-text transition-all duration-200 hover:bg-[#E5FF40]"
              >
                Learn more
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                  &#x2198;
                </span>
              </Link>
            </FadeUp>
          </div>
          <div
            className={`md:col-span-12 lg:col-span-4 ${
              reverse ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-9'
            }`}
          >
            <FadeUp delay={0.12}>
              <div className="hatch flex aspect-[4/5] flex-col justify-between border border-[var(--color-border-light)] bg-brand-bg p-6">
                <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-brand-tertiary">
                  / Best for
                </span>
                <span className="font-[family-name:var(--font-display)] text-[140px] leading-[0.85] text-brand-accent tabular">
                  {number}
                </span>
                <p className="text-[14px] leading-[1.55] text-brand-secondary">
                  {bestFor}
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  return (
    <>
      <Hero
        eyebrow="Our services"
        heading="Performance marketing, end to end."
        body="We offer everything a gym needs to generate leads, convert members, and grow consistently. Start with ads. Add more when you're ready."
        index="02"
      />

      {ALL_SERVICES.map((s, idx) => (
        <ServiceRow
          key={s.slug}
          number={s.number}
          slug={s.slug}
          label={s.label}
          heading={s.heading}
          body={s.body}
          bestFor={s.bestFor}
          reverse={idx % 2 === 1}
          alt={idx % 2 === 1}
        />
      ))}

      {ALL_ADDONS.map((s, idx) => (
        <ServiceRow
          key={s.slug}
          number={s.number}
          slug={s.slug}
          label={s.label}
          heading={s.heading}
          body={s.body}
          bestFor={s.bestFor}
          reverse={idx % 2 === 0}
          alt={idx % 2 === 0}
        />
      ))}

      <CTABar />
    </>
  )
}
