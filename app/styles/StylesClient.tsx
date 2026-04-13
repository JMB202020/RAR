'use client'

import { useState } from 'react'
import Link from 'next/link'
import { THEMES } from '@/lib/themes'
import ThemedPreview from '@/components/ThemedPreview'

export default function StylesClient() {
  const [activeSlug, setActiveSlug] = useState(THEMES[0].slug)
  const activeTheme = THEMES.find((t) => t.slug === activeSlug) ?? THEMES[0]

  return (
    <>
      {/* Page intro */}
      <section className="pt-24 pb-12">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
          <p className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.18em] text-brand-secondary">
            <span className="block h-px w-8 bg-brand-accent" />
            Style explorations
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[44px] leading-[1.1] text-brand-primary md:text-[60px]">
            Five directions. One brand.
          </h1>
          <p className="mt-6 max-w-[620px] text-[18px] leading-[1.7] text-brand-secondary">
            Each direction below takes the same content and applies a different
            premium palette. Switch between them to compare — the goal is a
            serious, considered look with just enough colour to stand out.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Link
              href="/"
              className="text-[14px] text-brand-secondary underline-offset-4 hover:text-brand-primary hover:underline"
            >
              &larr; Back to current site
            </Link>
          </div>
        </div>
      </section>

      {/* Sticky theme switcher */}
      <div className="sticky top-0 z-40 border-y border-[var(--color-border-light)] bg-[rgba(10,10,10,0.85)] backdrop-blur-[12px]">
        <div className="mx-auto max-w-[1200px] overflow-x-auto px-6 lg:px-16">
          <div className="flex items-center gap-3 py-4">
            <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
              Theme
            </span>
            {THEMES.map((theme) => (
              <button
                key={theme.slug}
                onClick={() => setActiveSlug(theme.slug)}
                className={`shrink-0 border px-5 py-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] transition-all duration-150 ${
                  activeSlug === theme.slug
                    ? 'border-brand-accent bg-brand-accent text-brand-accent-text'
                    : 'border-[var(--color-border-medium)] text-brand-secondary hover:border-brand-accent hover:text-brand-primary'
                }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current theme description */}
      <section className="border-b border-[var(--color-border-light)] py-10">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-[680px]">
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-brand-tertiary">
                {activeTheme.tagline}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-[32px] leading-[1.2] text-brand-primary">
                {activeTheme.name}
              </h2>
              <p className="mt-3 text-[16px] leading-[1.7] text-brand-secondary">
                {activeTheme.description}
              </p>
            </div>

            {/* Swatch strip */}
            <div className="flex items-center gap-3">
              <SwatchTile color={activeTheme.colors.bg} label="Background" />
              <SwatchTile
                color={activeTheme.colors.textPrimary}
                label="Primary"
              />
              <SwatchTile
                color={activeTheme.colors.accent}
                label="Accent"
              />
              <SwatchTile
                color={activeTheme.colors.bgDark}
                label="Dark"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Themed homepage preview */}
      <ThemedPreview theme={activeTheme} />
    </>
  )
}

function SwatchTile({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="h-14 w-14 rounded-md border border-[var(--color-border-medium)]"
        style={{ backgroundColor: color }}
      />
      <span className="text-[10px] uppercase tracking-[0.08em] text-brand-tertiary">
        {label}
      </span>
    </div>
  )
}
