// lib/constants.ts
// Update these values as real data becomes available.
// Service pricing lives in lib/pricing.ts — don't duplicate it here.

// TODO: Replace with Rep & Reach verified results once first case study is live.
export const BENCHMARK_STATS = [
  { value: '£4–£8', label: 'Typical cost per lead for gyms on Meta (UK)' },
  { value: '48–72h', label: 'Industry standard time to first lead' },
  { value: '3–5×', label: 'Target return on ad spend for paid social' },
  { value: '100%', label: 'Rep & Reach clients are fitness businesses. Always.' },
]

export const TARGET_SEGMENTS = [
  'Independent gyms',
  'Boutique studios',
  'CrossFit boxes',
  'Hyrox facilities',
  'Boxing gyms',
  'Pilates & yoga',
]

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery call (45 minutes)',
    description:
      'We audit your current marketing, your membership offer, your competition, and your catchment. You leave the call with a written plan whether you hire us or not.',
  },
  {
    number: '02',
    title: 'Campaign build (5 working days)',
    description:
      'We build your Meta and Google campaigns, write the ad copy, direct the creative, and set up tracking end-to-end. No templates. Every campaign is built from your specific offer and catchment.',
  },
  {
    number: '03',
    title: 'First leads (48 hours from launch)',
    description:
      'Most clients see their first enquiries within 48 hours of campaigns going live. You see every lead as it comes in — via email, SMS, or straight into your CRM.',
  },
  {
    number: '04',
    title: 'Ongoing optimisation (weekly)',
    description:
      'We review campaign performance weekly and adjust targeting, creative, and bidding to keep your cost per lead falling. Monthly reporting call covers what worked, what didn\u2019t, and what\u2019s next.',
  },
]

export const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Who We Work With', href: '/who-we-work-with' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

// Service slugs for footer links — Nav/Footer prepend the current locale.
export const FOOTER_SERVICE_LINKS = [
  { label: 'Performance', path: '/services/performance' },
  { label: 'Lead Nurture & CRM', path: '/services/lead-nurture-crm' },
  { label: 'Local Search & Reputation', path: '/services/local-search' },
  { label: 'Organic Social Media', path: '/services/organic-social-media' },
  { label: 'Out-of-Hours Phone', path: '/services/out-of-hours-phone' },
  { label: 'Pre-Sale Conversion', path: '/services/pre-sale-conversion' },
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

export const FAQ_ITEMS = [
  {
    q: 'How is Rep & Reach different from a generalist agency?',
    a: 'We only work with gyms and fitness studios. Every campaign we\u2019ve ever built has been for a fitness operator. We know the offers that convert, the creative angles that work, and the cost-per-lead benchmarks you should be hitting in your market. A generalist agency is learning on your budget \u2014 we aren\u2019t.',
  },
  {
    q: 'Is there a minimum contract?',
    a: 'Our Performance retainer is month-to-month after an initial 90-day commitment \u2014 enough time to let campaigns stabilise and optimise. Pre-Sale Conversion engagements are a three-month minimum because the work is front-loaded around your opening date. All other add-ons are month-to-month.',
  },
  {
    q: 'How much should I spend on ads alongside your fee?',
    a: 'We recommend a minimum of \u00a3500/month in ad spend to give campaigns enough data to optimise. Most clubs spend \u00a3500\u2013\u00a32,000/month depending on their catchment and growth goals. Ad spend is paid directly to Meta and Google, never through us.',
  },
  {
    q: 'When will I see my first lead?',
    a: 'Most clients see their first enquiries within 48 hours of campaigns going live. Meaningful performance data \u2014 cost per lead, conversion rate, ROAS \u2014 takes 2\u20134 weeks to stabilise.',
  },
  {
    q: 'Do I need to have a CRM already?',
    a: 'No. If you don\u2019t have one, our Lead Nurture & CRM add-on includes setup. If you do, we\u2019ll plug into whatever you\u2019re using.',
  },
  {
    q: 'What if I\u2019m already running ads \u2014 can you just take over?',
    a: 'Yes. We\u2019ll audit your existing campaigns during discovery and tell you honestly whether to rebuild or optimise what\u2019s there. Many clubs have perfectly salvageable accounts that just need better hands on them.',
  },
  {
    q: 'Do you work with new gyms that haven\u2019t opened yet?',
    a: 'Yes \u2014 our Pre-Sale Conversion service is specifically for pre-opening clubs. We run the ads, work every enquiry, and aim to fill your founding membership book before your doors open.',
  },
  {
    q: 'How do I know this will work for my gym?',
    a: 'Send us an enquiry. We\u2019ll audit your market, catchment, offer, and competition, and give you an honest assessment \u2014 including if we don\u2019t think we\u2019re the right fit. No pressure, no hard sell.',
  },
]

export const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || ''
