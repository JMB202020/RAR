'use client'

import FadeUp from './FadeUp'

export default function ApproachSection() {
  return (
    <section className="bg-brand-bg-dark py-24 md:py-[96px]">
      <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
        <FadeUp>
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-accent">
            Our approach
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="mt-4 max-w-[700px] font-[family-name:var(--font-display)] text-[32px] leading-[1.05] text-brand-inverse md:text-[40px]">
            Most gym marketing fails for the same three reasons.
          </h2>
        </FadeUp>
        <FadeUp delay={0.12}>
          <p className="mt-4 text-[17px] leading-[1.75] text-white/60">
            Here&apos;s what we do differently.
          </p>
        </FadeUp>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {BLOCKS.map((block, i) => (
            <FadeUp key={block.eyebrow} delay={0.16 + i * 0.08}>
              <div className="border-t border-white/10 pt-8">
                <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-accent">
                  {block.eyebrow}
                </p>
                <h3 className="mt-4 text-[20px] font-semibold leading-[1.25] text-brand-inverse">
                  {block.heading}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#D4D4D4]">
                  {block.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

const BLOCKS = [
  {
    eyebrow: '01 — The offer is wrong',
    heading: 'A "free trial" is not an offer.',
    body: 'Most gyms advertise variations of the same tired offer: free week, £1 for 7 days, buy one get one. Prospects see through it instantly. We build offers that feel worth acting on — limited founding-member rates, paid trials that convert, transformation guarantees with skin in the game.',
  },
  {
    eyebrow: '02 — The follow-up is too slow',
    heading: 'Leads contacted in under 5 minutes convert 9× more.',
    body: 'Most gyms respond to Meta leads hours or days later. By then the prospect has tried the gym next door. We build the systems — or run them for you — so every lead is contacted within minutes, every time, even at 9pm on a Sunday.',
  },
  {
    eyebrow: '03 — The creative is generic',
    heading: '"Join the best gym in [town]" isn\'t advertising. It\'s decoration.',
    body: 'Stock gym footage over generic headlines is invisible to the scroll. Our creative is built around your specific facility, your community, and your members\' actual transformations. It looks like you — not like a template.',
  },
]
