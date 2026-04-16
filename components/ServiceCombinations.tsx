'use client'

import Link from 'next/link'
import FadeUp from './FadeUp'
import { useLocale } from '@/lib/useLocale'
import { localePath } from '@/lib/locales'

const COMBOS = [
  {
    title: 'Just the ads',
    description:
      'Performance only. You handle lead follow-up and operations.',
    services: ['Performance'],
    price: 'From £495/month',
  },
  {
    title: 'Ads + full follow-up',
    description:
      'Most established gyms land here. We run the ads and own the lead-to-member journey end-to-end.',
    services: ['Performance', 'Lead Nurture & CRM', 'Local Search'],
    price: 'From £2,139/month',
  },
  {
    title: 'Pre-opening launch',
    description:
      'Everything you need to open with a full book. Three-month focused engagement.',
    services: ['Performance', 'Pre-Sale Conversion', 'Lead Nurture & CRM'],
    price: 'From £2,785/month (3-month min)',
  },
]

export default function ServiceCombinations() {
  const locale = useLocale()

  return (
    <section className="bg-white py-24 md:py-[96px]">
      <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
        <FadeUp>
          <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-accent">
            Common combinations
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="mt-4 max-w-[600px] font-[family-name:var(--font-display)] text-[32px] leading-[1.05] text-brand-primary md:text-[40px]">
            How clubs actually stack our services.
          </h2>
        </FadeUp>
        <FadeUp delay={0.12}>
          <p className="mt-4 text-[17px] leading-[1.75] text-brand-secondary">
            Every gym is different. Here are three common setups.
          </p>
        </FadeUp>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {COMBOS.map((combo, i) => (
            <FadeUp key={combo.title} delay={0.16 + i * 0.08}>
              <div className="flex h-full flex-col rounded-[12px] border border-[rgba(0,0,0,0.12)] bg-brand-bg-secondary p-8">
                <h3 className="text-[20px] font-semibold leading-[1.25] text-brand-primary">
                  {combo.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-brand-secondary">
                  {combo.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {combo.services.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-[rgba(0,0,0,0.12)] px-3 py-1 text-[12px] font-medium text-brand-primary"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-8 font-[family-name:var(--font-mono)] text-[18px] font-semibold text-brand-primary tabular">
                  {combo.price}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.4}>
          <p className="mt-6 text-[13px] text-brand-tertiary">
            These are common combinations, not fixed bundles. Mix and match as
            needed.{' '}
            <Link
              href={localePath(locale, '/contact')}
              className="font-medium text-brand-accent hover:underline"
            >
              Talk to us about your setup →
            </Link>
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
