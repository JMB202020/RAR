import Link from 'next/link'
import FadeUp from './FadeUp'

interface SegmentSectionProps {
  eyebrow: string
  heading: string
  body: string[]
  bullets: string[]
}

export default function SegmentSection({
  eyebrow,
  heading,
  body,
  bullets,
}: SegmentSectionProps) {
  return (
    <section className="border-t border-[var(--color-border-light)] py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-12 lg:col-span-7">
            <FadeUp>
              <p className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.18em] text-brand-secondary">
                <span className="block h-px w-8 bg-brand-accent" />
                {eyebrow}
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="mt-6 max-w-[18ch] font-[family-name:var(--font-display)] text-[40px] leading-[1.05] text-brand-primary md:text-[56px]">
                {heading}
              </h2>
            </FadeUp>
            {body.map((paragraph, i) => (
              <FadeUp key={i} delay={0.16 + i * 0.08}>
                <p className="mt-5 max-w-[560px] text-[16px] leading-[1.7] text-brand-secondary">
                  {paragraph}
                </p>
              </FadeUp>
            ))}
          </div>
          <div className="md:col-span-12 lg:col-span-4 lg:col-start-9">
            <FadeUp delay={0.2}>
              <p className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-brand-tertiary">
                <span className="block h-px w-6 bg-brand-accent" />
                We help with
              </p>
              <ul className="mt-6 flex flex-col gap-3.5">
                {bullets.map((bullet, i) => (
                  <li
                    key={bullet}
                    className="flex items-baseline gap-3 text-[15px] leading-[1.55] text-brand-secondary"
                  >
                    <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-brand-accent tabular">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-brand-secondary"
              >
                <span className="link-underline">Book a call</span>
                <span className="text-brand-accent transition-transform duration-200 group-hover:translate-x-0.5">
                  &#x2198;
                </span>
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
