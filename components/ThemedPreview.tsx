import type { CSSProperties } from 'react'
import type { Theme } from '@/lib/themes'

interface ThemedPreviewProps {
  theme: Theme
}

const STATS = [
  { value: '£4.20', label: 'Average cost per lead' },
  { value: '3.8×', label: 'Average return on ad spend' },
  { value: '48h', label: 'Average time to first lead' },
  { value: '100%', label: 'Fitness clients. No exceptions.' },
]

const CORE_SERVICES = [
  {
    number: '01',
    name: 'Meta Ads',
    description:
      'Paid social campaigns on Facebook and Instagram that generate membership enquiries and trial sign-ups at scale.',
  },
  {
    number: '02',
    name: 'Google Ads & YouTube',
    description:
      'Search campaigns for high-intent prospects, plus YouTube pre-roll to keep your facility front of mind locally.',
  },
  {
    number: '03',
    name: 'Remarketing',
    description:
      'Follow-up campaigns that re-engage warm leads across Meta and Google. Usually the highest-return activity.',
  },
]

const SEGMENTS = [
  'Independent gyms',
  'Boutique studios',
  'CrossFit boxes',
  'Hyrox facilities',
  'Franchise gyms',
  'Pilates & yoga studios',
  'Boxing gyms',
  'Cycling studios',
]

export default function ThemedPreview({ theme }: ThemedPreviewProps) {
  const cssVars = {
    '--color-bg': theme.colors.bg,
    '--color-bg-secondary': theme.colors.bgSecondary,
    '--color-bg-dark': theme.colors.bgDark,
    '--color-text-primary': theme.colors.textPrimary,
    '--color-text-secondary': theme.colors.textSecondary,
    '--color-text-tertiary': theme.colors.textTertiary,
    '--color-text-inverse': theme.colors.textOnDark,
    '--color-accent': theme.colors.accent,
    '--color-accent-text': theme.colors.accentText,
    '--color-border-light': theme.colors.borderLight,
    '--color-border-medium': theme.colors.borderMedium,
  } as CSSProperties

  return (
    <div style={cssVars} className="bg-brand-bg">
      {/* Themed mini-nav */}
      <div className="border-b border-[var(--color-border-light)]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5 lg:px-16">
          <span className="text-[15px] font-medium tracking-[0.08em] text-brand-primary">
            REP &amp; REACH
          </span>
          <div className="hidden items-center gap-8 md:flex">
            <span className="text-[13px] text-brand-secondary">Services</span>
            <span className="text-[13px] text-brand-secondary">Who We Work With</span>
            <span className="text-[13px] text-brand-secondary">Results</span>
            <span className="text-[13px] text-brand-secondary">Contact</span>
          </div>
          <span className="rounded-[6px] bg-brand-accent px-5 py-2 text-[13px] font-medium text-brand-accent-text">
            Book a call
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-accent">
            Performance marketing for fitness businesses
          </p>
          <h1 className="mt-6 max-w-[820px] font-[family-name:var(--font-display)] text-[44px] leading-[1.05] text-brand-primary md:text-[72px]">
            We fill gyms.
            <br />
            <em className="italic">That&apos;s all we do.</em>
          </h1>
          <p className="mt-6 max-w-[540px] text-[18px] leading-[1.7] text-brand-secondary">
            Meta and Google ads built exclusively for gyms, studios, and fitness
            facilities. More membership enquiries. More trial sign-ups. Less
            guesswork.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <span className="inline-block rounded-[6px] bg-brand-accent px-8 py-3.5 text-[15px] font-medium text-brand-accent-text">
              See how it works
            </span>
            <span className="text-[15px] text-brand-secondary">
              View results &rarr;
            </span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[var(--color-border-light)] bg-brand-bg">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center py-14 text-center ${
                  i < STATS.length - 1
                    ? 'md:border-r md:border-[var(--color-border-light)]'
                    : ''
                } ${i < 2 ? 'border-b border-[var(--color-border-light)] md:border-b-0' : ''}`}
              >
                <span className="font-[family-name:var(--font-mono)] text-[48px] font-medium leading-none text-brand-accent">
                  {stat.value}
                </span>
                <span className="mt-3 text-[14px] leading-[1.5] text-brand-secondary">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-accent">
            What we do
          </p>
          <h2 className="mt-4 max-w-[640px] font-[family-name:var(--font-display)] text-[36px] leading-[1.2] text-brand-primary md:text-[44px]">
            Everything your gym needs to grow.
          </h2>
          <p className="mt-5 max-w-[560px] text-[17px] leading-[1.7] text-brand-secondary">
            We offer a full suite of performance marketing services. Most
            clients start with ads. Everything else is available when you&apos;re
            ready.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {CORE_SERVICES.map((service) => (
              <div
                key={service.number}
                className="flex h-full flex-col rounded-lg border border-[var(--color-border-light)] bg-brand-bg-secondary p-8"
              >
                <p className="font-[family-name:var(--font-mono)] text-[13px] font-medium text-brand-accent">
                  {service.number}
                </p>
                <h3 className="mt-4 text-[22px] font-medium leading-[1.3] text-brand-primary">
                  {service.name}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.7] text-brand-secondary">
                  {service.description}
                </p>
                <span className="mt-6 text-[14px] text-brand-accent">
                  Learn more &rarr;
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="bg-brand-bg-secondary py-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-accent">
                Who we work with
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-[36px] leading-[1.2] text-brand-primary md:text-[44px]">
                Built for serious fitness businesses.
              </h2>
              <p className="mt-6 text-[16px] leading-[1.7] text-brand-secondary">
                We work exclusively with gyms and fitness studios. Every
                campaign, every strategy, and every lead is informed by years
                of experience in the fitness industry.
              </p>
            </div>
            <div className="flex flex-wrap content-start gap-3">
              {SEGMENTS.map((segment) => (
                <span
                  key={segment}
                  className="rounded-full border border-[var(--color-border-medium)] px-[18px] py-2 text-[14px] text-brand-secondary"
                >
                  {segment}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bar */}
      <section className="bg-brand-bg-dark">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 px-6 py-20 md:flex-row md:items-center lg:px-16">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-[36px] leading-[1.2] text-brand-inverse md:text-[44px]">
              Ready to fill your gym?
            </h2>
            <p
              className="mt-4 max-w-[440px] text-[16px] leading-[1.7]"
              style={{ color: theme.colors.textOnDarkMuted }}
            >
              Book a free 20-minute discovery call. No commitment. No hard
              sell. Just an honest conversation.
            </p>
          </div>
          <span className="inline-block rounded-[6px] bg-brand-accent px-8 py-3.5 text-[15px] font-medium text-brand-accent-text">
            Book a call &rarr;
          </span>
        </div>
      </section>

      {/* Themed mini-footer */}
      <footer className="border-t border-[var(--color-border-light)] bg-brand-bg">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center lg:px-16">
          <span className="text-[15px] font-medium tracking-[0.08em] text-brand-primary">
            REP &amp; REACH
          </span>
          <span className="text-[13px] text-brand-tertiary">
            Performance marketing for gyms and fitness studios.
          </span>
        </div>
      </footer>
    </div>
  )
}
