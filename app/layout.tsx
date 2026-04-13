import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import UtilityBar from '@/components/UtilityBar'
import './globals.css'

const geist = localFont({
  src: '../public/fonts/geist-latin.woff2',
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = localFont({
  src: '../public/fonts/geist-mono-latin.woff2',
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Rep & Reach — Performance Marketing for Gyms & Fitness Studios",
  description:
    "Meta ads, Google ads, and lead generation exclusively for gyms, CrossFit boxes, boutique studios, and Hyrox facilities. We fill gyms. That's all we do.",
  openGraph: {
    title: "Rep & Reach — Performance Marketing for Gyms & Fitness Studios",
    description:
      "Meta ads, Google ads, and lead generation exclusively for gyms, CrossFit boxes, boutique studios, and Hyrox facilities. We fill gyms. That's all we do.",
    type: 'website',
    url: 'https://repandreach.com',
    // TODO: Add OG image when available
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} antialiased`}
    >
      {/* Instrument Serif loaded via runtime link since next/font/google
          requires build-time access to Google Fonts.
          TODO: Switch to next/font/google import when build environment has network access. */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative flex min-h-screen flex-col bg-brand-bg text-brand-primary">
        <div className="grain" aria-hidden />
        <UtilityBar />
        <Nav />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
