// lib/constants.ts
// Update these values as real data becomes available

export const STATS = [
  { value: '£4.20', label: 'Average cost per lead' },
  { value: '3.8×', label: 'Average return on ad spend' },
  { value: '48h', label: 'Average time to first lead' },
  { value: '100%', label: 'Fitness clients. No exceptions.' },
]
// TODO: Replace with real figures from first client campaigns

export const SERVICES_CORE = [
  {
    number: '01',
    name: 'Meta Ads',
    slug: 'meta-ads',
    description:
      'Paid social campaigns on Facebook and Instagram that generate membership enquiries and trial sign-ups at scale.',
  },
  {
    number: '02',
    name: 'Google Ads & YouTube',
    slug: 'google-ads',
    description:
      'Search campaigns for high-intent prospects, plus YouTube pre-roll to keep your facility front of mind.',
  },
  {
    number: '03',
    name: 'Remarketing',
    slug: 'remarketing',
    description:
      'Follow-up campaigns that re-engage warm leads across Meta and Google. Usually the highest-return activity in your account.',
  },
]

export const SERVICES_ADDONS = [
  {
    number: '04',
    name: 'Email & SMS Marketing',
    slug: 'email-sms',
    description:
      'Automated sequences that nurture leads, re-engage lapsed members, and drive referrals.',
  },
  {
    number: '05',
    name: 'Organic Social Media',
    slug: 'social-media',
    description:
      'Consistent, on-brand content for Instagram and Facebook.',
  },
  {
    number: '06',
    name: 'Landing Page Builds',
    slug: 'landing-pages',
    description:
      'Dedicated, high-converting landing pages for your ad campaigns.',
  },
  {
    number: '07',
    name: 'Offer & Funnel Strategy',
    slug: 'funnel-strategy',
    description:
      'Build a compelling membership offer, lead magnet, and follow-up funnel.',
  },
  {
    number: '08',
    name: 'CRM & Lead Management',
    slug: 'crm',
    description:
      'Take over your CRM and ensure every lead is followed up, fast.',
  },
]

export const TARGET_SEGMENTS = [
  'Independent gyms',
  'Boutique studios',
  'CrossFit boxes',
  'Hyrox facilities',
  'Franchise gyms',
  'Pilates & yoga studios',
  'Boxing gyms',
  'Cycling studios',
  'HIIT studios',
  'Personal training studios',
]

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery call',
    description:
      "We learn about your gym, your current marketing, and your goals. We'll tell you honestly whether we can help.",
  },
  {
    number: '02',
    title: 'Campaign build',
    description:
      'We build and launch your Meta and Google campaigns. Most clients go live within 5 working days.',
  },
  {
    number: '03',
    title: 'Leads start flowing',
    description:
      "Most clients see their first enquiries within 48 hours of launch. We'll notify you as leads come in.",
  },
  {
    number: '04',
    title: 'Ongoing optimisation',
    description:
      'We monitor, test, and improve every month. Monthly reporting keeps you across performance.',
  },
]

export const TRUST_REGIONS = [
  { flag: '🇬🇧', name: 'United Kingdom' },
  { flag: '🇺🇸', name: 'United States' },
  { flag: '🇦🇺', name: 'Australia' },
  { flag: '🇨🇦', name: 'Canada' },
  { flag: '🇮🇪', name: 'Ireland' },
  { flag: '🇳🇿', name: 'New Zealand' },
]

export const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Who We Work With', href: '/who-we-work-with' },
  { label: 'Results', href: '/results' },
  { label: 'Contact', href: '/contact' },
]

export const FOOTER_SERVICE_LINKS = [
  { label: 'Meta Ads', href: '/services/meta-ads' },
  { label: 'Google Ads & YouTube', href: '/services/google-ads' },
  { label: 'Remarketing', href: '/services/remarketing' },
  { label: 'Email & SMS', href: '/services/email-sms' },
  { label: 'Social Media', href: '/services/social-media' },
  { label: 'Landing Pages', href: '/services/landing-pages' },
  { label: 'Funnel Strategy', href: '/services/funnel-strategy' },
  { label: 'CRM Management', href: '/services/crm' },
]

export const FACILITY_TYPES = [
  'Independent gym',
  'Boutique studio (Pilates, yoga, boxing, cycling)',
  'CrossFit box',
  'Hyrox facility',
  'Franchise gym',
  'Personal training studio',
  'Other',
]

export const COUNTRIES = [
  'United Kingdom',
  'United States',
  'Australia',
  'Canada',
  'Ireland',
  'New Zealand',
  'South Africa',
  'Other',
]

export const AD_BUDGETS = [
  'Less than $500 / month',
  '$500 – $1,000 / month',
  '$1,000 – $2,500 / month',
  '$2,500+ / month',
  'Not currently running ads',
]

export const REFERRAL_SOURCES = [
  'Google search',
  'Instagram',
  'Facebook',
  'Referral / word of mouth',
  'LinkedIn',
  'Other',
]

export const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || ''
