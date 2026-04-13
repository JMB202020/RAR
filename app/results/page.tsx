import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import CTABar from '@/components/CTABar'
import FadeUp from '@/components/FadeUp'

export const metadata: Metadata = {
  title: 'Results — Rep & Reach',
  description:
    'Case studies and results from gyms and fitness studios we\'ve worked with across the UK, US, Australia, and beyond.',
  openGraph: {
    title: 'Results — Rep & Reach',
    description:
      'Case studies and results from gyms and fitness studios we\'ve worked with across the UK, US, Australia, and beyond.',
    type: 'website',
    url: 'https://repandreach.com/results',
  },
}

// TODO: Replace placeholder cards with data from lib/case-studies.ts
// Case study data structure:
// {
//   id: string
//   gymName: string
//   location: string
//   gymType: string
//   keyMetric: string
//   keyMetricLabel: string
//   description: string
//   services: string[]
//   slug: string
// }

const PLACEHOLDERS = [
  { kind: 'Boutique studio', region: 'London' },
  { kind: 'CrossFit box', region: 'Berlin' },
  { kind: 'Hyrox facility', region: 'Manchester' },
  { kind: 'Independent gym', region: 'Brooklyn' },
  { kind: 'Pilates studio', region: 'Sydney' },
  { kind: 'Boxing gym', region: 'Dublin' },
] as const

export default function ResultsPage() {
  return (
    <>
      <Hero
        eyebrow="Results"
        heading="Results that speak for themselves."
        body="We let the numbers do the talking. Case studies from gyms and studios we've worked with across the UK, US, Australia, and beyond."
        index="03"
      />

      <section className="pb-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          {/* Coming soon banner */}
          <FadeUp>
            <div className="border border-[var(--color-border-light)] bg-brand-bg-secondary p-10">
              <div className="grid gap-8 md:grid-cols-12 md:items-center">
                <div className="md:col-span-8">
                  <p className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-brand-tertiary">
                    <span className="live-dot" /> First cohort in production
                  </p>
                  <p className="mt-4 max-w-[560px] text-[16px] leading-[1.7] text-brand-secondary">
                    We&apos;re currently onboarding our first clients. Case
                    studies will be published here as results come in. In the
                    meantime, book a call to hear directly about our approach.
                  </p>
                </div>
                <div className="md:col-span-4 md:text-right">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 bg-brand-accent px-7 py-3.5 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.16em] text-brand-accent-text transition-all duration-200 hover:bg-[#E5FF40]"
                  >
                    Book a discovery call
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                      &#x2198;
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Placeholder grid */}
          <div className="mt-14 grid gap-px bg-[var(--color-border-light)] md:grid-cols-3">
            {PLACEHOLDERS.map((p, i) => (
              <FadeUp key={`${p.kind}-${p.region}`} delay={(i % 3) * 0.08}>
                <div className="hatch flex h-[300px] flex-col justify-between bg-brand-bg p-8">
                  <div className="flex items-baseline justify-between">
                    <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-brand-accent tabular">
                      / Case {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-brand-tertiary">
                      Forthcoming
                    </span>
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-display)] text-[28px] leading-[1.05] text-brand-primary/85">
                      {p.kind}
                      <br />
                      <em className="italic text-brand-tertiary">— {p.region}</em>
                    </p>
                    <p className="mt-4 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-brand-tertiary">
                      Case study in production
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <CTABar />
    </>
  )
}
