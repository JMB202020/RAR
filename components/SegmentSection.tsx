import Link from 'next/link'
import { Check } from 'lucide-react'
import FadeUp from './FadeUp'

interface SegmentSectionProps {
  eyebrow: string
  heading: string
  body: string[]
  bullets: string[]
  alt?: boolean
}

export default function SegmentSection({
  eyebrow,
  heading,
  body,
  bullets,
  alt,
}: SegmentSectionProps) {
  return (
    <section
      className={`py-20 md:py-[120px] ${
        alt ? 'bg-brand-bg-secondary' : 'bg-white'
      }`}
    >
      <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <FadeUp>
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                {eyebrow}
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2 className="mt-4 max-w-[480px] font-[family-name:var(--font-display)] text-[32px] leading-[1.1] text-brand-primary md:text-[40px]">
                {heading}
              </h2>
            </FadeUp>
            {body.map((paragraph, i) => (
              <FadeUp key={i} delay={0.16 + i * 0.08}>
                <p className="mt-6 max-w-[480px] text-[17px] leading-[1.75] text-brand-secondary">
                  {paragraph}
                </p>
              </FadeUp>
            ))}
            <FadeUp delay={0.32}>
              <Link
                href="/contact"
                className="mt-10 inline-flex items-center gap-1.5 rounded-[6px] border border-brand-primary px-7 py-3 text-[15px] font-medium text-brand-primary transition-colors duration-150 hover:bg-brand-primary hover:text-brand-inverse"
              >
                Book a call <span aria-hidden>&rarr;</span>
              </Link>
            </FadeUp>
          </div>
          <div>
            <FadeUp delay={0.2}>
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                What we help with
              </p>
              <ul className="mt-6 flex flex-col gap-4">
                {bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-[15px] leading-[1.6] text-brand-secondary"
                  >
                    <Check
                      size={18}
                      className="mt-[3px] shrink-0 text-brand-primary"
                      aria-hidden
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
