import Link from 'next/link'
import FadeUp from './FadeUp'

export default function CTABar() {
  return (
    <section className="relative bg-brand-bg-dark">
      {/* Top accent rule */}
      <div className="absolute left-0 right-0 top-0 h-px bg-brand-accent/40" />

      <div className="mx-auto max-w-[1440px] px-6 py-28 md:py-36 lg:px-12">
        <div className="grid gap-12 md:grid-cols-12">
          <FadeUp className="md:col-span-12 lg:col-span-7">
            <p className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.18em] text-brand-secondary">
              <span className="block h-px w-8 bg-brand-accent" />
              Next step <span className="text-brand-tertiary">/ 06</span>
            </p>
            <h2 className="mt-6 max-w-[14ch] font-[family-name:var(--font-display)] text-[56px] leading-[0.95] text-brand-primary md:text-[88px]">
              Ready to fill{' '}
              <em className="italic text-brand-accent">your gym?</em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.16} className="md:col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-[16px] leading-[1.7] text-brand-secondary lg:mt-32">
              Book a free 20-minute discovery call. No commitment. No hard
              sell. Just an honest conversation about whether we&apos;re a fit.
            </p>
            <div className="mt-8 flex flex-col items-start gap-5">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-brand-accent px-7 py-3.5 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.16em] text-brand-accent-text transition-all duration-200 hover:bg-[#E5FF40]"
              >
                Book a call
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                  &#x2198;
                </span>
              </Link>
              <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-brand-tertiary">
                <span className="live-dot mr-2" /> Replies within 1 business day
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
