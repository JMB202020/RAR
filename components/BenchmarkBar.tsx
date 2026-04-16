'use client'

import { BENCHMARK_STATS } from '@/lib/constants'
import FadeUp from './FadeUp'

// TODO: Replace with Rep & Reach verified results once first case study is live.

export default function BenchmarkBar() {
  return (
    <section className="border-y border-[var(--color-border-light)] bg-white">
      <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
        <FadeUp>
          <p className="pt-10 text-center text-[12px] font-medium uppercase tracking-[0.1em] text-brand-accent">
            UK fitness marketing benchmarks
          </p>
        </FadeUp>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {BENCHMARK_STATS.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.06}>
              <div
                className={`flex flex-col items-center py-10 text-center ${
                  i < BENCHMARK_STATS.length - 1
                    ? 'md:border-r md:border-[var(--color-border-light)]'
                    : ''
                } ${
                  i < 2
                    ? 'border-b border-[var(--color-border-light)] md:border-b-0'
                    : ''
                }`}
              >
                <span className="font-[family-name:var(--font-mono)] text-[36px] font-semibold leading-none text-brand-primary tabular md:text-[42px]">
                  {stat.value}
                </span>
                <span className="mt-3 max-w-[180px] text-[13px] leading-[1.5] text-brand-secondary">
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
