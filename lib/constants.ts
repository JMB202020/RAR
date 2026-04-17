// lib/constants.ts
// Update these values as real data becomes available.
// Service pricing lives in lib/pricing.ts — don't duplicate it here.

export const STATS = [
  { value: '£4.20', label: 'cost per lead' },
  { value: '3.8×', label: 'return on ad spend' },
  { value: '48h', label: 'first lead' },
  { value: '100%', label: 'fitness clients' },
]
// TODO: Replace with real figures from first client campaigns

export const TARGET_SEGMENTS = [
  'Independent gyms',
  'Boutique studios',
  'CrossFit boxes',
  'Hyrox facilities',
  'Franchise gyms',
  'Boxing gyms',
  'Pilates & yoga',
  'Cycling studios',
]

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery call',
    description:
      'We learn about your gym and goals. Honest advice from the start.',
  },
  {
    number: '02',
    title: 'Campaign build',
    description: 'We go live within 5 working days.',
  },
  {
    number: '03',
    title: 'Leads flowing',
    description: 'Most clients see leads within 48h of launch.',
  },
  {
    number: '04',
    title: 'Optimisation',
    description: 'Monthly reporting and continuous improvement.',
  },
]

export const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Who We Work With', href: '/who-we-work-with' },
  { label: 'Results', href: '/results' },
  { label: 'Contact', href: '/contact' },
]

// Service slugs for footer links — Nav/Footer prepend the current locale.
export const FOOTER_SERVICE_LINKS = [
  { label: 'Performance', path: '/services#performance' },
  { label: 'Lead Nurture & CRM', path: '/services#lead-nurture-crm' },
  { label: 'Local Search & Reputation', path: '/services#local-search' },
  { label: 'Organic Social Media', path: '/services#organic-social-media' },
  { label: 'Out-of-Hours Phone', path: '/services#out-of-hours-phone' },
  { label: 'Pre-Sale Conversion', path: '/services#pre-sale-conversion' },
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
  'Less than £500 / month',
  '£500 – £1,000 / month',
  '£1,000 – £2,500 / month',
  '£2,500+ / month',
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
