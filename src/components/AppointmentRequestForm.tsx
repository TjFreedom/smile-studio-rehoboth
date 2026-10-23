'use client'

import { useRef } from 'react'
import { Field, SelectField, SpamTraps, useFormSubmit } from './Forms'
import { VISIT_REASONS } from '@/lib/form-options'
import { practiceName } from '@/config/practice'

/** Query parameters carried from the ad click into the lead. */
const ATTRIBUTION_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
] as const

/**
 * Ad attribution, read from the landing URL at submit time so the CRM can tie
 * the lead back to the campaign. Read late rather than at mount so nothing
 * here depends on effects or state.
 */
function readAttribution(): Record<string, string> {
  const params = new URLSearchParams(window.location.search)
  const found: Record<string, string> = {}
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key)
    if (value) found[key] = value.slice(0, 200)
  }
  found.landingPage = `${window.location.pathname}${window.location.search}`.slice(0, 200)
  return found
}

/**
 * Lead form for the paid-traffic landing page.
 *
 * The follow-up is a phone call to schedule, so the mobile number and an
 * explicit contact consent are required; email is optional.
 */
export function AppointmentRequestForm() {
  const { status, message, errors, onSubmit, onFirstInteraction } = useFormSubmit(
    '/api/appointment-request',
    '/visit/thank-you',
    'appointment_request',
    readAttribution,
    true,
  )
  const elapsed = useRef(0)

  return (
    <form
      className="form"
      id="request"
      onSubmit={onSubmit}
      onFocusCapture={onFirstInteraction}
      noValidate
    >
      <div role="status" aria-live="polite">
        {status === 'error' && message ? (
          <p className="form-status form-status--error">{message}</p>
        ) : null}
      </div>

      <div className="form__grid">
        <Field
          name="firstName"
          label="First name"
          required
          autoComplete="given-name"
          error={errors.firstName}
        />
        <Field
          name="lastName"
          label="Last name"
          required
          autoComplete="family-name"
          error={errors.lastName}
        />
      </div>

      <div className="form__grid">
        <Field
          name="phone"
          label="Mobile phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          hint="Our new patient concierge will text or call this number."
          error={errors.phone}
        />
        <Field
          name="email"
          label="Email address"
          type="email"
          inputMode="email"
          autoComplete="email"
          error={errors.email}
        />
      </div>

      <SelectField
        name="reason"
        label="What are you interested in?"
        options={VISIT_REASONS}
        defaultValue="New Patient Exam"
        error={errors.reason}
      />

      <div className="field">
        <label htmlFor="message">
          Anything we should know? <span className="hint">(optional)</span>
        </label>
        <span className="hint" id="message-hint">
          Please do not include private medical, dental, insurance, or financial information.
        </span>
        <textarea
          className="textarea"
          id="message"
          name="message"
          rows={3}
          aria-describedby={errors.message ? 'message-hint message-error' : 'message-hint'}
          aria-invalid={errors.message ? true : undefined}
        />
        {errors.message ? (
          <span className="field-error" id="message-error">
            {errors.message}
          </span>
        ) : null}
      </div>

      <fieldset className="fieldset form__consent">
        <legend className="fieldset-legend">Your permission</legend>
        {/* Not pre-selected. */}
        <div className="checkbox-row">
          <input
            type="checkbox"
            id="consentContact"
            name="consentContact"
            aria-describedby={errors.consentContact ? 'consentContact-error' : undefined}
            aria-invalid={errors.consentContact ? true : undefined}
          />
          <label htmlFor="consentContact">
            Yes, {practiceName} may contact me by phone, text, or email about scheduling my
            appointment. Message and data rates may apply, and I can reply STOP to any text to opt
            out. <span className="req" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
        </div>
        {errors.consentContact ? (
          <span className="field-error" id="consentContact-error">
            {errors.consentContact}
          </span>
        ) : null}
        <p className="form__legal">
          We use your details only to schedule and prepare for your visit. We do not sell your
          information. See our <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </fieldset>

      <SpamTraps startedAt={elapsed} />

      <div>
        <button type="submit" className="btn btn--lg btn--full" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Reserve My Appointment'}
        </button>
      </div>
    </form>
  )
}
