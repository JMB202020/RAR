import Link from 'next/link'
import { NAV_LINKS, FOOTER_SERVICE_LINKS } from '@/lib/constants'

const FOOTER_PAGE_LINKS = [
  { label: 'Home', href: '/' },
  ...NAV_LINKS,
]

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border-light)] bg-brand-bg">
      <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-10 lg:px-12">
        {/* Big editorial wordmark */}
        <div className="border-b border-[var(--color-border-light)] pb-12">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-brand-tertiary">
            <span className="live-dot mr-2" /> Now booking — Q2 2026
          </p>
          <h2 className="mt-6 font-[family-name:var(--font-display)] text-[18vw] leading-[0.85] text-brand-primary md:text-[160px]">
            Rep<span className="text-brand-accent">/</span>
            <em className="italic">Reach.</em>
          </h2>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          {/* Brand column */}
          <div className="md:col-span-12 lg:col-span-5">
            <p className="max-w-[360px] text-[15px] leading-[1.7] text-brand-secondary">
              Performance marketing built exclusively for gyms, studios, and
              fitness facilities. Less guesswork. More members.
            </p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 bg-brand-accent px-6 py-3 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.16em] text-brand-accent-text transition-all duration-200 hover:bg-[#E5FF40]"
            >
              Book a discovery call
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                &#x2198;
              </span>
            </Link>
          </div>

          {/* Pages */}
          <div className="md:col-span-6 lg:col-span-3">
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-brand-tertiary">
              <span className="text-brand-accent">/</span> Pages
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {FOOTER_PAGE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-[14px] text-brand-secondary transition-colors duration-150 hover:text-brand-primary"
                  >
                    <span className="link-underline">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-6 lg:col-span-4">
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-brand-tertiary">
              <span className="text-brand-accent">/</span> Services
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {FOOTER_SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-[14px] text-brand-secondary transition-colors duration-150 hover:text-brand-primary"
                  >
                    <span className="link-underline">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-[var(--color-border-light)] pt-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-brand-tertiary sm:flex-row sm:items-center">
          <span>
            &copy; {new Date().getFullYear()} Rep &amp; Reach
            <span className="ml-3 text-brand-accent">/</span>
            <span className="ml-3">repandreach.com</span>
          </span>
          <span>Built for fitness businesses worldwide</span>
        </div>
      </div>
    </footer>
  )
}
