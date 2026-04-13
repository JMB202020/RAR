import FadeUp from './FadeUp'

interface ServiceDetailProps {
  label: string
  heading: string
  body: string[]
  includes: string[]
  bestFor: string
  note?: string
}

export default function ServiceDetail({
  label,
  heading,
  body,
  includes,
  bestFor,
  note,
}: ServiceDetailProps) {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-16 md:grid-cols-12">
          {/* Left — Content */}
          <div className="md:col-span-12 lg:col-span-7">
            <FadeUp>
              <p className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.18em] text-brand-secondary">
                <span className="block h-px w-8 bg-brand-accent" />
                {label}
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="mt-6 max-w-[16ch] font-[family-name:var(--font-display)] text-[52px] leading-[0.95] text-brand-primary md:text-[80px]">
                {heading}
              </h1>
            </FadeUp>
            {body.map((paragraph, i) => (
              <FadeUp key={i} delay={0.16 + i * 0.08}>
                <p className="mt-6 max-w-[560px] text-[16px] leading-[1.7] text-brand-secondary">
                  {paragraph}
                </p>
              </FadeUp>
            ))}
          </div>

          {/* Right — What's included */}
          <div className="md:col-span-12 lg:col-span-4 lg:col-start-9">
            <FadeUp delay={0.12}>
              <div className="border border-[var(--color-border-light)] bg-brand-bg-secondary p-8">
                <p className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-brand-tertiary">
                  <span className="block h-px w-6 bg-brand-accent" />
                  What&apos;s included
                </p>
                <ul className="mt-6 flex flex-col gap-3.5">
                  {includes.map((item, i) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 text-[15px] leading-[1.55] text-brand-secondary"
                    >
                      <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-brand-accent tabular">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {note && (
                  <p className="mt-8 border-l-2 border-brand-accent/50 pl-4 text-[14px] leading-[1.6] italic text-brand-tertiary">
                    {note}
                  </p>
                )}

                <div className="mt-8 border-t border-[var(--color-border-light)] pt-6">
                  <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-brand-tertiary">
                    <span className="text-brand-accent">/</span> Best for
                  </p>
                  <p className="mt-2 text-[15px] leading-[1.55] text-brand-secondary">
                    {bestFor}
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
