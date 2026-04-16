import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import CTABar from '@/components/CTABar'
import FadeUp from '@/components/FadeUp'
import { isLocale, localePath } from '@/lib/locales'
import { RESULTS_HERO } from '@/lib/images'

export const metadata: Metadata = {
  title: 'Results — Rep & Reach',
  description:
    "We've never needed a case study. Every Rep & Reach client comes by referral from someone who already trusts us.",
  openGraph: {
    title: 'Results — Rep & Reach',
    description:
      "We've never needed a case study. Every Rep & Reach client comes by referral from someone who already trusts us.",
    type: 'website',
    url: 'https://repandreach.com/results',
  },
}

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function ResultsPage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <>
      {/* Page header with full-bleed background image */}
      <section className="relative flex min-h-[460px] items-end overflow-hidden pt-40 pb-16 md:min-h-[540px] md:pb-20">
        <Image
          src={RESULTS_HERO.src}
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
          priority
          aria-hidden
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.55) 100%)',
          }}
        />
        <div className="mx-auto w-full max-w-[1160px] px-6 lg:px-20">
          <FadeUp>
            <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-white/70">
              Results
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="mt-4 max-w-[880px] font-[family-name:var(--font-display)] text-[44px] leading-[1.05] text-white md:text-[76px]">
              We&apos;ve never needed a case study.
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="mt-6 max-w-[520px] text-[17px] leading-[1.75] text-white/80">
              Every Rep &amp; Reach client comes by referral from someone
              who already trusts us.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-20 md:py-[120px]">
        <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            <FadeUp className="md:col-span-7">
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                Why we don&apos;t publish them
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-[32px] leading-[1.1] text-brand-primary md:text-[40px]">
                The best marketing is a conversation, not a brochure.
              </h2>
              <p className="mt-6 max-w-[560px] text-[17px] leading-[1.75] text-brand-secondary">
                Every gym is different. Different market, different offer,
                different starting point. A case study from someone
                else&apos;s business tells you very little about what
                we&apos;d do for yours.
              </p>
              <p className="mt-5 max-w-[560px] text-[17px] leading-[1.75] text-brand-secondary">
                So we skip the anonymised bar charts and the stock-photo
                testimonials. When you enquire we&apos;ll tell you, in
                confidence, exactly what we&apos;ve done for gyms like
                yours — names, numbers, and what we&apos;d recommend for
                your situation.
              </p>
            </FadeUp>

            <FadeUp delay={0.12} className="md:col-span-5">
              <div className="rounded-[12px] border border-[rgba(0,0,0,0.12)] bg-brand-bg-secondary p-8 md:p-10">
                <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                  How we win clients
                </p>
                <ul className="mt-6 flex flex-col gap-5 text-[15px] leading-[1.65] text-brand-secondary">
                  <li>
                    <span className="block text-brand-primary">
                      1. Word of mouth
                    </span>
                    An existing client or industry contact puts us in
                    touch with you directly.
                  </li>
                  <li>
                    <span className="block text-brand-primary">
                      2. A call, not a pitch
                    </span>
                    We spend 20 minutes on your gym specifically — what
                    you want, where you are, what we&apos;d do first.
                  </li>
                  <li>
                    <span className="block text-brand-primary">
                      3. Proposal in writing
                    </span>
                    If it&apos;s a fit, you get a clear plan and price
                    by the end of the week.
                  </li>
                </ul>

                <Link
                  href={localePath(locale, '/contact')}
                  className="mt-10 inline-flex items-center gap-1.5 rounded-[6px] bg-brand-primary px-7 py-3.5 text-[15px] font-medium text-brand-inverse transition-opacity duration-150 hover:opacity-80"
                >
                  Send an enquiry <span aria-hidden>&rarr;</span>
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <CTABar />
    </>
  )
}
