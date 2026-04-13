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
      className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[rgba(10,10,10,0.78)] backdrop-blur-[14px] border-b border-[var(--color-border-light)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-12">
        <Link
          href="/"
          aria-label="Rep & Reach — home"
          className="group flex items-center gap-2.5"
        >
          <span className="block size-2 rounded-full bg-brand-accent transition-transform duration-200 group-hover:scale-125" />
          <span className="font-[family-name:var(--font-mono)] text-[12px] font-medium uppercase tracking-[0.18em] text-brand-primary">
            Rep<span className="text-brand-accent">/</span>Reach
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link, i) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em]"
                >
                  <span className="mr-1.5 text-brand-tertiary tabular">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`transition-colors duration-150 ${
                      active
                        ? 'text-brand-accent'
                        : 'text-brand-secondary group-hover:text-brand-primary'
                    }`}
                  >
                    {link.label}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-brand-accent transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 bg-brand-accent px-5 py-2.5 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-brand-accent-text transition-all duration-150 hover:bg-[#E5FF40]"
          >
            Book a call
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
              &#x2198;
            </span>
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
        <div className="fixed inset-0 z-50 flex flex-col bg-brand-bg md:hidden">
          <div className="grain pointer-events-none" aria-hidden />
          <div className="relative z-10 flex items-center justify-between border-b border-[var(--color-border-light)] px-6 py-4">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              onClick={() => setMobileOpen(false)}
            >
              <span className="block size-2 rounded-full bg-brand-accent" />
              <span className="font-[family-name:var(--font-mono)] text-[12px] font-medium uppercase tracking-[0.18em] text-brand-primary">
                Rep<span className="text-brand-accent">/</span>Reach
              </span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="text-brand-primary"
            >
              <X size={24} />
            </button>
          </div>
          <ul className="relative z-10 flex flex-1 flex-col items-start gap-7 px-6 pt-12">
            {NAV_LINKS.map((link, i) => {
              const active =
                pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="group flex items-baseline gap-3"
                  >
                    <span className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.14em] text-brand-tertiary tabular">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-[family-name:var(--font-display)] text-[40px] leading-[1] ${
                        active ? 'text-brand-accent italic' : 'text-brand-primary'
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              )
            })}
            <li className="mt-6 w-full">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full bg-brand-accent py-4 text-center font-[family-name:var(--font-mono)] text-[12px] font-medium uppercase tracking-[0.14em] text-brand-accent-text"
              >
                Book a call &nbsp;&#x2198;
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
