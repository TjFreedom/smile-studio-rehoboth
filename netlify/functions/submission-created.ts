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
 * required; `last_name`, `phone`, `email`, `interest`, `notes`, and the utm_*
 * fields are optional. `interest` is kept to a single clean value because the
 * CRM filters on it to choose an automatic follow-up text. Phone is normalised on the CRM side. The CRM always answers 200
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

const LEAD_FORMS = ['opening-list', 'inquiry', 'appointment-request'] as const

/** Ad attribution fields the CRM accepts verbatim. */
const ATTRIBUTION_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'] as const
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
  /**
   * The visitor's selection, verbatim. The CRM routes follow-up texts on this
   * field, so it must be one clean value and never a composed sentence.
   */
  interest: string
  /** Everything else: free text, consents, preferences. */
  notes: string
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

function identity(data: Record<string, unknown>) {
  return {
    first_name: text(data.firstName),
    last_name: text(data.lastName),
    phone: text(data.phone),
    email: text(data.email),
  }
}

/** Paid-traffic landing page. Interest is one of the CRM's own values. */
function fromAppointmentRequest(data: Record<string, unknown>): CrmLead {
  const notes = ['Appointment request from the landing page']
  if (text(data.message)) notes.push(text(data.message))
  return { ...identity(data), interest: text(data.reason) || 'Other', notes: notes.join(' | ') }
}

/** Opening-list signup. Interest is the service the visitor picked. */
function fromOpeningList(data: Record<string, unknown>): CrmLead {
  const notes = ['Opening list signup']
  if (text(data.preferredContact)) notes.push(`Preferred contact: ${text(data.preferredContact)}`)
  if (text(data.zip)) notes.push(`ZIP: ${text(data.zip)}`)
  if (text(data.consentEmail)) notes.push(`Email consent: ${text(data.consentEmail)}`)
  if (text(data.consentSms)) notes.push(`SMS consent: ${text(data.consentSms)}`)
  return { ...identity(data), interest: text(data.serviceInterest) || 'Other', notes: notes.join(' | ') }
}

/** General inquiry. Interest is the category; the message goes to notes. */
function fromInquiry(data: Record<string, unknown>): CrmLead {
  const notes = ['Website inquiry']
  if (text(data.message)) notes.push(text(data.message))
  return { ...identity(data), interest: text(data.category) || 'Other', notes: notes.join(' | ') }
}

function buildLead(formName: LeadForm, data: Record<string, unknown>): CrmLead {
  switch (formName) {
    case 'opening-list':
      return fromOpeningList(data)
    case 'inquiry':
      return fromInquiry(data)
    case 'appointment-request':
      return fromAppointmentRequest(data)
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

  const lead = buildLead(payload.form_name, data)

  // Campaign attribution, when the form carried it. The CRM records these on
  // the lead and uses gclid for Google Ads conversion matching.
  const attribution: Record<string, string> = {}
  for (const field of ATTRIBUTION_FIELDS) {
    if (text(data[field])) attribution[field] = text(data[field])
  }

  try {
    const res = await fetch(CRM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-webhook-secret': secret,
      },
      body: JSON.stringify({ ...lead, ...attribution, location_id: locationId }),
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
