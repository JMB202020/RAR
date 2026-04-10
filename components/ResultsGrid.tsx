import Link from 'next/link'
import FadeUp from './FadeUp'

// TODO: Replace placeholder cards with real case study data from lib/case-studies.ts
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

export default function ResultsGrid() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
        <FadeUp>
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
            Results
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[36px] leading-[1.2] text-brand-primary">
            Gyms growing with Rep &amp; Reach.
          </h2>
        </FadeUp>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="flex h-[280px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-[var(--color-border-medium)] p-8 text-center">
                <p className="text-[16px] font-medium text-brand-tertiary">
                  Coming soon
                </p>
                <p className="mt-2 text-[14px] text-brand-tertiary/60">
                  Case study in progress
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.32}>
          <div className="mt-10 text-center">
            <Link
              href="/results"
              className="text-[15px] text-brand-secondary underline-offset-4 transition-colors duration-150 hover:text-brand-primary hover:underline"
            >
              See all results &rarr;
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
