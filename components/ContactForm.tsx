'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { FACILITY_TYPES, COUNTRIES, AD_BUDGETS, REFERRAL_SOURCES, FORMSPREE_ID } from '@/lib/constants'

interface FormData {
  name: string
  email: string
  business: string
  facilityType: string
  country: string
  budget: string
  referral: string
  message: string
}

export default function ContactForm() {
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
        <CheckCircle size={48} className="text-brand-accent" />
        <h3 className="mt-6 font-[family-name:var(--font-display)] text-[32px] leading-[1.1] text-brand-primary">
          We&apos;ll be in touch <em className="italic text-brand-accent">soon.</em>
        </h3>
        <p className="mt-4 text-[16px] leading-[1.7] text-brand-secondary">
          Thanks for reaching out. We&apos;ll get back to you within one business
          day to arrange a call.
        </p>
        <p className="mt-3 text-[14px] text-brand-tertiary">
          In the meantime, feel free to browse our services.
        </p>
        <Link
          href="/services"
          className="group mt-8 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-brand-secondary"
        >
          <span className="text-brand-accent transition-transform duration-200 group-hover:-translate-x-0.5">
            &#x2196;
          </span>
          <span className="link-underline">Back to services</span>
        </Link>
      </div>
    )
  }

  const inputClasses =
    'w-full appearance-none border border-[var(--color-border-medium)] bg-brand-bg-secondary px-4 py-3.5 text-[15px] text-brand-primary placeholder:text-brand-tertiary outline-none transition-colors duration-150 focus:border-brand-accent focus:bg-brand-bg-elevated'
  const errorClasses = 'mt-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-[#FF6E6E]'
  const labelClasses = 'block font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-[0.18em] text-brand-tertiary mb-2.5'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7" noValidate>
      <div>
        <label className={labelClasses}>
          <span className="text-brand-accent">/01</span> &nbsp; Full name *
        </label>
        <input
          type="text"
          className={inputClasses}
          placeholder="Your full name"
          {...register('name', { required: 'Full name is required' })}
        />
        {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
      </div>

      <div>
        <label className={labelClasses}>
          <span className="text-brand-accent">/02</span> &nbsp; Email address *
        </label>
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
        <label className={labelClasses}>
          <span className="text-brand-accent">/03</span> &nbsp; Business name *
        </label>
        <input
          type="text"
          className={inputClasses}
          placeholder="Your gym or studio name"
          {...register('business', { required: 'Business name is required' })}
        />
        {errors.business && <p className={errorClasses}>{errors.business.message}</p>}
      </div>

      <div>
        <label className={labelClasses}>
          <span className="text-brand-accent">/04</span> &nbsp; Type of facility *
        </label>
        <select
          className={inputClasses}
          defaultValue=""
          {...register('facilityType', { required: 'Please select a facility type' })}
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
        <label className={labelClasses}>
          <span className="text-brand-accent">/05</span> &nbsp; Country *
        </label>
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
        {errors.country && <p className={errorClasses}>{errors.country.message}</p>}
      </div>

      <div>
        <label className={labelClasses}>
          <span className="text-brand-accent">/06</span> &nbsp; Monthly ad budget *
        </label>
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
        {errors.budget && <p className={errorClasses}>{errors.budget.message}</p>}
      </div>

      <div>
        <label className={labelClasses}>
          <span className="text-brand-accent">/07</span> &nbsp; How did you hear about us?
        </label>
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
        <label className={labelClasses}>
          <span className="text-brand-accent">/08</span> &nbsp; Message
        </label>
        <textarea
          rows={4}
          className={inputClasses}
          placeholder="Tell us a bit about your gym and what you're looking to achieve. No pressure — this is just context."
          {...register('message')}
        />
      </div>

      {submitError && (
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-[#FF6E6E]">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="group mt-2 inline-flex items-center justify-center gap-2 self-start bg-brand-accent px-8 py-4 font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.16em] text-brand-accent-text transition-all duration-200 hover:bg-[#E5FF40] disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting…' : 'Book a discovery call'}
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
          &#x2198;
        </span>
      </button>

      <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-brand-tertiary">
        <span className="live-dot mr-2" /> No hard sell. Replies within 1 business day.
      </p>
    </form>
  )
}
