/**
 * CRM HAND-OFF
 * ============
 * Netlify event-triggered function. Netlify invokes a function named
 * `submission-created` for every verified form submission on the site, so this
 * runs after Netlify Forms has stored the lead and after its spam filtering.
 *
 * It forwards the lead to the Freedom Dental Health CRM, using the same
 * endpoint, header, and payload shape as the DCAD site's function, so both
 * practices land in the CRM the same way.
 *
 * Forms handled:
 *   · opening-list  (home page and /opening-list)
 *   · inquiry       (/contact)
 *
 * Environment variables (set in the Netlify dashboard, never in code):
 *   CRM_WEBHOOK_SECRET  value sent as x-webhook-secret to authenticate. It must
 *                       equal the CRM's own WEBHOOK_SECRET.
 *   CRM_LOCATION_ID     the CRM's numeric location id for Smile Studio of Rehoboth.
 *                       The practice must exist under Settings > Locations first.
 *   CRM_WEBHOOK_URL     optional override of the endpoint below.
 *
 * The CRM contract (its WEBHOOKS.md): `first_name` and `location_id` are
 * required; `last_name`, `phone`, `email`, `interest`, and the utm_* fields are
 * optional. Phone is normalised on the CRM side. The CRM always answers 200
 * once the secret is accepted, and returns 401 when it is not.
 *
 * Without either, the function logs and skips. The submission is still in
 * Netlify Forms and still triggers the email notification configured there, so
 * nothing is lost, but it has to be entered in the CRM by hand.
 *
 * Preview and branch deploys post to the same Netlify forms as production. The
 * route handler tags each submission with its deploy context, and anything not
 * from production is skipped here so reviewer tests never become CRM leads.
 */

// Same host the DCAD site posts to. The CRM's docs also name it as
// https://crm.freedomdentalhealth.com; both resolve to the same application.
const CRM_URL = process.env.CRM_WEBHOOK_URL || 'https://fdhscrm.azurewebsites.net/api/leads/webhook'

const LEAD_FORMS = ['opening-list', 'inquiry'] as const
type LeadForm = (typeof LEAD_FORMS)[number]

interface SubmissionPayload {
  form_name?: string
  data?: Record<string, unknown>
}

interface CrmLead {
  first_name: string
  last_name: string
  phone: string
  email: string
  interest: string
}

interface HandlerEvent {
  body: string | null
}

interface HandlerResult {
  statusCode: number
  body: string
}

function text(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function isLeadForm(name: string | undefined): name is LeadForm {
  return LEAD_FORMS.includes(name as LeadForm)
}

/** Opening-list signup. Everything beyond identity goes into `interest`. */
function fromOpeningList(data: Record<string, unknown>): CrmLead {
  const parts = ['Opening list signup']
  if (text(data.serviceInterest)) parts.push(`Interest: ${text(data.serviceInterest)}`)
  if (text(data.preferredContact)) parts.push(`Preferred contact: ${text(data.preferredContact)}`)
  if (text(data.zip)) parts.push(`ZIP: ${text(data.zip)}`)
  if (text(data.consentEmail)) parts.push(`Email consent: ${text(data.consentEmail)}`)
  if (text(data.consentSms)) parts.push(`SMS consent: ${text(data.consentSms)}`)

  return {
    first_name: text(data.firstName),
    last_name: text(data.lastName),
    phone: text(data.phone),
    email: text(data.email),
    interest: parts.join(' | '),
  }
}

/** General inquiry. The category and the message become `interest`. */
function fromInquiry(data: Record<string, unknown>): CrmLead {
  const parts = [`Website inquiry${text(data.category) ? ` (${text(data.category)})` : ''}`]
  if (text(data.message)) parts.push(text(data.message))

  return {
    first_name: text(data.firstName),
    last_name: text(data.lastName),
    phone: text(data.phone),
    email: text(data.email),
    interest: parts.join(' | '),
  }
}

export const handler = async (event: HandlerEvent): Promise<HandlerResult> => {
  // Netlify does not retry this event, but a non-200 shows as a failed
  // invocation. Every early exit returns 200 with a reason in the body so the
  // function log reads as a decision, not an error.
  const skip = (reason: string): HandlerResult => {
    console.info(`[crm] skipped: ${reason}`)
    return { statusCode: 200, body: reason }
  }

  let payload: SubmissionPayload
  try {
    payload = (JSON.parse(event.body ?? '{}') as { payload?: SubmissionPayload }).payload ?? {}
  } catch {
    return skip('unreadable event body')
  }

  if (!isLeadForm(payload.form_name)) return skip(`not a lead form (${payload.form_name ?? 'unknown'})`)

  const data = payload.data ?? {}

  const context = text(data.deployContext) || 'production'
  if (context !== 'production') return skip(`${context} submission, not forwarded`)

  const secret = process.env.CRM_WEBHOOK_SECRET
  if (!secret) return skip('CRM_WEBHOOK_SECRET is not set')

  const locationId = Number(process.env.CRM_LOCATION_ID)
  if (!Number.isInteger(locationId) || locationId <= 0) return skip('CRM_LOCATION_ID is not set')

  const lead = payload.form_name === 'opening-list' ? fromOpeningList(data) : fromInquiry(data)

  try {
    const res = await fetch(CRM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': secret,
      },
      body: JSON.stringify({ ...lead, location_id: locationId }),
      signal: AbortSignal.timeout(10_000),
    })

    // Status only. The CRM's response can echo the visitor's details.
    console.info(`[crm] ${payload.form_name}: CRM responded ${res.status}`)
    if (!res.ok) console.error(`[crm] ${payload.form_name}: CRM rejected the lead with ${res.status}`)
  } catch (error) {
    console.error('[crm] request failed:', error instanceof Error ? error.message : 'unknown error')
  }

  return { statusCode: 200, body: 'OK' }
}
