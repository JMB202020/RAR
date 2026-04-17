'use client'

import Link from 'next/link'
import Image from 'next/image'
import FadeUp from './FadeUp'
import { useLocale } from '@/lib/useLocale'
import { localePath } from '@/lib/locales'
import { HERO_IMAGE, IMAGE_FILTER } from '@/lib/images'

interface CTA {
  label: string
  path: string
  variant: 'primary' | 'secondary'
}

interface HeroProps {
  eyebrow: string
  heading: React.ReactNode
  body: string
  proofLine?: string
  pricingNote?: React.ReactNode
  ctas?: CTA[]
  fullHeight?: boolean
  withVisual?: boolean
}

export default function Hero({
  eyebrow,
  heading,
  body,
  proofLine,
  pricingNote,
  ctas,
  fullHeight,
  withVisual,
}: HeroProps) {
  const locale = useLocale()
  return (
    <section
      className={`flex items-center ${
        fullHeight ? 'min-h-screen pt-32 pb-16 md:pt-0 md:pb-0' : 'pt-40 pb-20'
      }`}
    >
      <div className="mx-auto w-full max-w-[1160px] px-6 lg:px-20">
        <div
          className={
            withVisual
              ? 'grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20'
              : ''
          }
        >
          <div>
            <FadeUp>
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-accent">
                {eyebrow}
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="mt-4 max-w-[640px] font-[family-name:var(--font-display)] text-[44px] leading-[1.05] text-brand-primary md:text-[64px] lg:text-[72px]">
                {heading}
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p className="mt-6 max-w-[480px] text-[17px] leading-[1.75] text-brand-secondary">
                {body}
              </p>
            </FadeUp>
            {proofLine && (
              <FadeUp delay={0.2}>
                <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                  {proofLine}
                </p>
              </FadeUp>
            )}
            {pricingNote && (
              <FadeUp delay={0.2}>
                <p className="mt-4 max-w-[480px] text-[14px] leading-[1.6] text-brand-tertiary">
                  {pricingNote}
                </p>
              </FadeUp>
            )}
            {ctas && ctas.length > 0 && (
              <FadeUp delay={0.24}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  {ctas.map((cta) =>
                    cta.variant === 'primary' ? (
                      <Link
                        key={cta.label}
                        href={localePath(locale, cta.path)}
                        className="inline-flex items-center gap-1.5 rounded-[6px] bg-brand-accent px-8 py-3.5 text-[15px] font-medium text-brand-accent-text transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                      >
                        {cta.label} <span aria-hidden>&rarr;</span>
                      </Link>
                    ) : (
                      <Link
                        key={cta.label}
                        href={localePath(locale, cta.path)}
                        className="inline-flex items-center gap-1.5 text-[15px] font-medium text-brand-primary underline-offset-4 transition-colors duration-150 hover:text-brand-accent hover:underline"
                      >
                        {cta.label} <span aria-hidden>&rarr;</span>
                      </Link>
                    ),
                  )}
                </div>
              </FadeUp>
            )}
          </div>

          {withVisual && (
            <FadeUp delay={0.18}>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[480px] overflow-hidden rounded-[16px] bg-brand-bg-secondary lg:max-w-none">
                <Image
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 540px, (min-width: 640px) 480px, 100vw"
                  className="object-cover"
                  style={{ filter: IMAGE_FILTER }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
              </div>
            </FadeUp>
          )}
        </div>
      </div>
    </section>
  )
}
