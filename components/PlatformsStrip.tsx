import FadeUp from './FadeUp'

/**
 * Inline-SVG brand glyphs in their actual brand colours.
 *
 * Trademarks belong to their respective owners; we use them only to
 * identify the platforms we run campaigns on, which is nominative fair use.
 *
 * Path data adapted from simple-icons (CC0 / Public Domain) and Google's
 * own brand assets, recoloured to match each company's official palette.
 */

function MetaGlyph({ size = 32 }: { size?: number }) {
  return (
    <svg
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-label="Meta"
    >
      <title>Meta</title>
      <path
        fill="#0866FF"
        d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.234.236c1.265 0 2.595.948 3.99 3.06.582.881 1.181 1.913 1.81 3.014l-.491.873c-.812 1.434-1.616 2.836-2.181 3.668-1.039 1.531-1.836 1.871-2.61 1.871-.913 0-1.572-.398-2.027-.998-.422-.553-.642-1.342-.642-2.516 0-3.51 1.625-7.297 3.605-7.297z"
      />
    </svg>
  )
}

function GoogleGlyph({ size = 32 }: { size?: number }) {
  // Official 4-colour Google G — each path is a separate segment.
  return (
    <svg
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-label="Google"
    >
      <title>Google</title>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function InstagramGlyph({ size = 32 }: { size?: number }) {
  // Official Instagram brand gradient (yellow -> orange -> pink -> purple).
  return (
    <svg
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-label="Instagram"
    >
      <title>Instagram</title>
      <defs>
        <linearGradient
          id="ig-gradient"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="25%" stopColor="#FA7E1E" />
          <stop offset="50%" stopColor="#D62976" />
          <stop offset="75%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <path
        fill="url(#ig-gradient)"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
      />
    </svg>
  )
}

function YouTubeGlyph({ size = 32 }: { size?: number }) {
  return (
    <svg
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-label="YouTube"
    >
      <title>YouTube</title>
      <path
        fill="#FF0000"
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
      />
      <path fill="#FFFFFF" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function GoogleMapsGlyph({ size = 32 }: { size?: number }) {
  // Two-tone Google Maps marker: red pin in Google's map-marker red, with a
  // white inner circle. Recognisable as a Maps pin without trying to
  // recreate the multi-segment teardrop logo.
  return (
    <svg
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-label="Google Maps"
    >
      <title>Google Maps</title>
      <path
        fill="#EA4335"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      />
      <circle cx="12" cy="9" r="2.5" fill="#FFFFFF" />
    </svg>
  )
}

const PLATFORMS = [
  { name: 'Meta', Glyph: MetaGlyph },
  { name: 'Google', Glyph: GoogleGlyph },
  { name: 'Instagram', Glyph: InstagramGlyph },
  { name: 'YouTube', Glyph: YouTubeGlyph },
  { name: 'Google Maps', Glyph: GoogleMapsGlyph },
]

export default function PlatformsStrip() {
  return (
    <section className="border-y border-[var(--color-border-light)] bg-white py-12">
      <div className="mx-auto max-w-[1160px] px-6 lg:px-20">
        <FadeUp>
          <p className="text-center text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
            We run ads where your members already spend their time
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16">
            {PLATFORMS.map(({ name, Glyph }) => (
              <li
                key={name}
                className="flex items-center gap-3 text-brand-primary"
                title={name}
              >
                <Glyph size={30} />
                <span className="text-[15px] font-medium tracking-[0.02em]">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  )
}
