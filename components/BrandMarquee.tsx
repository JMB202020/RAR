import { FITNESS_BRAND_LOGOS } from './BrandLogos'

/**
 * BrandMarquee — a slow-scrolling strip of well-known fitness brand logos.
 *
 * IMPORTANT: these are NOT clients of Rep & Reach. The strip exists purely
 * to show the breadth of the global gym market we operate in. The disclaimer
 * line below the label makes that explicit so nobody could read it as a
 * client-list claim. Logos are simplified monochrome wordmarks rendered as
 * inline SVG from components/BrandLogos.tsx — not the companies' official
 * logos, which belong to their respective trademark owners.
 */

export default function BrandMarquee() {
  return (
    <section className="border-y border-[var(--color-border-light)] bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
        <p className="text-center text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
          Examples of fitness brands worldwide
        </p>
        <p className="mt-2 text-center text-[12px] text-brand-tertiary/70">
          For context — not clients of Rep &amp; Reach
        </p>
      </div>

      <div className="marquee-fade mt-10 overflow-hidden md:mt-12">
        {/* Single track, content duplicated so the -50% translate loops seamlessly. */}
        <div className="brand-marquee flex items-center">
          {[...FITNESS_BRAND_LOGOS, ...FITNESS_BRAND_LOGOS].map(
            ([Logo, name], i) => (
              <div
                key={`${name}-${i}`}
                className="flex shrink-0 items-center px-10 md:px-14"
              >
                <Logo className="h-8 w-auto text-brand-primary/50 md:h-10" />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
