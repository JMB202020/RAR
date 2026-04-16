'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import {
  FACILITY_TYPES,
  COUNTRIES,
  AD_BUDGETS,
  REFERRAL_SOURCES,
  FORMSPREE_ID,
} from '@/lib/constants'
import { useLocale } from '@/lib/useLocale'
import { localePath } from '@/lib/locales'

const SERVICE_INTERESTS = [
  'Performance (Meta + Google ads)',
  'Lead Nurture & CRM',
  'Local Search & Reputation',
  'Organic Social Media',
  'Out-of-hours phone service',
  'Pre-sale conversion (pre-opening)',
  'Not sure — would like advice',
] as const

interface FormData {
  name: string
  email: string
  business: string
  facilityType: string
  country: string
  budget: string
  services: string[]
  referral: string
  message: string
}

export default function ContactForm() {
  const locale = useLocale()
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setSubmitError('')

    if (!FORMSPREE_ID) {
      console.log('Formspree ID not configured. Form data:', data)
      setSubmitted(true)
      return
    }

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        setSubmitError('Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start">
        <CheckCircle size={48} className="text-brand-primary" />
        <h3 className="mt-6 font-[family-name:var(--font-display)] text-[28px] leading-[1.1] text-brand-primary">
          We&apos;ll be in touch soon.
        </h3>
        <p className="mt-4 text-[17px] leading-[1.75] text-brand-secondary">
          Thanks for reaching out. We&apos;ll get back to you within one business
          day to arrange a call.
        </p>
        <Link
          href={localePath(locale, '/services')}
          className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-brand-primary transition-opacity duration-150 hover:opacity-70"
        >
          <span aria-hidden>&larr;</span> Back to services
        </Link>
      </div>
    )
  }

  const inputClasses =
    'w-full rounded-[6px] border border-[rgba(0,0,0,0.12)] bg-white px-4 py-3 text-[15px] text-brand-primary placeholder:text-brand-tertiary outline-none transition-colors duration-150 focus:border-brand-primary'
  const errorClasses = 'mt-2 text-[13px] text-[#B91C1C]'
  const labelClasses =
    'block text-[14px] font-medium text-brand-primary mb-2'

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
      noValidate
    >
      <div>
        <label className={labelClasses}>Full name *</label>
        <input
          type="text"
          className={inputClasses}
          placeholder="Your full name"
          {...register('name', { required: 'Full name is required' })}
        />
        {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
      </div>

      <div>
        <label className={labelClasses}>Email address *</label>
        <input
          type="email"
          className={inputClasses}
          placeholder="you@example.com"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
          })}
        />
        {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
      </div>

      <div>
        <label className={labelClasses}>Business name *</label>
        <input
          type="text"
          className={inputClasses}
          placeholder="Your gym or studio name"
          {...register('business', { required: 'Business name is required' })}
        />
        {errors.business && (
          <p className={errorClasses}>{errors.business.message}</p>
        )}
      </div>

      <div>
        <label className={labelClasses}>Type of facility *</label>
        <select
          className={inputClasses}
          defaultValue=""
          {...register('facilityType', {
            required: 'Please select a facility type',
          })}
        >
          <option value="" disabled>
            Select facility type
          </option>
          {FACILITY_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.facilityType && (
          <p className={errorClasses}>{errors.facilityType.message}</p>
        )}
      </div>

      <div>
        <label className={labelClasses}>Country *</label>
        <select
          className={inputClasses}
          defaultValue=""
          {...register('country', { required: 'Please select a country' })}
        >
          <option value="" disabled>
            Select country
          </option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className={errorClasses}>{errors.country.message}</p>
        )}
      </div>

      <div>
        <label className={labelClasses}>Monthly ad budget *</label>
        <select
          className={inputClasses}
          defaultValue=""
          {...register('budget', { required: 'Please select a budget range' })}
        >
          <option value="" disabled>
            Select budget range
          </option>
          {AD_BUDGETS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        {errors.budget && (
          <p className={errorClasses}>{errors.budget.message}</p>
        )}
      </div>

      <fieldset>
        <legend className={labelClasses}>What are you interested in?</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {SERVICE_INTERESTS.map((service) => (
            <label
              key={service}
              className="flex items-start gap-3 text-[14px] leading-[1.5] text-brand-secondary"
            >
              <input
                type="checkbox"
                value={service}
                {...register('services')}
                className="mt-0.5 h-4 w-4 shrink-0 accent-brand-primary"
              />
              {service}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className={labelClasses}>How did you hear about us?</label>
        <select className={inputClasses} defaultValue="" {...register('referral')}>
          <option value="" disabled>
            Select an option
          </option>
          {REFERRAL_SOURCES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClasses}>Message</label>
        <textarea
          rows={4}
          className={inputClasses}
          placeholder="Tell us a bit about your gym and what you're looking to achieve. No pressure — this is just context."
          {...register('message')}
        />
      </div>

      {submitError && (
        <p className="text-[14px] text-[#B91C1C]">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-1.5 self-start rounded-[6px] bg-brand-primary px-8 py-3.5 text-[15px] font-medium text-brand-inverse transition-opacity duration-150 hover:opacity-80 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting…' : 'Send enquiry'}{' '}
        <span aria-hidden>&rarr;</span>
      </button>

      <p className="text-[13px] leading-[1.6] text-brand-tertiary">
        * Required. We&apos;ll get back to you within one business day.
      </p>
    </form>
  )
}
