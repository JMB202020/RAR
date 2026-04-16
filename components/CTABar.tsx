'use client'

import Link from 'next/link'
import FadeUp from './FadeUp'
import { useLocale } from '@/lib/useLocale'
import { localePath } from '@/lib/locales'

export default function CTABar() {
  const locale = useLocale()
  return (
    <section className="bg-brand-bg-dark py-20 md:py-[120px]">
      <div className="mx-auto max-w-[1160px] px-6 text-center lg:px-20">
        <FadeUp>
          <h2 className="font-[family-name:var(--font-display)] text-[32px] leading-[1.1] text-brand-inverse md:text-[40px]">
            Ready to fill your gym?
          </h2>
        </FadeUp>
        <FadeUp delay={0.08}>
          <p className="mx-auto mt-5 max-w-[480px] text-[17px] leading-[1.75] text-white/65">
            Send us a few details about your gym. We&apos;ll be in touch
            within one business day to arrange a call.
          </p>
        </FadeUp>
        <FadeUp delay={0.16}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Link
              href={localePath(locale, '/contact')}
              className="inline-flex items-center gap-1.5 rounded-[6px] border border-brand-inverse px-8 py-3.5 text-[15px] font-medium text-brand-inverse transition-colors duration-150 hover:bg-brand-inverse hover:text-brand-primary"
            >
              Enquire <span aria-hidden>&rarr;</span>
            </Link>
            <p className="mt-1 text-[13px] text-white/45">
              We respond to every enquiry within one business day.
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
