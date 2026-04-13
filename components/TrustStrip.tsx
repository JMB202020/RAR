import { TRUST_REGIONS } from '@/lib/constants'
import FadeUp from './FadeUp'

// TODO: Replace with client logos when available
export default function TrustStrip() {
  return (
    <section className="relative border-y border-[var(--color-border-light)] bg-brand-bg-secondary py-14">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <FadeUp>
            <p className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-brand-tertiary">
              <span className="block h-px w-6 bg-brand-accent" />
              Trusted by fitness businesses worldwide
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {TRUST_REGIONS.map((region, i) => (
                <span
                  key={region.name}
                  className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.12em] text-brand-secondary"
                >
                  <span aria-hidden>{region.flag}</span>
                  {region.name}
                  {i < TRUST_REGIONS.length - 1 && (
                    <span className="ml-4 text-brand-accent/40">/</span>
                  )}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
