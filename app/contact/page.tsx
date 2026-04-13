import type { Metadata } from 'next'
import { Check } from 'lucide-react'
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
      />

      <section className="pb-20 md:pb-[120px]">
        <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
          <div className="grid gap-16 md:grid-cols-2 md:gap-20">
            {/* Left — Form */}
            <FadeUp>
              <ContactForm />
            </FadeUp>

            {/* Right — Trust signals */}
            <div className="flex flex-col gap-12">
              <FadeUp delay={0.08}>
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                    What to expect
                  </p>
                  <ul className="mt-6 flex flex-col gap-4">
                    {EXPECTATIONS.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-[15px] leading-[1.6] text-brand-secondary"
                      >
                        <Check
                          size={18}
                          className="mt-[3px] shrink-0 text-brand-primary"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>

              <FadeUp delay={0.16}>
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                    Who we work with
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {TARGET_SEGMENTS.slice(0, 6).map((segment) => (
                      <li key={segment}>
                        <span className="inline-block rounded-full border border-[rgba(0,0,0,0.12)] px-4 py-2 text-[13px] text-brand-primary">
                          {segment}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>

              <FadeUp delay={0.24}>
                <div>
                  <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                    Based in
                  </p>
                  <p className="mt-4 text-[15px] leading-[1.65] text-brand-secondary">
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
