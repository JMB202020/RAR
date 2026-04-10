import { TRUST_REGIONS } from '@/lib/constants'
import FadeUp from './FadeUp'

// TODO: Replace with client logos when available
export default function TrustStrip() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1200px] px-6 text-center lg:px-16">
        <FadeUp>
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
            Trusted by fitness businesses worldwide
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {TRUST_REGIONS.map((region, i) => (
              <span key={region.name} className="text-[14px] text-brand-secondary">
                {region.flag} {region.name}
                {i < TRUST_REGIONS.length - 1 && (
                  <span className="ml-6 text-brand-tertiary/40">&middot;</span>
                )}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
