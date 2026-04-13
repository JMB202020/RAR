import type { Metadata } from 'next'
import StylesClient from './StylesClient'

export const metadata: Metadata = {
  title: 'Style Explorations — Rep & Reach',
  description:
    'Five premium style directions for the Rep & Reach website. Pick a palette and compare side by side.',
  robots: { index: false, follow: false },
}

export default function StylesPage() {
  return <StylesClient />
}
