import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'
import Hero from '@/components/Hero'
import CTABar from '@/components/CTABar'
import FadeUp from '@/components/FadeUp'
import PriceLabel from '@/components/PriceLabel'
import {
  CORE_PACKAGE,
  ADDON_SERVICES,
  type ServicePricing,
  type ServiceImage,
} from '@/lib/pricing'
import { isLocale, localePath, type LocaleSlug } from '@/lib/locales'

// Build the full list of services for lookup + static params.
type ServiceDetail = ServicePricing & {
  description: string
  extendedBody?: string | null
  includes: string[]
  bestFor: string
  image: ServiceImage
  note?: string | null
  kind: 'core' | 'addon'
}

const ALL_SERVICES: ServiceDetail[] = [
  { ...CORE_PACKAGE, kind: 'core' },
  ...ADDON_SERVICES.map((a) => ({ ...a, kind: 'addon' as const })),
]

const SERVICE_SLUGS = ALL_SERVICES.map((s) => s.slug)

export function generateStaticParams() {
  // Locale params are handled by the parent [locale]/layout.tsx.
  // We only need to enumerate slugs here.
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params
  const service = ALL_SERVICES.find((s) => s.slug === slug)
  if (!service) return {}
  return {
    title: `${service.label} — Rep & Reach`,
    description: service.description,
  }
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export default async function ServicePage({ params }: PageProps) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const service = ALL_SERVICES.find((s) => s.slug === slug)
  if (!service) notFound()

  const detailLabel =
    service.kind === 'core'
      ? 'Core service'
      : service.slug === 'pre-sale-conversion'
        ? 'Add-on service · Pre-opening clubs'
        : 'Add-on service'

  return (
    <>
      <Hero
        eyebrow={detailLabel}
        heading={service.label}
        body={service.description}
      />

      <section className="py-24 md:py-[96px]">
        <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
          <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              {service.extendedBody && (
                <FadeUp>
                  <p className="max-w-[520px] text-[17px] leading-[1.75] text-brand-secondary">
                    {service.extendedBody}
                  </p>
                </FadeUp>
              )}
              <FadeUp delay={0.08}>
                <p className="mt-8 font-[family-name:var(--font-mono)] text-[20px] font-semibold text-brand-primary tabular">
                  <PriceLabel
                    prices={service.prices}
                    prefix={service.prefix}
                  />
                </p>
                {service.note && (
                  <p className="mt-1 text-[13px] text-brand-tertiary">
                    {service.note}
                  </p>
                )}
              </FadeUp>
              <FadeUp delay={0.12}>
                <p className="mt-8 text-[12px] font-medium uppercase tracking-[0.1em] text-brand-accent">
                  What&apos;s included
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] leading-[1.55] text-brand-secondary"
                    >
                      <Check
                        size={18}
                        className="mt-[3px] shrink-0 text-brand-accent"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="mt-8 text-[14px] leading-[1.65] text-brand-tertiary">
                  <span className="font-medium text-brand-primary">
                    Best for:
                  </span>{' '}
                  {service.bestFor}
                </p>
              </FadeUp>
              <FadeUp delay={0.24}>
                <Link
                  href={localePath(locale as LocaleSlug, '/contact')}
                  className="mt-10 inline-flex items-center gap-1.5 rounded-[6px] bg-brand-accent px-7 py-3.5 text-[15px] font-medium text-brand-accent-text transition-all duration-200 hover:opacity-90 hover:shadow-lg"
                >
                  Get started <span aria-hidden>&rarr;</span>
                </Link>
              </FadeUp>
            </div>

            <div className="md:col-span-6">
              <FadeUp delay={0.1}>
                <div className="relative h-[280px] w-full overflow-hidden rounded-[12px] bg-brand-bg-secondary md:h-[440px]">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(min-width: 1024px) 540px, 100vw"
                    className="object-cover"
                  />
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <CTABar />
    </>
  )
}
