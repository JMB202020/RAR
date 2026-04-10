import Link from 'next/link'
import { NAV_LINKS, FOOTER_SERVICE_LINKS } from '@/lib/constants'

const FOOTER_PAGE_LINKS = [
  { label: 'Home', href: '/' },
  ...NAV_LINKS,
]

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-light)] bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Column 1 — Brand */}
          <div>
            <Link
              href="/"
              className="text-[15px] font-medium tracking-[0.08em] text-brand-primary"
            >
              REP &amp; REACH
            </Link>
            <p className="mt-4 text-[14px] leading-relaxed text-brand-secondary">
              Performance marketing for gyms and fitness studios.
            </p>
            <p className="mt-6 text-[13px] text-brand-tertiary">
              &copy; {new Date().getFullYear()} Rep &amp; Reach. All rights reserved.
            </p>
          </div>

          {/* Column 2 — Pages */}
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
              Pages
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {FOOTER_PAGE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-brand-secondary transition-colors duration-150 hover:text-brand-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
              Services
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {FOOTER_SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-brand-secondary transition-colors duration-150 hover:text-brand-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-border-light)]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-2 px-6 py-6 text-[13px] text-brand-tertiary sm:flex-row sm:items-center lg:px-16">
          <span>repandreach.com</span>
          <span>Built for fitness businesses worldwide.</span>
        </div>
      </div>
    </footer>
  )
}
