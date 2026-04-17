'use client'

import Link from 'next/link'
import Image from 'next/image'
import { TARGET_SEGMENTS } from '@/lib/constants'
import { SEGMENT_IMAGES, IMAGE_FILTER } from '@/lib/images'
import FadeUp from './FadeUp'
import { useLocale } from '@/lib/useLocale'
import { localePath } from '@/lib/locales'

const TILES = [
  { label: TARGET_SEGMENTS[0], ...SEGMENT_IMAGES.independentGyms },
  { label: TARGET_SEGMENTS[1], ...SEGMENT_IMAGES.boutiqueStudios },
  { label: TARGET_SEGMENTS[2], ...SEGMENT_IMAGES.crossfitBoxes },
  { label: TARGET_SEGMENTS[3], ...SEGMENT_IMAGES.hyroxFacilities },
  { label: TARGET_SEGMENTS[4], ...SEGMENT_IMAGES.boxingGyms },
  { label: TARGET_SEGMENTS[5], ...SEGMENT_IMAGES.pilatesYoga },
]

export default function WhoWeWorkWith() {
  const locale = useLocale()
  return (
    <section className="bg-white py-24 md:py-[96px]">
      <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
        <FadeUp>
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-accent">
            Who we work with
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="mt-4 max-w-[480px] font-[family-name:var(--font-display)] text-[32px] leading-[1.05] text-brand-primary md:text-[40px]">
            Built for every type of fitness business.
          </h2>
        </FadeUp>

        {/* 6-tile image grid */}
        <FadeUp delay={0.16}>
          <ul className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {TILES.map((tile) => (
              <li
                key={tile.label}
                className="group relative aspect-[4/5] overflow-hidden rounded-[10px] bg-brand-bg-secondary transition-transform duration-200 hover:-translate-y-1"
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 768px) 340px, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ filter: IMAGE_FILTER }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute right-3 bottom-3 left-3 text-[13px] font-medium text-white md:text-[14px]">
                  {tile.label}
                </p>
              </li>
            ))}
          </ul>
        </FadeUp>

        <FadeUp delay={0.24}>
          <div className="mt-10 text-center">
            <Link
              href={localePath(locale, '/who-we-work-with')}
              className="inline-flex items-center gap-1.5 text-[15px] font-medium text-brand-primary underline-offset-4 transition-colors duration-150 hover:text-brand-accent hover:underline"
            >
              See how we work with each <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
