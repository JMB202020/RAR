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
  index?: string
}

export default function Hero({
  eyebrow,
  heading,
  body,
  ctas,
  fullHeight,
  index = '01',
}: HeroProps) {
  return (
    <section
      className={`relative flex items-center ${
        fullHeight ? 'min-h-[calc(100vh-120px)]' : 'pt-24 pb-20 md:pt-32'
      }`}
    >
      {/* Top-right index marker — purely typographic detail */}
      <div className="pointer-events-none absolute right-6 top-10 hidden font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-brand-tertiary md:block lg:right-12">
        <span className="text-brand-accent">/</span> Index {index}{' '}
        <span className="text-brand-tertiary/40">— 04</span>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-10 md:grid-cols-12">
          <FadeUp className="md:col-span-12 md:col-start-1 lg:col-start-2">
            <p className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.18em] text-brand-secondary">
              <span className="block h-px w-8 bg-brand-accent" />
              {eyebrow}
            </p>
          </FadeUp>

          <div className="md:col-span-12 lg:col-span-11 lg:col-start-2">
            <FadeUp delay={0.08}>
              <h1 className="mt-8 max-w-[16ch] font-[family-name:var(--font-display)] text-[56px] leading-[0.95] text-brand-primary md:text-[96px] lg:text-[128px]">
                <SplitHeading text={heading} />
              </h1>
            </FadeUp>
          </div>

          <FadeUp
            delay={0.2}
            className="md:col-span-12 md:col-start-1 lg:col-span-5 lg:col-start-8"
          >
            <p className="mt-10 max-w-[440px] text-[17px] leading-[1.65] text-brand-secondary lg:mt-0">
              {body}
            </p>
            {ctas && ctas.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-7">
                {ctas.map((cta) =>
                  cta.variant === 'primary' ? (
                    <Link
                      key={cta.label}
                      href={cta.href}
                      className="group inline-flex items-center gap-2 bg-brand-accent px-7 py-3.5 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.16em] text-brand-accent-text transition-all duration-200 hover:bg-[#E5FF40]"
                    >
                      {cta.label}
                      <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                        &#x2198;
                      </span>
                    </Link>
                  ) : (
                    <Link
                      key={cta.label}
                      href={cta.href}
                      className="group font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-brand-secondary transition-colors duration-150 hover:text-brand-primary"
                    >
                      <span className="link-underline">{cta.label}</span>
                      <span className="ml-2 text-brand-accent transition-transform duration-200 group-hover:translate-x-0.5">
                        &#x2198;
                      </span>
                    </Link>
                  )
                )}
              </div>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/**
 * SplitHeading — turns a heading like "We fill gyms. That's all we do."
 * into a multi-line editorial layout where the second sentence renders italic.
 * Falls back to a single block if there's no period.
 */
function SplitHeading({ text }: { text: string }) {
  const idx = text.indexOf('.')
  if (idx === -1) {
    return <>{text}</>
  }
  const first = text.slice(0, idx + 1).trim()
  const rest = text.slice(idx + 1).trim()
  return (
    <>
      {first}
      {rest && (
        <>
          <br />
          <em className="italic text-brand-primary/95">{rest}</em>
        </>
      )}
    </>
  )
}
