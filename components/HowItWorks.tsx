import { PROCESS_STEPS } from '@/lib/constants'
import FadeUp from './FadeUp'

export default function HowItWorks() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
        <FadeUp>
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
            The process
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="mt-4 max-w-[600px] font-[family-name:var(--font-display)] text-[36px] leading-[1.2] text-brand-primary">
            From first call to first lead in under a week.
          </h2>
        </FadeUp>

        <div className="relative mt-16">
          {/* Connector line (desktop) */}
          <div className="absolute left-0 right-0 top-[28px] hidden h-px bg-[var(--color-border-light)] md:block" />

          <div className="grid gap-12 md:grid-cols-4 md:gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <FadeUp key={step.number} delay={i * 0.08}>
                <div className="relative">
                  <span className="font-[family-name:var(--font-mono)] text-[48px] font-medium leading-none text-brand-tertiary/30">
                    {step.number}
                  </span>
                  <h3 className="mt-4 text-[22px] font-medium leading-[1.3] text-brand-primary">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.7] text-brand-secondary">
                    {step.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
