import Link from 'next/link'
import FadeUp from './FadeUp'

interface CTA {
  label: string
  href: string
  variant: 'primary' | 'text'
}

interface HeroProps {
  eyebrow: string
  heading: string
  body: string
  ctas?: CTA[]
  fullHeight?: boolean
}

export default function Hero({ eyebrow, heading, body, ctas, fullHeight }: HeroProps) {
  return (
    <section
      className={`flex items-center ${fullHeight ? 'min-h-screen' : 'pt-40 pb-20'}`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-16">
        <FadeUp>
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
            {eyebrow}
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h1
            className="mt-6 max-w-[700px] font-[family-name:var(--font-display)] text-[44px] leading-[1.1] text-brand-primary md:text-[64px] md:leading-[1.05]"
          >
            {heading}
          </h1>
        </FadeUp>
        <FadeUp delay={0.16}>
          <p className="mt-6 max-w-[520px] text-[18px] leading-[1.7] text-brand-secondary">
            {body}
          </p>
        </FadeUp>
        {ctas && ctas.length > 0 && (
          <FadeUp delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              {ctas.map((cta) =>
                cta.variant === 'primary' ? (
                  <Link
                    key={cta.label}
                    href={cta.href}
                    className="inline-block rounded-[6px] bg-brand-primary px-8 py-3.5 text-[15px] font-medium text-brand-inverse transition-opacity duration-150 hover:opacity-85"
                  >
                    {cta.label}
                  </Link>
                ) : (
                  <Link
                    key={cta.label}
                    href={cta.href}
                    className="text-[15px] text-brand-secondary underline-offset-4 transition-colors duration-150 hover:text-brand-primary hover:underline"
                  >
                    {cta.label} &rarr;
                  </Link>
                )
              )}
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  )
}
