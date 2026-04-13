import { NextResponse, type NextRequest } from 'next/server'
import {
  LOCALE_SLUGS,
  negotiateLocale,
  isLocale,
} from './lib/locales'

/**
 * Proxy: route every request without a locale prefix to the right
 * /{locale}/... path. The set of locales we publish lives in lib/locales.ts.
 *
 * Skipped paths:
 *   - Anything already prefixed with a known locale
 *   - /styles (internal preview, not part of the marketing site)
 *   - Any static asset (matched by the `.` in the filename)
 *   - Internal Next.js paths (handled by the matcher below)
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Already localized? Let it through.
  const firstSegment = pathname.split('/')[1] || ''
  if (isLocale(firstSegment)) {
    return NextResponse.next()
  }

  // Skip the internal /styles preview and anything with a file extension.
  if (pathname.startsWith('/styles') || pathname.includes('.')) {
    return NextResponse.next()
  }

  const locale = negotiateLocale(request.headers.get('accept-language'))
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  // Skip Next internals + the static fonts directory + favicon.
  matcher: ['/((?!_next|fonts|favicon.ico).*)'],
}

// Re-export to silence the "unused" linter warning when only used via matcher.
void LOCALE_SLUGS
