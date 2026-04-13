import { STATS } from '@/lib/constants'
import FadeUp from './FadeUp'

// TODO: Replace with real figures from first client results
export default function StatsBar() {
  return (
    <section className="relative border-y border-[var(--color-border-light)] bg-brand-bg">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.08}>
              <div
                className={`group relative flex flex-col items-start py-14 ${
                  i < STATS.length - 1
                    ? 'md:border-r md:border-[var(--color-border-light)]'
                    : ''
                } ${
                  i < 2
                    ? 'border-b border-[var(--color-border-light)] md:border-b-0'
                    : ''
                } ${i % 2 === 1 ? 'pl-6' : ''} md:pl-8`}
              >
                {/* Tiny corner index */}
                <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-brand-tertiary tabular">
                  / {String(i + 1).padStart(2, '0')}
                </span>

                <span className="mt-6 font-[family-name:var(--font-display)] text-[64px] leading-[0.95] text-brand-accent md:text-[80px] tabular">
                  {stat.value}
                </span>

                <span className="mt-4 max-w-[180px] text-[13px] leading-[1.55] text-brand-secondary">
                  {stat.label}
                </span>

                {/* Hover hairline accent */}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-brand-accent transition-all duration-500 group-hover:w-full" />
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
