import Link from 'next/link'
import { NAV_LINKS, FOOTER_SERVICE_LINKS } from '@/lib/constants'

const FOOTER_PAGE_LINKS = [
  { label: 'Home', href: '/' },
  ...NAV_LINKS,
]

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-light)] bg-white">
      <div className="mx-auto max-w-[1160px] px-6 pt-20 pb-10 lg:px-20">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {/* Column 1 — Brand */}
          <div>
            <Link
              href="/"
              className="text-[15px] font-semibold tracking-[0.06em] text-brand-primary"
            >
              REP &amp; REACH
            </Link>
            <p className="mt-5 max-w-[280px] text-[14px] leading-[1.65] text-brand-secondary">
              Performance marketing for gyms and fitness studios.
            </p>
            <p className="mt-6 text-[13px] text-brand-tertiary">
              &copy; {new Date().getFullYear()} Rep &amp; Reach. All rights
              reserved.
            </p>
          </div>

          {/* Column 2 — Pages */}
          <div>
            <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
              Pages
            </p>
            <ul className="mt-5 flex flex-col gap-3">
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
            <ul className="mt-5 flex flex-col gap-3">
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
    </footer>
  )
}
