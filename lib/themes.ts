// lib/themes.ts
// 5 premium style directions for the Rep & Reach site.
// Each theme exposes a full set of CSS variable overrides plus metadata.

export type Theme = {
  slug: string
  name: string
  tagline: string
  description: string
  isDark: boolean
  colors: {
    bg: string
    bgSecondary: string
    bgDark: string
    textPrimary: string
    textSecondary: string
    textTertiary: string
    textOnDark: string
    textOnDarkMuted: string
    accent: string
    accentText: string
    borderLight: string
    borderMedium: string
  }
}

export const THEMES: Theme[] = [
  {
    slug: 'electric-pulse',
    name: 'Electric Pulse',
    tagline: 'Bold. Athletic. Unmissable.',
    description:
      'Deep charcoal with a shock of electric lime. Built for gyms that refuse to blend in.',
    isDark: true,
    colors: {
      bg: '#0A0A0A',
      bgSecondary: '#141414',
      bgDark: '#000000',
      textPrimary: '#F5F5F5',
      textSecondary: '#9A9A9A',
      textTertiary: '#5E5E5E',
      textOnDark: '#F5F5F5',
      textOnDarkMuted: 'rgba(245, 245, 245, 0.60)',
      accent: '#D4FF00',
      accentText: '#0A0A0A',
      borderLight: 'rgba(255, 255, 255, 0.08)',
      borderMedium: 'rgba(255, 255, 255, 0.18)',
    },
  },
  {
    slug: 'sunset-studio',
    name: 'Sunset Studio',
    tagline: 'Warm. Editorial. Boutique.',
    description:
      'Cream backgrounds with warm terracotta. Built for boutique studios where aesthetic is part of the product.',
    isDark: false,
    colors: {
      bg: '#FAF6EF',
      bgSecondary: '#F1EADD',
      bgDark: '#1F120A',
      textPrimary: '#1F120A',
      textSecondary: '#6B5A48',
      textTertiary: '#A49380',
      textOnDark: '#FAF6EF',
      textOnDarkMuted: 'rgba(250, 246, 239, 0.65)',
      accent: '#C65D2E',
      accentText: '#FAF6EF',
      borderLight: 'rgba(31, 18, 10, 0.08)',
      borderMedium: 'rgba(31, 18, 10, 0.18)',
    },
  },
  {
    slug: 'executive',
    name: 'Executive',
    tagline: 'Premium. Considered. Trusted.',
    description:
      'Deep navy with champagne gold. For high-end clubs, franchise groups, and premium memberships.',
    isDark: true,
    colors: {
      bg: '#0A1628',
      bgSecondary: '#12203A',
      bgDark: '#050C17',
      textPrimary: '#F5F2EA',
      textSecondary: '#9CA7BF',
      textTertiary: '#5E6B82',
      textOnDark: '#F5F2EA',
      textOnDarkMuted: 'rgba(245, 242, 234, 0.60)',
      accent: '#D4AF37',
      accentText: '#0A1628',
      borderLight: 'rgba(245, 242, 234, 0.10)',
      borderMedium: 'rgba(245, 242, 234, 0.22)',
    },
  },
  {
    slug: 'forest-retreat',
    name: 'Forest Retreat',
    tagline: 'Natural. Grounded. Elevated.',
    description:
      'Bone whites with deep forest green. For wellness-focused studios, Pilates, yoga, and holistic fitness.',
    isDark: false,
    colors: {
      bg: '#F4F0E6',
      bgSecondary: '#E7E1D1',
      bgDark: '#0E1F17',
      textPrimary: '#0E1F17',
      textSecondary: '#4E5C53',
      textTertiary: '#8A958E',
      textOnDark: '#F4F0E6',
      textOnDarkMuted: 'rgba(244, 240, 230, 0.65)',
      accent: '#2D5F3F',
      accentText: '#F4F0E6',
      borderLight: 'rgba(14, 31, 23, 0.08)',
      borderMedium: 'rgba(14, 31, 23, 0.18)',
    },
  },
  {
    slug: 'crimson-velvet',
    name: 'Crimson Velvet',
    tagline: 'Dramatic. Confident. Memorable.',
    description:
      'Warm near-black with deep crimson. For combat gyms, boxing, and premium strength clubs.',
    isDark: true,
    colors: {
      bg: '#191316',
      bgSecondary: '#241C1F',
      bgDark: '#0C0809',
      textPrimary: '#FAF6F4',
      textSecondary: '#A89A9D',
      textTertiary: '#6A5C5F',
      textOnDark: '#FAF6F4',
      textOnDarkMuted: 'rgba(250, 246, 244, 0.60)',
      accent: '#C8324A',
      accentText: '#FAF6F4',
      borderLight: 'rgba(250, 246, 244, 0.08)',
      borderMedium: 'rgba(250, 246, 244, 0.18)',
    },
  },
]

export function getTheme(slug: string): Theme | undefined {
  return THEMES.find((t) => t.slug === slug)
}
