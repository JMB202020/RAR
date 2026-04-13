import Link from 'next/link'
import { SERVICES_CORE, SERVICES_ADDONS } from '@/lib/constants'
import FadeUp from './FadeUp'

export default function ServicesGrid() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-12 lg:col-span-5">
            <FadeUp>
              <p className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.18em] text-brand-secondary">
                <span className="block h-px w-8 bg-brand-accent" />
                What we do <span className="text-brand-tertiary">/ 02</span>
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="mt-6 max-w-[12ch] font-[family-name:var(--font-display)] text-[44px] leading-[1] text-brand-primary md:text-[64px]">
                Everything your gym needs to{' '}
                <em className="italic text-brand-accent">grow.</em>
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.16} className="md:col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="mt-6 max-w-[460px] text-[16px] leading-[1.7] text-brand-secondary lg:mt-24">
              We offer a full suite of performance marketing services — from
              paid ads to email, social, and funnel strategy. Most clients
              start with ads. Everything else is available when you&apos;re
              ready.
            </p>
          </FadeUp>
        </div>

        {/* Core services grid */}
        <div className="mt-20 grid gap-px bg-[var(--color-border-light)] md:grid-cols-3">
          {SERVICES_CORE.map((service, i) => (
            <FadeUp key={service.slug} delay={i * 0.08}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex h-full flex-col bg-brand-bg p-8 transition-colors duration-300 hover:bg-brand-bg-secondary"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-brand-accent tabular">
                    / {service.number}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-brand-tertiary">
                    Core
                  </span>
                </div>
                <h3 className="mt-12 font-[family-name:var(--font-display)] text-[32px] leading-[1.05] text-brand-primary">
                  {service.name}
                </h3>
                <p className="mt-4 flex-1 text-[15px] leading-[1.65] text-brand-secondary">
                  {service.description}
                </p>
                <span className="mt-10 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-brand-secondary transition-colors duration-200 group-hover:text-brand-accent">
                  <span className="link-underline">Learn more</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    &#x2198;
                  </span>
                </span>
                {/* Top hairline that lights up on hover */}
                <span className="absolute left-0 right-0 top-0 h-px w-0 bg-brand-accent transition-all duration-500 group-hover:w-full" />
              </Link>
            </FadeUp>
          ))}
        </div>

        {/* Add-on services */}
        <FadeUp>
          <p className="mt-28 flex items-center gap-3 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.18em] text-brand-secondary">
            <span className="block h-px w-8 bg-brand-accent/60" />
            Additional services <span className="text-brand-tertiary">/ 02.b</span>
          </p>
        </FadeUp>
        <div className="mt-10 grid gap-px bg-[var(--color-border-light)] sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES_ADDONS.map((service, i) => (
            <FadeUp key={service.slug} delay={i * 0.06}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex h-full flex-col bg-brand-bg-secondary p-8 transition-colors duration-300 hover:bg-brand-bg-elevated"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-brand-accent tabular">
                    / {service.number}
                  </span>
                  <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-brand-tertiary">
                    Add-on
                  </span>
                </div>
                <h3 className="mt-10 text-[22px] font-medium leading-[1.25] text-brand-primary">
                  {service.name}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-[1.65] text-brand-secondary">
                  {service.description}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-brand-secondary transition-colors duration-200 group-hover:text-brand-accent">
                  <span className="link-underline">Learn more</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    &#x2198;
                  </span>
                </span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
