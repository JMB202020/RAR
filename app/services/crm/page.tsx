import type { Metadata } from 'next'
import ServiceDetail from '@/components/ServiceDetail'
import CTABar from '@/components/CTABar'

export const metadata: Metadata = {
  title: 'CRM & Lead Management for Gyms — Rep & Reach',
  description:
    'CRM setup, lead follow-up workflows, and pipeline tracking for gyms and fitness studios. Never let a lead go cold.',
  openGraph: {
    title: 'CRM & Lead Management for Gyms — Rep & Reach',
    description:
      'CRM setup, lead follow-up workflows, and pipeline tracking for gyms and fitness studios. Never let a lead go cold.',
    type: 'website',
    url: 'https://repandreach.com/services/crm',
  },
}

export default function CrmPage() {
  return (
    <>
      <ServiceDetail
        label="08 — Add-on Service"
        heading="Never let a lead go cold."
        body={[
          "Most gyms have a lead problem. Not generating them — following up on them. Enquiries come in, staff get busy, leads wait too long for a response, and the moment is lost.",
          "We take over your CRM, set up automated and manual follow-up workflows, and ensure every lead is contacted quickly, consistently, and with the right message at the right time. We track enquiry-to-trial and trial-to-member conversion so you always know what's working.",
        ]}
        includes={[
          'CRM setup or audit (we work with most major platforms)',
          'Lead intake workflow setup',
          'Response template creation',
          'Follow-up sequence build (calls + email + SMS)',
          'Pipeline tracking and reporting',
          'Enquiry-to-member conversion reporting',
          'Monthly pipeline review',
        ]}
        bestFor="Gyms generating leads but not converting enough into members"
      />
      <CTABar />
    </>
  )
}
