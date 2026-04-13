import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import CTABar from '@/components/CTABar'
import FadeUp from '@/components/FadeUp'

export const metadata: Metadata = {
  title: 'Results — Rep & Reach',
  description:
    "Case studies and results from gyms and fitness studios we've worked with.",
  openGraph: {
    title: 'Results — Rep & Reach',
    description:
      "Case studies and results from gyms and fitness studios we've worked with.",
    type: 'website',
    url: 'https://repandreach.com/results',
  },
}

export default function ResultsPage() {
  return (
    <>
      <Hero
        eyebrow="Results"
        heading="Results that speak for themselves."
        body="Case studies from gyms and studios we've worked with."
      />

      <section className="pb-20 md:pb-[120px]">
        <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
          <FadeUp>
            <div className="mx-auto max-w-[640px] rounded-[12px] border border-[rgba(0,0,0,0.12)] bg-white p-10 text-center md:p-12">
              <p className="text-[17px] leading-[1.75] text-brand-secondary">
                We&apos;re currently onboarding our first clients. Case studies
                will be published here as results come in — typically within 60
                days of launch.
              </p>
              <p className="mt-5 text-[17px] leading-[1.75] text-brand-secondary">
                In the meantime, book a call to hear directly about our
                approach and what results you can expect.
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

      <CTABar />
    </>
  )
}
