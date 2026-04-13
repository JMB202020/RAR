import { notFound } from 'next/navigation'
import { LOCALE_SLUGS, isLocale } from '@/lib/locales'

export function generateStaticParams() {
  return LOCALE_SLUGS.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  return <>{children}</>
}
