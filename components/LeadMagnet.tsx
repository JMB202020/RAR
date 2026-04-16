'use client'

import { useState } from 'react'
import FadeUp from './FadeUp'

export default function LeadMagnet() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect form to actual email capture + PDF delivery.
    console.log('Lead magnet email:', email)
    setSubmitted(true)
  }

  return (
    <section className="border-y border-[var(--color-border-light)] bg-brand-bg-secondary py-20 md:py-24">
      <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
        <div className="mx-auto max-w-[640px] text-center">
          <FadeUp>
            <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-accent">
              Free resource
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[32px] leading-[1.05] text-brand-primary md:text-[40px]">
              The UK gym marketing benchmark report 2026.
            </h2>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="mt-4 text-[17px] leading-[1.75] text-brand-secondary">
              Cost per lead, conversion rates, ad spend ratios, and member
              acquisition cost — benchmarks from UK gyms and studios. Free
              download.
            </p>
          </FadeUp>

          <FadeUp delay={0.16}>
            {submitted ? (
              <p className="mt-8 text-[15px] font-medium text-brand-primary">
                Thanks — check your inbox.
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto mt-8 flex max-w-[440px] gap-3"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="min-w-0 flex-1 rounded-[6px] border border-[rgba(0,0,0,0.12)] bg-white px-4 py-3 text-[15px] text-brand-primary placeholder:text-brand-tertiary outline-none transition-colors duration-150 focus:border-brand-accent"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-[6px] bg-brand-accent px-6 py-3 text-[14px] font-medium text-brand-accent-text transition-opacity duration-150 hover:opacity-85"
                >
                  Send me the report →
                </button>
              </form>
            )}
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-4 text-[13px] text-brand-tertiary">
              No spam. One email with the report, nothing else.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
