import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import CTABar from '@/components/CTABar'
import FadeUp from '@/components/FadeUp'
import { isLocale, localePath } from '@/lib/locales'

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

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function ResultsPage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <>
      {/* Page header with full-bleed background image */}
      <section className="relative flex min-h-[420px] items-end overflow-hidden pt-40 pb-16 md:min-h-[480px] md:pb-20">
        <Image
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1800&q=80&auto=format&fit=crop"
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
            <h1 className="mt-4 max-w-[700px] font-[family-name:var(--font-display)] text-[44px] leading-[1.05] text-white md:text-[64px]">
              Results that speak for themselves.
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="mt-6 max-w-[480px] text-[17px] leading-[1.75] text-white/80">
              Case studies from gyms and studios we&apos;ve worked with.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="py-20 md:py-[120px]">
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
                href={localePath(locale, '/contact')}
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
