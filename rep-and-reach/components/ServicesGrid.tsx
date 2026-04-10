import Link from 'next/link'
import { SERVICES_CORE, SERVICES_ADDONS } from '@/lib/constants'
import FadeUp from './FadeUp'

export default function ServicesGrid() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
        <FadeUp>
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
            What we do
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[36px] leading-[1.2] text-brand-primary">
            Everything your gym needs to grow.
          </h2>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="mt-4 max-w-[520px] text-[18px] leading-[1.7] text-brand-secondary">
            We offer a full suite of performance marketing services — from paid
            ads to email, social, and funnel strategy. Most clients start with
            ads. Everything else is available when you&apos;re ready.
          </p>
        </FadeUp>

        {/* Core services grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SERVICES_CORE.map((service, i) => (
            <FadeUp key={service.slug} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-lg border border-[var(--color-border-light)] bg-white p-8">
                <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                  {service.number}
                </p>
                <h3 className="mt-3 text-[22px] font-medium leading-[1.3] text-brand-primary">
                  {service.name}
                </h3>
                <p className="mt-3 flex-1 text-[16px] leading-[1.7] text-brand-secondary">
                  {service.description}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-6 text-[14px] text-brand-secondary transition-colors duration-150 hover:text-brand-primary"
                >
                  Learn more &rarr;
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Add-on services */}
        <FadeUp>
          <p className="mt-20 text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
            Additional services
          </p>
        </FadeUp>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES_ADDONS.map((service, i) => (
            <FadeUp key={service.slug} delay={i * 0.08}>
              <div className="relative flex h-full flex-col rounded-lg bg-brand-bg-secondary p-8">
                <span className="absolute right-6 top-6 rounded-full border border-[var(--color-border-medium)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.05em] text-brand-tertiary">
                  Add-on
                </span>
                <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                  {service.number}
                </p>
                <h3 className="mt-3 text-[22px] font-medium leading-[1.3] text-brand-primary">
                  {service.name}
                </h3>
                <p className="mt-3 flex-1 text-[16px] leading-[1.7] text-brand-secondary">
                  {service.description}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-6 text-[14px] text-brand-secondary transition-colors duration-150 hover:text-brand-primary"
                >
                  Learn more &rarr;
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
