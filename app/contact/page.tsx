import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import ContactForm from '@/components/ContactForm'
import FadeUp from '@/components/FadeUp'
import { TARGET_SEGMENTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Book a Discovery Call — Rep & Reach',
  description:
    "Book a free 20-minute discovery call with Rep & Reach. No commitment. No hard sell. Just an honest conversation about your gym's growth.",
  openGraph: {
    title: 'Book a Discovery Call — Rep & Reach',
    description:
      "Book a free 20-minute discovery call with Rep & Reach. No commitment. No hard sell. Just an honest conversation about your gym's growth.",
    type: 'website',
    url: 'https://repandreach.com/contact',
  },
}

const EXPECTATIONS = [
  'A 20-minute call, not a sales pitch',
  'An honest view of whether we can help',
  'No obligation to proceed',
  'Response within one business day',
]

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Get in touch"
        heading="Let's talk."
        body="Book a free 20-minute discovery call. We'll learn about your gym, understand your goals, and tell you honestly whether we can help."
        index="04"
      />

      <section className="pb-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid gap-16 md:grid-cols-12">
            {/* Left — Form */}
            <FadeUp className="md:col-span-12 lg:col-span-7">
              <ContactForm />
            </FadeUp>

            {/* Right — Trust signals */}
            <div className="flex flex-col gap-12 md:col-span-12 lg:col-span-4 lg:col-start-9">
              <FadeUp delay={0.08}>
                <div className="border border-[var(--color-border-light)] bg-brand-bg-secondary p-8">
                  <p className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-brand-tertiary">
                    <span className="block h-px w-6 bg-brand-accent" />
                    What to expect
                  </p>
                  <ul className="mt-6 flex flex-col gap-3.5">
                    {EXPECTATIONS.map((item, i) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-3 text-[15px] leading-[1.55] text-brand-secondary"
                      >
                        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-brand-accent tabular">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>

              <FadeUp delay={0.16}>
                <div>
                  <p className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-brand-tertiary">
                    <span className="block h-px w-6 bg-brand-accent" />
                    Who we work with
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {TARGET_SEGMENTS.slice(0, 5).map((segment) => (
                      <span
                        key={segment}
                        className="border border-[var(--color-border-medium)] px-3 py-1.5 text-[13px] text-brand-secondary"
                      >
                        {segment}
                      </span>
                    ))}
                    <span className="border border-dashed border-[var(--color-border-medium)] px-3 py-1.5 text-[13px] text-brand-tertiary">
                      and more
                    </span>
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.24}>
                <div>
                  <p className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-brand-tertiary">
                    <span className="block h-px w-6 bg-brand-accent" />
                    Based in
                  </p>
                  <p className="mt-4 text-[15px] leading-[1.7] text-brand-secondary">
                    Our team operates globally, with clients across the UK, US,
                    Australia, Canada, and beyond.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
