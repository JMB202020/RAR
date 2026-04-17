'use client'

import Link from 'next/link'
import Image from 'next/image'
import { TARGET_SEGMENTS } from '@/lib/constants'
import FadeUp from './FadeUp'
import { useLocale } from '@/lib/useLocale'
import { localePath } from '@/lib/locales'

// Unsplash imagery — free for commercial use. Hand-picked so each one shows
// a clearly different facility type. Captions are decorative; the alt text is
// what matters for accessibility.
const SEGMENT_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=900&q=80&auto=format&fit=crop',
    alt: 'Independent gym with rack of free weights and athletes training',
    label: 'Independent gyms',
  },
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80&auto=format&fit=crop',
    alt: 'Group of athletes inside a CrossFit box during a workout',
    label: 'CrossFit boxes',
  },
  {
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80&auto=format&fit=crop',
    alt: 'Boutique studio with curated equipment and warm lighting',
    label: 'Boutique studios',
  },
  {
    src: 'https://images.unsplash.com/photo-1554344728-77cf90d9ed26?w=900&q=80&auto=format&fit=crop',
    alt: 'Hyrox-style functional fitness training facility',
    label: 'Hyrox facilities',
  },
]

export default function WhoWeWorkWith() {
  const locale = useLocale()
  return (
    <section className="bg-white py-20 md:py-[120px]">
      <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          {/* Left column */}
          <FadeUp>
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                Who we work with
              </p>
              <h2 className="mt-4 max-w-[420px] font-[family-name:var(--font-display)] text-[32px] leading-[1.1] text-brand-primary md:text-[40px]">
                Built for every type of fitness business.
              </h2>
              <p className="mt-6 max-w-[440px] text-[17px] leading-[1.75] text-brand-secondary">
                We work exclusively with gyms and fitness studios — from
                independent operators to franchise locations, boutique studios
                to CrossFit boxes.
              </p>
              <Link
                href={localePath(locale, '/contact')}
                className="mt-10 inline-flex items-center gap-1.5 rounded-[6px] border border-brand-primary px-7 py-3 text-[15px] font-medium text-brand-primary transition-colors duration-150 hover:bg-brand-primary hover:text-brand-inverse"
              >
                Enquire <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </FadeUp>

          {/* Right column — pill grid */}
          <FadeUp delay={0.12}>
            <ul className="grid grid-cols-2 gap-3">
              {TARGET_SEGMENTS.map((segment) => (
                <li key={segment}>
                  <span className="block w-full rounded-full border border-[rgba(0,0,0,0.12)] px-5 py-2.5 text-center text-[14px] text-brand-primary transition-colors duration-150 hover:bg-brand-primary hover:text-brand-inverse">
                    {segment}
                  </span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>

        {/* 4-image grid below */}
        <FadeUp delay={0.2}>
          <ul className="mt-16 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4 md:gap-4">
            {SEGMENT_IMAGES.map((img) => (
              <li
                key={img.label}
                className="group relative aspect-[4/5] overflow-hidden rounded-[10px] bg-brand-bg-secondary"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 250px, 50vw"
                  className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute right-3 bottom-3 left-3 text-[12px] font-medium text-white md:text-[13px]">
                  {img.label}
                </p>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  )
}
