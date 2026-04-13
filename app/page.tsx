import { redirect } from 'next/navigation'
import { DEFAULT_LOCALE } from '@/lib/locales'

/**
 * Static fallback for `/`. The proxy.ts file handles dynamic locale detection
 * from Accept-Language for visitors with no locale in the URL — this page
 * exists so that prerendered static export still works for the bare root.
 */
export default function RootIndex() {
  redirect(`/${DEFAULT_LOCALE}`)
}
