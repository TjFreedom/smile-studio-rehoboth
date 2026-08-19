import { NextResponse } from 'next/server'
import { fieldErrors, inquirySchema, type FormResponse } from '@/lib/forms'
import { clientKey, hit } from '@/lib/rate-limit'
import { sendNotification } from '@/lib/mailer'
import { practiceName } from '@/config/practice'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MIN_ELAPSED_MS = 3000

export async function POST(request: Request): Promise<NextResponse<FormResponse>> {
  const limit = hit(clientKey(request.headers, 'inquiry'), 4, 10 * 60_000)
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

  const parsed = inquirySchema.safeParse(raw)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: 'Please check the highlighted fields.', errors: fieldErrors(parsed.error) },
      { status: 400 },
    )
  }

  const data = parsed.data

  if (data.website !== '' || data.elapsed < MIN_ELAPSED_MS) {
    return NextResponse.json({ ok: true })
  }

  const sent = await sendNotification({
    subject: `Website inquiry (${data.category}): ${data.firstName} ${data.lastName}`,
    intro: `A visitor submitted a general inquiry through the ${practiceName} website.`,
    replyTo: data.email,
    fields: [
      ['Name', `${data.firstName} ${data.lastName}`],
      ['Email', data.email],
      ['Phone', data.phone],
      ['Category', data.category],
      ['Message', data.message],
      ['Submitted', new Date().toISOString()],
    ],
  })

  if (!sent) {
    return NextResponse.json(
      {
        ok: false,
        message:
          'We could not submit the form just now. Please email info@rehobothsmiles.com directly and we will reply.',
      },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ ok: false, message: 'Method not allowed.' }, { status: 405 })
}
