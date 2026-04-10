import Link from 'next/link'
import FadeUp from './FadeUp'

export default function CTABar() {
  return (
    <section className="bg-brand-bg-dark">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 px-6 py-20 md:flex-row md:items-center lg:px-16">
        <FadeUp>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-[36px] leading-[1.2] text-brand-inverse">
              Ready to fill your gym?
            </h2>
            <p className="mt-4 max-w-[420px] text-[16px] leading-[1.7] text-brand-inverse/60">
              Book a free 20-minute discovery call. No commitment. No hard sell.
              Just an honest conversation.
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={0.08}>
          <Link
            href="/contact"
            className="inline-block rounded-[6px] border border-brand-inverse px-8 py-3.5 text-[15px] font-medium text-brand-inverse transition-all duration-150 hover:bg-brand-inverse hover:text-brand-primary"
          >
            Book a call &rarr;
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}
