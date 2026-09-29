import { NextResponse } from 'next/server'
import { fieldErrors, openingListSchema, type FormResponse } from '@/lib/forms'
import { clientKey, hit } from '@/lib/rate-limit'
import { sendNotification } from '@/lib/mailer'
import { captureSubmission, deployContext } from '@/lib/netlify-forms'
import { practiceName } from '@/config/practice'

export const runtime = 'nodejs'
/** Never cached. Every submission must reach the handler. */
export const dynamic = 'force-dynamic'

/** Minimum time a genuine visitor takes to complete the form, in ms. */
const MIN_ELAPSED_MS = 2500

export async function POST(request: Request): Promise<NextResponse<FormResponse>> {
  // 1. Rate limit before any parsing work.
  const limit = hit(clientKey(request.headers, 'opening-list'), 5, 10 * 60_000)
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, message: 'Too many submissions. Please try again in a few minutes.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } },
    )
  }

  // 2. Parse.
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Could not read the submission.' }, { status: 400 })
  }

  // 3. Validate on the server. The client's own check is not trusted.
  const parsed = openingListSchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: 'Please check the highlighted fields.', errors: fieldErrors(parsed.error) },
      { status: 400 },
    )
  }

  const data = parsed.data

  // 4. Spam traps. Both respond with a generic success so a bot learns nothing
  //    about why it was rejected, while nothing is actually sent.
  const isBot = data.website !== '' || data.elapsed < MIN_ELAPSED_MS
  if (isBot) {
    return NextResponse.json({ ok: true })
  }

  // 5. Deliver. Two independent channels, run together:
  //      · Netlify Forms, which stores the lead and fires the notifications
  //        configured in the Netlify UI (email, Slack, CRM webhook).
  //      · The Resend email notification, when RESEND_API_KEY is configured.
  //    The visitor only sees an error if BOTH fail.
  const submittedAt = new Date().toISOString()
  const subject = `Opening list signup: ${data.firstName} ${data.lastName}`
  const consentEmail = data.consentEmail ? 'Yes' : 'No'
  const consentSms = data.consentSms ? 'Yes' : 'No'

  const [captured, mailed] = await Promise.all([
    captureSubmission(
      'opening-list',
      {
        subject,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        preferredContact: data.preferredContact,
        serviceInterest: data.serviceInterest,
        zip: data.zip,
        consentEmail,
        consentSms,
        submittedAt,
        deployContext: deployContext(request),
        website: '',
      },
      request,
    ),
    sendNotification({
      subject,
      intro: `A new visitor joined the ${practiceName} opening list.`,
      replyTo: data.email,
      fields: [
        ['Name', `${data.firstName} ${data.lastName}`],
        ['Email', data.email],
        ['Phone', data.phone],
        ['Preferred contact', data.preferredContact],
        ['Service interest', data.serviceInterest],
        ['ZIP code', data.zip],
        ['Email updates consent', consentEmail],
        ['Text message consent', consentSms],
        ['Submitted', submittedAt],
      ],
    }),
  ])

  if (!captured && !mailed) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'We could not submit the form just now. Please email info@rehobothsmiles.com and we will add you to the list.',
      },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}

/** Anything other than POST is not allowed. */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ ok: false, message: 'Method not allowed.' }, { status: 405 })
}
