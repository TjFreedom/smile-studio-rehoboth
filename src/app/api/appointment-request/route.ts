import { NextResponse } from 'next/server'
import { appointmentRequestSchema, fieldErrors, type FormResponse } from '@/lib/forms'
import { clientKey, hit } from '@/lib/rate-limit'
import { sendNotification } from '@/lib/mailer'
import { captureSubmission, deployContext } from '@/lib/netlify-forms'
import { practiceName } from '@/config/practice'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Minimum time a genuine visitor takes to complete the form, in ms. */
const MIN_ELAPSED_MS = 2500

/**
 * Paid-traffic landing page lead. Same pipeline as the other two forms:
 * rate limit, parse, validate, spam traps, then Netlify Forms (which hands the
 * lead to the CRM) and the optional Resend email, together.
 */
export async function POST(request: Request): Promise<NextResponse<FormResponse>> {
  const limit = hit(clientKey(request.headers, 'appointment-request'), 5, 10 * 60_000)
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: 'Too many submissions. Please try again in a few minutes.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    )
  }

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Could not read the submission.' }, { status: 400 })
  }

  const parsed = appointmentRequestSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: 'Please check the highlighted fields.', errors: fieldErrors(parsed.error) },
      { status: 400 },
    )
  }

  const data = parsed.data

  // Spam traps answer with a generic success and send nothing.
  if (data.website !== '' || data.elapsed < MIN_ELAPSED_MS) {
    return NextResponse.json({ ok: true })
  }

  const submittedAt = new Date().toISOString()
  const subject = `Appointment request: ${data.firstName} ${data.lastName}`

  const [captured, mailed] = await Promise.all([
    captureSubmission(
      'appointment-request',
      {
        subject,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        reason: data.reason,
        message: data.message,
        consentContact: 'Yes',
        utm_source: data.utm_source,
        utm_medium: data.utm_medium,
        utm_campaign: data.utm_campaign,
        utm_term: data.utm_term,
        utm_content: data.utm_content,
        gclid: data.gclid,
        landingPage: data.landingPage,
        submittedAt,
        deployContext: deployContext(request),
        website: '',
      },
      request,
    ),
    sendNotification({
      subject,
      intro: `A visitor asked to reserve a first appointment through the ${practiceName} landing page.`,
      replyTo: data.email || undefined,
      fields: [
        ['Name', `${data.firstName} ${data.lastName}`],
        ['Mobile phone', data.phone],
        ['Email', data.email],
        ['Interest', data.reason],
        ['Note', data.message],
        ['Campaign', [data.utm_source, data.utm_medium, data.utm_campaign].filter(Boolean).join(' / ')],
        ['Submitted', submittedAt],
      ],
    }),
  ])

  if (!captured && !mailed) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'We could not submit the form just now. Please email info@rehobothsmiles.com and we will reach out to schedule.',
      },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ ok: false, message: 'Method not allowed.' }, { status: 405 })
}
