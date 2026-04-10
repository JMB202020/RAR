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
    <section className="border-t border-[var(--color-border-light)] py-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <FadeUp>
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                {eyebrow}
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-[36px] leading-[1.2] text-brand-primary">
                {heading}
              </h2>
            </FadeUp>
            {body.map((paragraph, i) => (
              <FadeUp key={i} delay={0.16 + i * 0.08}>
                <p className="mt-4 text-[16px] leading-[1.7] text-brand-secondary">
                  {paragraph}
                </p>
              </FadeUp>
            ))}
          </div>
          <div>
            <FadeUp delay={0.2}>
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                We help with
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-[15px] leading-[1.6] text-brand-secondary"
                  >
                    <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-primary" />
                    {bullet}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-8 inline-block text-[15px] text-brand-secondary underline-offset-4 transition-colors duration-150 hover:text-brand-primary hover:underline"
              >
                Book a call &rarr;
              </Link>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
