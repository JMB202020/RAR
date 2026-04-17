'use client'

import Link from 'next/link'
import Image from 'next/image'
import FadeUp from './FadeUp'
import { STATS } from '@/lib/constants'
import { useLocale } from '@/lib/useLocale'
import { localePath } from '@/lib/locales'

interface CTA {
  label: string
  /** Locale-relative path, e.g. '/services'. Locale prefix added automatically. */
  path: string
  variant: 'primary' | 'secondary'
}

interface HeroProps {
  eyebrow: string
  heading: React.ReactNode
  body: string
  /** Small muted line below body, e.g. pricing anchor on homepage. */
  pricingNote?: React.ReactNode
  ctas?: CTA[]
  fullHeight?: boolean
  /** Render the homepage variant: image right + 2x2 stats overlay (desktop). */
  withVisual?: boolean
}

const HERO_IMAGE = {
  // Unsplash: athlete training with kettlebell. Free for commercial use.
  // Photo by Anastase Maragos — https://unsplash.com/photos/9dzWZQWZMdE
  src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&auto=format&fit=crop',
  alt: 'A focused athlete mid-training session in a modern gym',
}

export default function Hero({
  eyebrow,
  heading,
  body,
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
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
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
                        className="inline-flex items-center gap-1.5 rounded-[6px] bg-brand-primary px-8 py-3.5 text-[15px] font-medium text-brand-inverse transition-opacity duration-150 hover:opacity-80"
                      >
                        {cta.label} <span aria-hidden>&rarr;</span>
                      </Link>
                    ) : (
                      <Link
                        key={cta.label}
                        href={localePath(locale, cta.path)}
                        className="inline-flex items-center gap-1.5 rounded-[6px] border border-brand-primary px-8 py-3.5 text-[15px] font-medium text-brand-primary transition-colors duration-150 hover:bg-brand-primary hover:text-brand-inverse"
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
                />
                {/* Floating stat cards */}
                <div className="absolute right-4 bottom-4 left-4 grid grid-cols-2 gap-2 sm:right-6 sm:bottom-6 sm:left-6 sm:gap-3">
                  {STATS.slice(0, 4).map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-[10px] border border-white/15 bg-black/55 px-3 py-3 backdrop-blur-md sm:px-4 sm:py-3.5"
                    >
                      <p className="font-[family-name:var(--font-mono)] text-[22px] font-semibold leading-none text-white tabular sm:text-[26px]">
                        {stat.value}
                      </p>
                      <p className="mt-1.5 text-[11px] leading-[1.35] text-white/70 sm:text-[12px]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          )}
        </div>
      </div>
    </section>
  )
}
