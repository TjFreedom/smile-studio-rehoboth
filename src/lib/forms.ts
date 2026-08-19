import { z } from 'zod'
import { CONTACT_METHODS, INQUIRY_CATEGORIES, SERVICE_INTERESTS } from './form-options'

// Re-exported so server-side callers can keep importing from one place.
export { SERVICE_INTERESTS, CONTACT_METHODS, INQUIRY_CATEGORIES } from './form-options'
export type { FormResponse } from './form-options'

/**
 * Shared validation schemas.
 * The same schema runs in the browser (for immediate feedback) and on the
 * server (as the authority). Client-side validation is a convenience; the
 * server never trusts it.
 */

const name = z
  .string()
  .trim()
  .min(1, 'Please enter your first name.')
  .max(60, 'Please use 60 characters or fewer.')
  // Reject anything with a URL or angle brackets: a name field containing a
  // link is spam every time.
  .refine((v) => !/https?:|<|>|\[url/i.test(v), 'Please enter a valid name.')

const emailField = z
  .string()
  .trim()
  .min(1, 'Please enter your email address.')
  .max(160)
  .email('Please enter a valid email address, for example name@example.com.')

/** Optional phone. Permissive on format, strict on length. */
const optionalPhone = z
  .string()
  .trim()
  .max(25, 'Please enter a valid phone number.')
  .refine((v) => v === '' || /^[\d\s()+.-]{7,25}$/.test(v), 'Please enter a valid phone number.')
  .optional()
  .default('')

const optionalZip = z
  .string()
  .trim()
  .refine((v) => v === '' || /^\d{5}(-\d{4})?$/.test(v), 'Please enter a 5-digit ZIP code.')
  .optional()
  .default('')

/** Anti-spam fields present on every form. */
const antiSpam = {
  /**
   * Honeypot. A real user never sees or fills this.
   * Deliberately NOT constrained here. If the schema rejected a filled
   * honeypot, the 400 response would name the field and tell a bot exactly
   * which input to leave alone next time. Instead it validates cleanly and the
   * route handler checks it, then returns a generic success without sending
   * anything, so the bot learns nothing.
   */
  website: z.string().max(200).optional().default(''),
  /** Milliseconds the form was on screen before submission. */
  elapsed: z.coerce.number().int().nonnegative().optional().default(0),
}

export const openingListSchema = z.object({
  firstName: name,
  lastName: name.describe('last name'),
  email: emailField,
  phone: optionalPhone,
  preferredContact: z.enum(CONTACT_METHODS).default('Email'),
  serviceInterest: z.enum(SERVICE_INTERESTS).default('I am not sure'),
  zip: optionalZip,
  /** Must be explicitly checked. Never pre-selected in the UI. */
  consentEmail: z.literal(true, {
    errorMap: () => ({ message: 'Please confirm you would like to receive email updates.' }),
  }),
  /** Separate, optional, and distinct from the email consent above. */
  consentSms: z.boolean().optional().default(false),
  ...antiSpam,
})

export const inquirySchema = z.object({
  firstName: name,
  lastName: name.describe('last name'),
  email: emailField,
  phone: optionalPhone,
  category: z.enum(INQUIRY_CATEGORIES).default('General question'),
  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little more, at least 10 characters.')
    .max(3000, 'Please keep your message under 3,000 characters.'),
  ...antiSpam,
})

export type OpeningListInput = z.infer<typeof openingListSchema>
export type InquiryInput = z.infer<typeof inquirySchema>

/** Flattens a ZodError into the field map the forms render. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form')
    if (!out[key]) out[key] = issue.message
  }
  return out
}
