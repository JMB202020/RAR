import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import Hero from '@/components/Hero'
import ContactForm from '@/components/ContactForm'
import FadeUp from '@/components/FadeUp'
import { TARGET_SEGMENTS } from '@/lib/constants'
import { CONTACT_IMAGE } from '@/lib/images'
import { isLocale } from '@/lib/locales'

export const metadata: Metadata = {
  title: 'Enquire — Rep & Reach',
  description:
    "Send Rep & Reach a few details about your gym. We'll be in touch within one business day to arrange a call.",
  openGraph: {
    title: 'Enquire — Rep & Reach',
    description:
      "Send Rep & Reach a few details about your gym. We'll be in touch within one business day to arrange a call.",
    type: 'website',
    url: 'https://repandreach.com/contact',
  },
}

const EXPECTATIONS = [
  'A reply within one business day',
  'An honest view of whether we can help',
  "A call once we've reviewed your details",
  'No obligation to proceed',
]

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return (
    <>
      <Hero
        eyebrow="Get in touch"
        heading="Let's talk."
        body="Send us a few details about your gym. We'll be in touch within one business day to arrange a call."
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
              <FadeUp delay={0.04}>
                <div className="relative h-[240px] w-full overflow-hidden rounded-[12px] bg-brand-bg-secondary md:h-[280px]">
                  <Image
                    src={CONTACT_IMAGE.src}
                    alt={CONTACT_IMAGE.alt}
                    fill
                    sizes="(min-width: 1024px) 540px, 100vw"
                    className="object-cover"
                  />
                </div>
              </FadeUp>

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

      {/* Calendar embed placeholder */}
      <section className="border-t border-[var(--color-border-light)] bg-brand-bg-secondary py-16 md:py-20">
        <div className="mx-auto max-w-[640px] px-6 text-center lg:px-20">
          <FadeUp>
            <h3 className="font-[family-name:var(--font-display)] text-[24px] leading-[1.1] text-brand-primary md:text-[28px]">
              Prefer to book directly?
            </h3>
            <p className="mt-3 text-[15px] leading-[1.65] text-brand-secondary">
              Find a time that works for you.
            </p>
            {/* TODO: Replace with actual calendar embed URL when Cal.com or Calendly account is set up. */}
            <div className="mt-8 flex h-[320px] items-center justify-center rounded-[12px] border border-dashed border-[var(--color-border-medium)] bg-white">
              <p className="text-[14px] text-brand-tertiary">
                Calendar embed — coming soon
              </p>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
