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
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
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
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'border-b border-[var(--color-border-light)] bg-white/85 backdrop-blur-[12px]'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-[1160px] items-center justify-between px-6 py-5 lg:px-20">
        <Link
          href="/"
          aria-label="Rep & Reach — home"
          className="text-[15px] font-semibold tracking-[0.06em] text-brand-primary"
        >
          REP &amp; REACH
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-[15px] transition-colors duration-150 ${
                    active
                      ? 'text-brand-primary'
                      : 'text-brand-secondary hover:text-brand-primary'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 rounded-[6px] bg-brand-primary px-5 py-2.5 text-[14px] font-medium text-brand-inverse transition-opacity duration-150 hover:opacity-80"
          >
            Book a call <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="text-brand-primary md:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white md:hidden">
          <div className="flex items-center justify-between border-b border-[var(--color-border-light)] px-6 py-5">
            <Link
              href="/"
              className="text-[15px] font-semibold tracking-[0.06em] text-brand-primary"
              onClick={() => setMobileOpen(false)}
            >
              REP &amp; REACH
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="text-brand-primary"
            >
              <X size={24} />
            </button>
          </div>
          <ul className="flex flex-1 flex-col items-start gap-7 px-6 pt-12">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-[28px] font-medium ${
                      active ? 'text-brand-primary' : 'text-brand-secondary'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
            <li className="mt-6 w-full">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-[6px] bg-brand-primary py-3.5 text-center text-[15px] font-medium text-brand-inverse"
              >
                Book a call <span aria-hidden>&rarr;</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
