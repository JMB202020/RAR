import Link from 'next/link'
import FadeUp from './FadeUp'
import { STATS } from '@/lib/constants'

interface CTA {
  label: string
  href: string
  variant: 'primary' | 'secondary'
}

interface HeroProps {
  eyebrow: string
  heading: React.ReactNode
  body: string
  /** Small muted line below body, e.g. pricing anchor on homepage. */
  pricingNote?: string
  ctas?: CTA[]
  fullHeight?: boolean
  /** Show the 2x2 stats block on the right (desktop only). Homepage hero only. */
  withStats?: boolean
}

export default function Hero({
  eyebrow,
  heading,
  body,
  pricingNote,
  ctas,
  fullHeight,
  withStats,
}: HeroProps) {
  return (
    <section
      className={`flex items-center ${
        fullHeight ? 'min-h-screen pt-32 pb-20 md:pt-0 md:pb-0' : 'pt-40 pb-20'
      }`}
    >
      <div className="mx-auto w-full max-w-[1160px] px-6 lg:px-20">
        <div
          className={
            withStats
              ? 'grid items-center gap-16 lg:grid-cols-[1fr_auto] lg:gap-24'
              : ''
          }
        >
          <div>
            <FadeUp>
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                {eyebrow}
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="mt-4 max-w-[700px] font-[family-name:var(--font-display)] text-[44px] leading-[1.05] text-brand-primary md:text-[64px]">
                {heading}
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mt-6 max-w-[480px] text-[17px] leading-[1.75] text-brand-secondary">
                {body}
              </p>
            </FadeUp>
            {pricingNote && (
              <FadeUp delay={0.2}>
                <p className="mt-4 max-w-[480px] text-[14px] leading-[1.6] text-brand-tertiary">
                  {pricingNote}
                </p>
              </FadeUp>
            )}
            {ctas && ctas.length > 0 && (
              <FadeUp delay={0.24}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  {ctas.map((cta) =>
                    cta.variant === 'primary' ? (
                      <Link
                        key={cta.label}
                        href={cta.href}
                        className="inline-flex items-center gap-1.5 rounded-[6px] bg-brand-primary px-8 py-3.5 text-[15px] font-medium text-brand-inverse transition-opacity duration-150 hover:opacity-80"
                      >
                        {cta.label} <span aria-hidden>&rarr;</span>
                      </Link>
                    ) : (
                      <Link
                        key={cta.label}
                        href={cta.href}
                        className="inline-flex items-center gap-1.5 rounded-[6px] border border-brand-primary px-8 py-3.5 text-[15px] font-medium text-brand-primary transition-colors duration-150 hover:bg-brand-primary hover:text-brand-inverse"
                      >
                        {cta.label} <span aria-hidden>&rarr;</span>
                      </Link>
                    ),
                  )}
                </div>
              </FadeUp>
            )}
          </div>

          {withStats && (
            <FadeUp delay={0.18} className="hidden lg:block">
              <div className="grid grid-cols-2 gap-x-12 gap-y-10 border-l border-[var(--color-border-light)] pl-12">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-[family-name:var(--font-mono)] text-[36px] font-semibold leading-none text-brand-primary tabular">
                      {stat.value}
                    </p>
                    <p className="mt-3 text-[13px] leading-[1.5] text-brand-secondary">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>
          )}
        </div>
      </div>
    </section>
  )
}
