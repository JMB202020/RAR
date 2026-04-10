import { STATS } from '@/lib/constants'
import FadeUp from './FadeUp'

// TODO: Replace with real figures from first client results
export default function StatsBar() {
  return (
    <section className="border-y border-[var(--color-border-light)] bg-white">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.08}>
              <div
                className={`flex flex-col items-center py-12 text-center ${
                  i < STATS.length - 1
                    ? 'md:border-r md:border-[var(--color-border-light)]'
                    : ''
                } ${i < 2 ? 'border-b border-[var(--color-border-light)] md:border-b-0' : ''}`}
              >
                <span className="font-[family-name:var(--font-mono)] text-[48px] font-medium leading-none text-brand-primary">
                  {stat.value}
                </span>
                <span className="mt-3 text-[14px] leading-[1.5] text-brand-secondary">
                  {stat.label}
                </span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
