import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Check } from 'lucide-react'
import Hero from '@/components/Hero'
import CTABar from '@/components/CTABar'
import FadeUp from '@/components/FadeUp'
import { isLocale, localePath } from '@/lib/locales'

export const metadata: Metadata = {
  title: 'About — Rep & Reach',
  description:
    'Built by fitness marketers, for fitness operators. We only work with gyms — every pound goes into campaigns built specifically for the industry.',
}

const VALUES = [
  {
    title: 'Fitness only. Always.',
    body: 'We don\u2019t take clients outside of fitness. It\u2019s not a positioning statement \u2014 it\u2019s how we keep our edge.',
  },
  {
    title: 'Human follow-up beats automation alone.',
    body: 'Automations save time. But leads convert when a real person picks up the phone fast. We believe in both.',
  },
  {
    title: 'If we can\u2019t help, we\u2019ll tell you.',
    body: 'Not every gym is a fit. If we don\u2019t think we can improve on what you\u2019re already doing, we\u2019ll say so.',
  },
]

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <>
      <Hero
        eyebrow="About"
        heading={<>Built by fitness marketers,{'\n'}for fitness operators.</>}
        body="Most gym owners have been burned by a generalist marketing agency at least once. Templated campaigns, account managers who\u2019ve never been inside a gym, reporting decks full of vanity metrics. Rep & Reach exists to do it properly."
      />

      <section className="py-24 md:py-[96px]">
        <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
          <div className="grid gap-16 md:grid-cols-2 md:gap-20">
            <div>
              <FadeUp>
                <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-accent">
                  Why we exist
                </p>
              </FadeUp>
              <FadeUp delay={0.08}>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-[32px] leading-[1.05] text-brand-primary md:text-[40px]">
                  We only work with gyms.
                </h2>
              </FadeUp>
              <FadeUp delay={0.16}>
                <p className="mt-6 text-[17px] leading-[1.75] text-brand-secondary">
                  Every pound a client spends with us goes into campaigns built
                  specifically for fitness operators, executed by people who
                  understand the industry from the inside.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="mt-5 text-[17px] leading-[1.75] text-brand-secondary">
                  We know the offers that convert, the creative that stops the
                  scroll, and the follow-up cadence that turns an enquiry into
                  a member. Because it&apos;s all we do.
                </p>
              </FadeUp>
            </div>

            {/* Founder placeholder */}
            <FadeUp delay={0.12}>
              <div className="rounded-[12px] border border-[rgba(0,0,0,0.12)] bg-brand-bg-secondary p-8 md:p-10">
                <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-accent">
                  The team
                </p>
                <div className="mt-6 flex items-center gap-5">
                  {/* TODO: Phase B — Replace with real headshot */}
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-brand-bg-dark text-[24px] font-bold text-brand-inverse">
                    ?
                  </div>
                  <div>
                    <p className="text-[17px] font-semibold text-brand-primary">
                      Founder
                    </p>
                    <p className="mt-1 text-[14px] text-brand-secondary">
                      {/* TODO: Fill in founder name and bio */}
                      Bio coming soon.
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-bg-secondary py-24 md:py-[96px]">
        <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
          <FadeUp>
            <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-accent">
              How we work
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[32px] leading-[1.05] text-brand-primary md:text-[40px]">
              Three things we believe.
            </h2>
          </FadeUp>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {VALUES.map((v, i) => (
              <FadeUp key={v.title} delay={0.16 + i * 0.08}>
                <div className="border-t border-[var(--color-border-light)] pt-8">
                  <h3 className="text-[17px] font-semibold text-brand-primary">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.7] text-brand-secondary">
                    {v.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <CTABar />
    </>
  )
}
