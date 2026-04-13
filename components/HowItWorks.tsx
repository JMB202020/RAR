import { PROCESS_STEPS } from '@/lib/constants'
import FadeUp from './FadeUp'

export default function HowItWorks() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-12 lg:col-span-8">
            <FadeUp>
              <p className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.18em] text-brand-secondary">
                <span className="block h-px w-8 bg-brand-accent" />
                The process <span className="text-brand-tertiary">/ 04</span>
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="mt-6 max-w-[18ch] font-[family-name:var(--font-display)] text-[44px] leading-[1] text-brand-primary md:text-[64px]">
                From first call to first lead in{' '}
                <em className="italic text-brand-accent">under a week.</em>
              </h2>
            </FadeUp>
          </div>
        </div>

        <div className="relative mt-20">
          {/* Connector — lime hairline interrupted by step numbers */}
          <div className="absolute left-0 right-0 top-[44px] hidden h-px bg-[var(--color-border-light)] md:block" />

          <div className="grid gap-14 md:grid-cols-4 md:gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <FadeUp key={step.number} delay={i * 0.08}>
                <div className="relative">
                  {/* Number block — large mono lime */}
                  <div className="relative inline-flex items-center gap-3 bg-brand-bg pr-3">
                    <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-brand-tertiary">
                      Step
                    </span>
                    <span className="font-[family-name:var(--font-mono)] text-[44px] font-medium leading-none text-brand-accent tabular">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-[20px] font-medium leading-[1.3] text-brand-primary">
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
