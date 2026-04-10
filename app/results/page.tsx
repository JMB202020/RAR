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

export default function ResultsPage() {
  return (
    <>
      <Hero
        eyebrow="Results"
        heading="Results that speak for themselves."
        body="We let the numbers do the talking. Case studies from gyms and studios we've worked with across the UK, US, Australia, and beyond."
      />

      <section className="pb-24">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
          {/* Coming soon banner */}
          <FadeUp>
            <div className="rounded-lg bg-brand-bg-secondary p-8 text-center">
              <p className="text-[16px] leading-[1.7] text-brand-secondary">
                We&apos;re currently onboarding our first clients. Case studies
                will be published here as results come in. In the meantime, book
                a call to hear directly about our approach.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-block rounded-[6px] bg-brand-primary px-8 py-3.5 text-[15px] font-medium text-brand-inverse transition-opacity duration-150 hover:opacity-85"
              >
                Book a discovery call
              </Link>
            </div>
          </FadeUp>

          {/* Placeholder grid */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="flex h-[280px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--color-border-medium)] p-8 text-center">
                  <p className="text-[16px] font-medium text-brand-tertiary">
                    Case study coming soon
                  </p>
                  <p className="mt-2 text-[14px] text-brand-tertiary/60">
                    Check back shortly.
                  </p>
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
