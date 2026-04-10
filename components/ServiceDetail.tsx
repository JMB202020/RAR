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
    <section className="py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
        <div className="grid gap-16 md:grid-cols-2">
          {/* Left — Content */}
          <div>
            <FadeUp>
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                {label}
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="mt-4 font-[family-name:var(--font-display)] text-[44px] leading-[1.1] text-brand-primary md:text-[52px]">
                {heading}
              </h1>
            </FadeUp>
            {body.map((paragraph, i) => (
              <FadeUp key={i} delay={0.16 + i * 0.08}>
                <p className="mt-6 text-[16px] leading-[1.7] text-brand-secondary">
                  {paragraph}
                </p>
              </FadeUp>
            ))}
          </div>

          {/* Right — What's included */}
          <div>
            <FadeUp delay={0.12}>
              <div className="rounded-lg bg-brand-bg-secondary p-8">
                <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                  What&apos;s included
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] leading-[1.6] text-brand-secondary"
                    >
                      <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
                      {item}
                    </li>
                  ))}
                </ul>

                {note && (
                  <p className="mt-8 text-[14px] leading-[1.6] text-brand-tertiary italic">
                    {note}
                  </p>
                )}

                <div className="mt-8 border-t border-[var(--color-border-light)] pt-6">
                  <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                    Best for
                  </p>
                  <p className="mt-2 text-[15px] leading-[1.6] text-brand-secondary">
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
