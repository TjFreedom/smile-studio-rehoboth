/**
 * Form option lists and response types.
 *
 * Deliberately kept free of any zod import.
 *
 * The client form component needs these option arrays to render its selects,
 * and `lib/forms.ts` builds its schemas from the same arrays. If both lived in
 * one module, importing the options from a `'use client'` component would drag
 * zod's top-level `z.object(...)` calls into the browser bundle. That measured
 * at 72KB of JavaScript shipped to every visitor for validation that only ever
 * runs on the server.
 *
 * Keep this module dependency free.
 */

export const SERVICE_INTERESTS = [
  'General dentistry',
  'Family dentistry',
  'Cosmetic dentistry',
  'Dental implants',
  'Restorative dentistry',
  'TMJ or facial pain care',
  'Sleep or airway care',
  'Specialty dental care',
  'I am not sure',
] as const

export const CONTACT_METHODS = ['Email', 'Text message', 'Phone call'] as const

export const INQUIRY_CATEGORIES = [
  'General question',
  'Opening date and scheduling',
  'Services',
  'Insurance and payment',
  'Careers',
  'Referring provider',
  'Media or community partnership',
  'Something else',
] as const

/** Paid-traffic landing page: why the visitor wants to come in. */
export const VISIT_REASONS = [
  'New patient exam and cleaning',
  'A specific concern or tooth pain',
  'Cosmetic consultation',
  'Dental implants',
  'Second opinion',
  'Not sure yet',
] as const

/** Paid-traffic landing page: when a call back suits them. */
export const CALL_TIMES = ['Morning', 'Afternoon', 'Either is fine'] as const

/** Shape returned by every form API route. */
export interface FormResponse {
  ok: boolean
  message?: string
  /** Field-level messages keyed by input name. */
  errors?: Record<string, string>
}
