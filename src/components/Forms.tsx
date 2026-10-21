'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { trackEvent, trackLead } from './Analytics'
// Imported from form-options, NOT from lib/forms: the latter pulls in zod,
// which would then ship to the browser for no reason. See lib/form-options.ts.
import {
  CONTACT_METHODS,
  INQUIRY_CATEGORIES,
  SERVICE_INTERESTS,
  type FormResponse,
} from '@/lib/form-options'
import { email as practiceEmail, mailtoUrl } from '@/config/practice'

/* ------------------------------------------------------------------ *
 * SHARED FIELD PRIMITIVES
 * ------------------------------------------------------------------ */

export function Field({
  name,
  label,
  type = 'text',
  required = false,
  autoComplete,
  hint,
  error,
  inputMode,
}: {
  name: string
  label: string
  type?: string
  required?: boolean
  autoComplete?: string
  hint?: string
  error?: string
  inputMode?: 'text' | 'email' | 'tel' | 'numeric'
}) {
  const hintId = hint ? `${name}-hint` : undefined
  const errorId = error ? `${name}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="field">
      <label htmlFor={name}>
        {label}
        {required ? (
          <>
            <span className="req" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : (
          <span className="hint"> (optional)</span>
        )}
      </label>
      {hint ? (
        <span className="hint" id={hintId}>
          {hint}
        </span>
      ) : null}
      <input
        className="input"
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
      {error ? (
        <span className="field-error" id={errorId}>
          {error}
        </span>
      ) : null}
    </div>
  )
}

export function SelectField({
  name,
  label,
  options,
  defaultValue,
  error,
  hint,
}: {
  name: string
  label: string
  options: readonly string[]
  defaultValue?: string
  error?: string
  hint?: string
}) {
  const hintId = hint ? `${name}-hint` : undefined
  const errorId = error ? `${name}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {hint ? (
        <span className="hint" id={hintId}>
          {hint}
        </span>
      ) : null}
      <select
        className="select"
        id={name}
        name={name}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error ? (
        <span className="field-error" id={errorId}>
          {error}
        </span>
      ) : null}
    </div>
  )
}

/** Honeypot plus timing trap. Hidden from sighted users and screen readers. */
export function SpamTraps({ startedAt }: { startedAt: React.RefObject<number> }) {
  return (
    <div className="hp-field" aria-hidden="true">
      <label htmlFor="website">Leave this field blank</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      <input type="hidden" name="elapsed" value={String(startedAt.current)} readOnly />
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * SUBMISSION HOOK
 * ------------------------------------------------------------------ */

type Status = 'idle' | 'submitting' | 'error'

export function useFormSubmit(
  endpoint: string,
  redirectTo: string,
  eventPrefix: string,
  /** Extra fields merged into the payload at submit time, e.g. ad attribution. */
  extraPayload?: () => Record<string, unknown>,
) {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState<string>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  // Stamped after mount rather than during render, so the value reflects when
  // the visitor could first see the form and render stays pure.
  const mountedAt = useRef(0)
  const started = useRef(false)

  useEffect(() => {
    mountedAt.current = Date.now()
  }, [])

  /** Fires the *_form_start event once, on first interaction. */
  function onFirstInteraction() {
    if (started.current) return
    started.current = true
    trackEvent(`${eventPrefix}_form_start`)
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setMessage('')
    setErrors({})

    const form = e.currentTarget
    const fd = new FormData(form)
    const payload: Record<string, unknown> = Object.fromEntries(fd.entries())
    payload.elapsed = Date.now() - mountedAt.current
    // Checkboxes arrive as 'on' or not at all. Send every one as a boolean so
    // the server schema can require, default, or ignore it explicitly.
    for (const box of form.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')) {
      payload[box.name] = box.checked
    }
    if (extraPayload) Object.assign(payload, extraPayload())

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data: FormResponse = await res.json()

      if (data.ok) {
        trackEvent(`${eventPrefix}_form_submit`)
        /**
         * Opinly conversion. This site sells nothing, so `generate_lead` is the
         * event that matters rather than `purchase`. One call here covers all
         * three forms, because they all submit through this hook.
         *
         * Only the form name is sent. No email, no name, no phone: the people
         * filling these in are prospective dental patients, and what they typed
         * is not analytics data.
         */
        trackLead('generate_lead', { form: eventPrefix })
        router.push(redirectTo)
        return
      }

      setStatus('error')
      setErrors(data.errors ?? {})
      setMessage(data.message ?? 'Something went wrong. Please try again.')
    } catch {
      setStatus('error')
      setMessage(
        `We could not reach the server. Please check your connection, or email ${practiceEmail}.`,
      )
    }
  }

  return { status, message, errors, onSubmit, onFirstInteraction, mountedAt }
}

/* ------------------------------------------------------------------ *
 * OPENING LIST FORM
 * ------------------------------------------------------------------ */

export function OpeningListForm() {
  const { status, message, errors, onSubmit, onFirstInteraction } = useFormSubmit(
    '/api/opening-list',
    '/thank-you/opening-list',
    'opening_list',
  )
  const elapsed = useRef(0)

  return (
    <form className="form" onSubmit={onSubmit} onFocusCapture={onFirstInteraction} noValidate>
      {/* Status region. Polite, so it does not interrupt a screen reader
          mid-sentence, and it is announced whenever the message changes. */}
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
          name="email"
          label="Email address"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          error={errors.email}
        />
        <Field
          name="phone"
          label="Mobile phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          hint="Only needed if you would like text updates."
          error={errors.phone}
        />
      </div>

      <div className="form__grid">
        <SelectField
          name="preferredContact"
          label="Preferred contact method"
          options={CONTACT_METHODS}
          defaultValue="Email"
          error={errors.preferredContact}
        />
        <Field
          name="zip"
          label="ZIP code"
          inputMode="numeric"
          autoComplete="postal-code"
          error={errors.zip}
        />
      </div>

      <SelectField
        name="serviceInterest"
        label="What are you most interested in?"
        options={SERVICE_INTERESTS}
        defaultValue="I am not sure"
        hint="This tells us what to prioritize in our updates. It does not confirm that a service will be offered, and it is not a request for treatment."
        error={errors.serviceInterest}
      />

      <fieldset className="fieldset form__consent">
        <legend className="fieldset-legend">Your permissions</legend>

        {/* Neither box is pre-selected. */}
        <div className="checkbox-row">
          <input
            type="checkbox"
            id="consentEmail"
            name="consentEmail"
            aria-describedby={errors.consentEmail ? 'consentEmail-error' : undefined}
            aria-invalid={errors.consentEmail ? true : undefined}
          />
          <label htmlFor="consentEmail">
            Yes, email me opening updates from Smile Studio of Rehoboth, including the confirmed
            opening date, provider introductions, and early scheduling information. You can
            unsubscribe from any email. <span className="req" aria-hidden="true">*</span>
            <span className="sr-only">(required)</span>
          </label>
        </div>
        {errors.consentEmail ? (
          <span className="field-error" id="consentEmail-error">
            {errors.consentEmail}
          </span>
        ) : null}

        <div className="checkbox-row">
          <input type="checkbox" id="consentSms" name="consentSms" />
          <label htmlFor="consentSms">
            Optional: also text me at the mobile number above. Message and data rates may apply,
            message frequency varies, and you can reply STOP at any time to opt out.
          </label>
        </div>

        <p className="form__legal">
          We use your details to send the updates you asked for and to contact you about the
          practice opening. We do not sell your information. Please do not include private medical,
          dental, insurance, or financial information in this form. See our{' '}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </fieldset>

      <SpamTraps startedAt={elapsed} />

      <div>
        <button type="submit" className="btn btn--lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Adding you to the list...' : 'Join the Opening List'}
        </button>
      </div>
    </form>
  )
}

/* ------------------------------------------------------------------ *
 * GENERAL INQUIRY FORM
 * ------------------------------------------------------------------ */

export function InquiryForm() {
  const { status, message, errors, onSubmit, onFirstInteraction } = useFormSubmit(
    '/api/inquiry',
    '/thank-you/inquiry',
    'general_inquiry',
  )
  const elapsed = useRef(0)

  return (
    <form className="form" onSubmit={onSubmit} onFocusCapture={onFirstInteraction} noValidate>
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
          name="email"
          label="Email address"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          error={errors.email}
        />
        <Field
          name="phone"
          label="Phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          error={errors.phone}
        />
      </div>

      <SelectField
        name="category"
        label="What is your question about?"
        options={INQUIRY_CATEGORIES}
        defaultValue="General question"
        error={errors.category}
      />

      <div className="field">
        <label htmlFor="message">
          Message
          <span className="req" aria-hidden="true">
            *
          </span>
          <span className="sr-only"> (required)</span>
        </label>
        <span className="hint" id="message-hint">
          Please do not include private medical, dental, insurance, or financial information in this
          form.
        </span>
        <textarea
          className="textarea"
          id="message"
          name="message"
          required
          rows={6}
          aria-describedby={
            errors.message ? 'message-hint message-error' : 'message-hint'
          }
          aria-invalid={errors.message ? true : undefined}
        />
        {errors.message ? (
          <span className="field-error" id="message-error">
            {errors.message}
          </span>
        ) : null}
      </div>

      <p className="form__legal">
        This form is not a secure channel for protected health information and it is not monitored
        for emergencies. If you are experiencing a life-threatening emergency, call 911. You can
        also email us directly at <a href={mailtoUrl}>{practiceEmail}</a>.
      </p>

      <SpamTraps startedAt={elapsed} />

      <div>
        <button type="submit" className="btn btn--lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Send Your Message'}
        </button>
      </div>
    </form>
  )
}
