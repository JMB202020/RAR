import Link from 'next/link'
import { TARGET_SEGMENTS } from '@/lib/constants'
import FadeUp from './FadeUp'

export default function WhoWeWorkWith() {
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
                href="/contact"
                className="mt-10 inline-flex items-center gap-1.5 rounded-[6px] border border-brand-primary px-7 py-3 text-[15px] font-medium text-brand-primary transition-colors duration-150 hover:bg-brand-primary hover:text-brand-inverse"
              >
                Book a discovery call <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </FadeUp>

          {/* Right column — pill grid (2 cols) */}
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
      </div>
    </section>
  )
}
