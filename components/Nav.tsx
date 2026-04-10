'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('nav-open')
    } else {
      document.body.classList.remove('nav-open')
    }
    return () => document.body.classList.remove('nav-open')
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-[12px] border-b border-[var(--color-border-light)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 lg:px-16">
        <Link
          href="/"
          className="font-[var(--font-body)] text-[15px] font-medium tracking-[0.08em] text-brand-primary"
        >
          REP &amp; REACH
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-[14px] transition-colors duration-150 ${
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'text-brand-primary border-b border-brand-primary pb-0.5'
                    : 'text-brand-secondary hover:text-brand-primary'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-block rounded-[6px] border border-brand-primary px-6 py-2.5 text-[14px] font-medium text-brand-primary transition-all duration-150 hover:bg-brand-primary hover:text-brand-inverse"
          >
            Book a call
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white md:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-[15px] font-medium tracking-[0.08em] text-brand-primary"
              onClick={() => setMobileOpen(false)}
            >
              REP &amp; REACH
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          <ul className="flex flex-1 flex-col items-start gap-6 px-6 pt-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-[24px] font-medium transition-colors duration-150 ${
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'text-brand-primary'
                      : 'text-brand-secondary hover:text-brand-primary'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-4 w-full">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full rounded-[6px] border border-brand-primary py-3 text-center text-[16px] font-medium text-brand-primary transition-all duration-150 hover:bg-brand-primary hover:text-brand-inverse"
              >
                Book a call
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
