import Link from 'next/link'

/**
 * Slim top utility bar. Sits above the main nav.
 * Tells visitors at a glance: we're real, we're taking work, here's how to start.
 * Hidden on mobile to keep vertical space for content.
 */
export default function UtilityBar() {
  return (
    <div className="relative z-50 hidden border-b border-[var(--color-border-light)] bg-brand-bg md:block">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-2 lg:px-12">
        <div className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-brand-secondary">
          <span className="live-dot" aria-hidden />
          <span className="text-brand-primary">Now booking</span>
          <span className="text-brand-tertiary">— Q2 2026 openings</span>
        </div>
        <div className="hidden items-center gap-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-brand-tertiary lg:flex">
          <span>EST. London / Berlin / NYC</span>
          <span className="text-brand-tertiary/50">/</span>
          <span>3 client slots / quarter</span>
          <span className="text-brand-tertiary/50">/</span>
          <Link
            href="/contact"
            className="text-brand-primary transition-colors duration-150 hover:text-brand-accent"
          >
            Discovery call &nbsp;&#x2198;
          </Link>
        </div>
      </div>
    </div>
  )
}
