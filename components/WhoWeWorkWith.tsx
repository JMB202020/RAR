import Link from 'next/link'
import { TARGET_SEGMENTS } from '@/lib/constants'
import FadeUp from './FadeUp'

export default function WhoWeWorkWith() {
  return (
    <section className="bg-brand-bg-secondary py-24">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Left column */}
          <FadeUp>
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                Who we work with
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-[36px] leading-[1.2] text-brand-primary">
                Built for serious fitness businesses.
              </h2>
              <p className="mt-6 text-[16px] leading-[1.7] text-brand-secondary">
                We work exclusively with gyms and fitness studios. That means
                every campaign we build, every strategy we write, and every lead
                we generate is informed by years of experience in the fitness
                industry.
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-brand-secondary">
                We work with independent operators, boutique studios, CrossFit
                boxes, Hyrox facilities, franchise gyms, and everything in
                between. If you run a fitness business and need more members, we
                should talk.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-block text-[15px] text-brand-secondary underline-offset-4 transition-colors duration-150 hover:text-brand-primary hover:underline"
              >
                Book a discovery call &rarr;
              </Link>
            </div>
          </FadeUp>

          {/* Right column — segment pills */}
          <FadeUp delay={0.12}>
            <div className="flex flex-wrap gap-3 content-start">
              {TARGET_SEGMENTS.map((segment) => (
                <span
                  key={segment}
                  className="rounded-full border border-[var(--color-border-medium)] px-[18px] py-2 text-[14px] text-brand-secondary transition-all duration-150 hover:border-[var(--color-border-dark)] hover:text-brand-primary"
                >
                  {segment}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
