import Link from 'next/link'
import FadeUp from './FadeUp'

// TODO: Replace with real case studies (lib/case-studies.ts) once first
// cohort results are in. Until then we tell the truth: nothing to show yet.

export default function ResultsGrid() {
  return (
    <section className="bg-white py-20 md:py-[120px]">
      <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
        <FadeUp>
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
            Results
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[32px] leading-[1.1] text-brand-primary md:text-[40px]">
            Case studies coming soon.
          </h2>
        </FadeUp>

        <FadeUp delay={0.16}>
          <div className="mx-auto mt-12 max-w-[640px] rounded-[12px] border border-[rgba(0,0,0,0.12)] bg-white p-10 text-center md:p-12">
            <p className="text-[17px] leading-[1.75] text-brand-secondary">
              We&apos;re currently onboarding our first clients. Case studies
              will be published here as results come in — typically within 60
              days of launch.
            </p>
            <p className="mt-5 text-[17px] leading-[1.75] text-brand-secondary">
              In the meantime, book a call to hear directly about our approach
              and what results you can expect.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-1.5 rounded-[6px] bg-brand-primary px-8 py-3.5 text-[15px] font-medium text-brand-inverse transition-opacity duration-150 hover:opacity-80"
            >
              Book a discovery call <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
