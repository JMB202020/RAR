'use client'

import Link from 'next/link'
import FadeUp from './FadeUp'
import { useLocale } from '@/lib/useLocale'
import { localePath } from '@/lib/locales'

export default function ResultsGrid() {
  const locale = useLocale()
  return (
    <section className="bg-white py-20 md:py-[120px]">
      <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
        <FadeUp>
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
            Results
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="mt-4 max-w-[780px] font-[family-name:var(--font-display)] text-[32px] leading-[1.05] text-brand-primary md:text-[48px]">
            We&apos;ve never needed a case study.
          </h2>
        </FadeUp>

        <FadeUp delay={0.16}>
          <div className="mx-auto mt-12 max-w-[680px] rounded-[12px] border border-[rgba(0,0,0,0.12)] bg-white p-10 text-center md:p-12">
            <p className="text-[17px] leading-[1.75] text-brand-secondary">
              Every Rep &amp; Reach client comes by referral from someone
              who already trusts us.
            </p>
            <p className="mt-5 text-[17px] leading-[1.75] text-brand-secondary">
              If you want to know what we can do for your gym, we&apos;ll
              tell you directly — in confidence, over a call.
            </p>
            <Link
              href={localePath(locale, '/contact')}
              className="mt-10 inline-flex items-center gap-1.5 rounded-[6px] bg-brand-primary px-8 py-3.5 text-[15px] font-medium text-brand-inverse transition-opacity duration-150 hover:opacity-80"
            >
              Send an enquiry <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
