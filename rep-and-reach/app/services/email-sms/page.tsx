import type { Metadata } from 'next'
import ServiceDetail from '@/components/ServiceDetail'
import CTABar from '@/components/CTABar'

export const metadata: Metadata = {
  title: 'Email & SMS Marketing for Gyms — Rep & Reach',
  description:
    'Automated email and SMS sequences that nurture leads, convert trials, and retain members for gyms and fitness studios.',
  openGraph: {
    title: 'Email & SMS Marketing for Gyms — Rep & Reach',
    description:
      'Automated email and SMS sequences that nurture leads, convert trials, and retain members for gyms and fitness studios.',
    type: 'website',
    url: 'https://repandreach.com/services/email-sms',
  },
}

export default function EmailSmsPage() {
  return (
    <>
      <ServiceDetail
        label="04 — Add-on Service"
        heading="Nurture leads. Retain members."
        body={[
          "Generating a lead is only half the job. Email and SMS marketing ensures every enquiry is followed up properly, every trial is converted, and every member stays engaged long after they join.",
          "We build automated sequences that work in the background — welcome flows, lead nurture sequences, trial-to-member conversion emails, re-engagement campaigns for lapsed members, and referral mechanics. Set up once, running always.",
        ]}
        includes={[
          'Email platform setup (we work with most major platforms)',
          'Lead nurture sequence (5–7 email flow post-enquiry)',
          'Trial conversion sequence',
          'Monthly member engagement email',
          'Lapsed member re-engagement campaign',
          'SMS integration for time-sensitive follow-up',
          'Monthly performance reporting',
        ]}
        bestFor="Gyms with a steady lead flow that want to convert more of them"
      />
      <CTABar />
    </>
  )
}
