'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronDown, Check } from 'lucide-react'
import {
  LOCALES,
  DEFAULT_LOCALE,
  extractLocale,
  type LocaleSlug,
} from '@/lib/locales'

interface LocalePickerProps {
  /** Variant: 'nav' for the top nav, 'inline' for footer/mobile. */
  variant?: 'nav' | 'inline'
}

export default function LocalePicker({ variant = 'nav' }: LocalePickerProps) {
  const router = useRouter()
  const pathname = usePathname() ?? '/'
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const currentSlug: LocaleSlug = extractLocale(pathname) ?? DEFAULT_LOCALE
  const current = LOCALES.find((l) => l.slug === currentSlug) ?? LOCALES[0]

  // Click-outside to close
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const handleSelect = (slug: LocaleSlug) => {
    setOpen(false)
    // Strip the existing locale segment if present, then prepend the new one.
    const segments = pathname.split('/').filter(Boolean)
    if (segments[0] && extractLocale(`/${segments[0]}`)) segments.shift()
    const newPath = `/${slug}${segments.length ? '/' + segments.join('/') : ''}`
    router.push(newPath)
  }

  const buttonClasses =
    variant === 'nav'
      ? 'flex items-center gap-1.5 rounded-[6px] border border-[var(--color-border-medium)] px-3 py-2 text-[13px] text-brand-primary hover:border-brand-primary'
      : 'flex items-center gap-1.5 text-[14px] text-brand-secondary hover:text-brand-primary'

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={buttonClasses}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Region: ${current.country}`}
      >
        <span aria-hidden>{current.flag}</span>
        <span className="font-medium">{current.code}</span>
        <ChevronDown size={14} className="opacity-60" aria-hidden />
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute z-50 mt-2 ${
            variant === 'nav' ? 'right-0' : 'left-0'
          } min-w-[240px] overflow-hidden rounded-[8px] border border-[rgba(0,0,0,0.12)] bg-white py-2 shadow-[0_8px_24px_rgba(0,0,0,0.10)]`}
        >
          {LOCALES.map((locale) => {
            const active = locale.slug === currentSlug
            return (
              <li key={locale.slug}>
                <button
                  type="button"
                  onClick={() => handleSelect(locale.slug)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[14px] text-brand-primary hover:bg-brand-bg-secondary"
                  role="option"
                  aria-selected={active}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[18px]" aria-hidden>
                      {locale.flag}
                    </span>
                    <span>
                      {locale.country}{' '}
                      <span className="text-brand-tertiary">
                        ({locale.currency})
                      </span>
                    </span>
                  </span>
                  {active && (
                    <Check size={16} className="text-brand-primary" aria-hidden />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
