'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQ_ITEMS } from '@/lib/constants'
import FadeUp from './FadeUp'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-brand-bg-secondary py-24 md:py-[96px]">
      <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
        <FadeUp>
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-accent">
            Common questions
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[32px] leading-[1.05] text-brand-primary md:text-[40px]">
            Things gym owners ask us.
          </h2>
        </FadeUp>

        <div className="mt-12 divide-y divide-[var(--color-border-light)]">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <FadeUp key={i} delay={Math.min(0.16 + i * 0.04, 0.4)}>
                <div className="py-6">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-start justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[17px] font-medium leading-[1.4] text-brand-primary">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`mt-1 shrink-0 text-brand-tertiary transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-200 ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-4 text-[15px] leading-[1.7] text-brand-secondary">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
