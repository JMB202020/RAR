import Image from 'next/image'
import { PROCESS_STEPS } from '@/lib/constants'
import { PROCESS_BG } from '@/lib/images'
import FadeUp from './FadeUp'

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-brand-bg-secondary py-24 md:py-[96px]">
      {/* Subtle background image for texture */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <Image
          src={PROCESS_BG.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[rgba(247,247,245,0.92)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1160px] px-6 lg:px-20">
        <FadeUp>
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-accent">
            The process
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="mt-4 max-w-[600px] font-[family-name:var(--font-display)] text-[32px] leading-[1.05] text-brand-primary md:text-[40px]">
            From first call to first lead in under a week.
          </h2>
        </FadeUp>

        <div className="relative mt-16">
          <div className="absolute top-[18px] right-0 left-0 hidden h-px bg-[rgba(0,0,0,0.10)] md:block" />

          <div className="grid gap-14 md:grid-cols-4 md:gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <FadeUp key={step.number} delay={0.12 + i * 0.08}>
                <div className="relative">
                  <p className="relative inline-block bg-brand-bg-secondary pr-3 font-[family-name:var(--font-mono)] text-[32px] font-semibold leading-none text-brand-accent tabular">
                    {step.number}
                  </p>
                  <h3 className="mt-6 text-[17px] font-semibold leading-[1.3] text-brand-primary">
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
