/**
 * BrandMarquee — a slow-scrolling strip of well-known fitness brands.
 *
 * IMPORTANT: these are NOT clients of Rep & Reach. The strip exists purely
 * to show the breadth of the global gym market we operate in. The disclaimer
 * line below the label makes that explicit so nobody could read it as a
 * client-list claim.
 *
 * Brands are rendered as styled text (no logos / wordmarks) which keeps
 * trademark exposure low and makes it visually obvious that this isn't a
 * "trusted by" logo wall.
 */

const BRANDS = [
  'Equinox',
  'David Lloyd',
  'Virgin Active',
  'PureGym',
  'Anytime Fitness',
  'Planet Fitness',
  "Gold's Gym",
  'F45 Training',
  "Barry's",
  'Orangetheory',
  'SoulCycle',
  'The Gym Group',
  'Third Space',
  '1Rebel',
  'Crunch Fitness',
  'Lifetime Fitness',
  '24 Hour Fitness',
  'LA Fitness',
  'Snap Fitness',
  'Goodlife Health Clubs',
  'World Gym',
  'Fitness First',
  'UFC Gym',
  'CorePower Yoga',
  'BLOK',
  'Les Mills',
  'Pure Fitness',
  'True Fitness',
  'CrossFit',
  'Hyrox',
]

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
        <div className="brand-marquee flex">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex shrink-0 items-center px-8 md:px-12"
            >
              <span className="font-[family-name:var(--font-display)] text-[28px] whitespace-nowrap text-brand-primary/35 md:text-[36px]">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
