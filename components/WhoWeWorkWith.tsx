import Link from 'next/link'
import { TARGET_SEGMENTS } from '@/lib/constants'
import FadeUp from './FadeUp'

export default function WhoWeWorkWith() {
  return (
    <section className="relative border-y border-[var(--color-border-light)] bg-brand-bg-secondary py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-16 md:grid-cols-12">
          {/* Left column */}
          <div className="md:col-span-12 lg:col-span-6 lg:col-start-1">
            <FadeUp>
              <p className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.18em] text-brand-secondary">
                <span className="block h-px w-8 bg-brand-accent" />
                Who we work with <span className="text-brand-tertiary">/ 03</span>
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="mt-6 max-w-[14ch] font-[family-name:var(--font-display)] text-[44px] leading-[1] text-brand-primary md:text-[64px]">
                Built for{' '}
                <em className="italic text-brand-accent">serious</em> fitness
                businesses.
              </h2>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mt-8 max-w-[460px] text-[16px] leading-[1.7] text-brand-secondary">
                We work exclusively with gyms and fitness studios. That means
                every campaign we build, every strategy we write, and every lead
                we generate is informed by years of experience inside the
                industry — not theory.
              </p>
            </FadeUp>
            <FadeUp delay={0.24}>
              <p className="mt-4 max-w-[460px] text-[16px] leading-[1.7] text-brand-secondary">
                Independent operators, boutique studios, CrossFit boxes, Hyrox
                facilities, franchise gyms — and everything in between. If you
                run a fitness business and need more members, we should talk.
              </p>
            </FadeUp>
            <FadeUp delay={0.32}>
              <Link
                href="/contact"
                className="group mt-10 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-brand-primary"
              >
                <span className="link-underline">Book a discovery call</span>
                <span className="text-brand-accent transition-transform duration-200 group-hover:translate-x-0.5">
                  &#x2198;
                </span>
              </Link>
            </FadeUp>
          </div>

          {/* Right column — segment chips */}
          <FadeUp
            delay={0.12}
            className="md:col-span-12 lg:col-span-5 lg:col-start-8"
          >
            <ul className="flex flex-wrap content-start gap-2.5">
              {TARGET_SEGMENTS.map((segment, i) => (
                <li key={segment}>
                  <span className="group relative inline-flex items-baseline gap-2 border border-[var(--color-border-medium)] px-4 py-2 text-[13px] text-brand-secondary transition-all duration-150 hover:border-brand-accent hover:text-brand-primary">
                    <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-brand-accent tabular">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {segment}
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
