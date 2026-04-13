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

const PLACEHOLDERS = [
  { kind: 'Boutique studio', region: 'London' },
  { kind: 'CrossFit box', region: 'Berlin' },
  { kind: 'Hyrox facility', region: 'Manchester' },
] as const

export default function ResultsGrid() {
  return (
    <section className="relative border-t border-[var(--color-border-light)] py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <FadeUp>
              <p className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.18em] text-brand-secondary">
                <span className="block h-px w-8 bg-brand-accent" />
                Results <span className="text-brand-tertiary">/ 05</span>
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="mt-6 max-w-[14ch] font-[family-name:var(--font-display)] text-[44px] leading-[1] text-brand-primary md:text-[64px]">
                Gyms growing with{' '}
                <em className="italic text-brand-accent">Rep &amp; Reach.</em>
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.16}>
            <Link
              href="/results"
              className="group inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-brand-secondary"
            >
              <span className="link-underline">See all results</span>
              <span className="text-brand-accent transition-transform duration-200 group-hover:translate-x-0.5">
                &#x2198;
              </span>
            </Link>
          </FadeUp>
        </div>

        <div className="mt-16 grid gap-px bg-[var(--color-border-light)] md:grid-cols-3">
          {PLACEHOLDERS.map((p, i) => (
            <FadeUp key={p.region} delay={i * 0.08}>
              <div className="hatch group relative flex h-[320px] flex-col justify-between bg-brand-bg p-8">
                <div className="flex items-start justify-between">
                  <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-brand-accent tabular">
                    / Case 0{i + 1}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-brand-tertiary">
                    Forthcoming
                  </span>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-display)] text-[28px] leading-[1.05] text-brand-primary/80">
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
  )
}
