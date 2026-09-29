import { email as practiceEmail, practiceName } from '@/config/practice'

/**
 * OUTBOUND MAIL
 * =============
 * Server-only. Credentials are read from environment variables and never
 * reach the client bundle (no NEXT_PUBLIC_ prefix, and this module is only
 * imported from route handlers).
 *
 * DELIVERABILITY REQUIREMENTS  (see docs/LAUNCH-CHECKLIST.md):
 *   · Send from an authenticated subdomain of the sending domain,
 *     e.g. notifications@mail.rehobothsmiles.com
 *   · SPF, DKIM, and DMARC records published for that domain
 *   · The FROM address is always ours. The visitor's address goes in Reply-To.
 *     Spoofing the visitor as the sender is the fastest route to a spam folder
 *     and a DMARC failure.
 *
 * Provider: Resend by default. To use a different provider, replace `send()`.
 * Everything else in the app talks to `sendNotification()`.
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY
const MAIL_FROM = process.env.MAIL_FROM ?? `${practiceName} <notifications@rehobothsmiles.com>`
const MAIL_TO = process.env.MAIL_TO ?? practiceEmail

export interface NotificationInput {
  subject: string
  /** Ordered label and value pairs rendered into both text and HTML bodies. */
  fields: Array<[string, string]>
  /** Visitor's address, used as Reply-To so staff can respond directly. */
  replyTo?: string
  /** Prefix line explaining what the notification is. */
  intro: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderText({ intro, fields }: NotificationInput): string {
  const rows = fields.map(([label, value]) => `${label}: ${value || 'Not provided'}`).join('\n')
  return `${intro}\n\n${rows}\n\nSent from ${practiceName} website.\n`
}

function renderHtml({ intro, fields }: NotificationInput): string {
  const rows = fields
    .map(
      ([label, value]) => `
      <tr>
        <th align="left" style="padding:8px 16px 8px 0;font:600 13px Arial,Helvetica,sans-serif;color:#0B2859;vertical-align:top;white-space:nowrap;">${escapeHtml(
          label,
        )}</th>
        <td style="padding:8px 0;font:400 14px Arial,Helvetica,sans-serif;color:#1F2933;">${
          escapeHtml(value) || '<span style="color:#7A8899">Not provided</span>'
        }</td>
      </tr>`,
    )
    .join('')

  // Arial throughout. Brand Guide §4: do not attempt a serif headline in email.
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#F4F7FA;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #DBE4EC;border-radius:6px;">
    <tr><td style="padding:24px 24px 8px;border-top:4px solid #0B2859;">
      <p style="margin:0 0 16px;font:400 14px Arial,Helvetica,sans-serif;color:#1F2933;">${escapeHtml(
        intro,
      )}</p>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">${rows}</table>
    </td></tr>
    <tr><td style="padding:16px 24px 24px;">
      <p style="margin:0;font:400 12px Arial,Helvetica,sans-serif;color:#7A8899;">Sent from the ${escapeHtml(
        practiceName,
      )} website.</p>
    </td></tr>
  </table></body></html>`
}

/**
 * Sends the notification. Returns false on failure rather than throwing, so a
 * mail outage surfaces as a handled error to the visitor instead of a 500.
 */
export async function sendNotification(input: NotificationInput): Promise<boolean> {
  const payload = {
    from: MAIL_FROM,
    to: [MAIL_TO],
    subject: input.subject,
    text: renderText(input),
    html: renderHtml(input),
    ...(input.replyTo ? { reply_to: input.replyTo } : {}),
  }

  if (!RESEND_API_KEY) {
    // No provider configured. In production this is not fatal on its own: the
    // route handler also stores every submission in Netlify Forms, which sends
    // its own notifications. Log it so the gap stays visible.
    if (process.env.NODE_ENV === 'production') {
      console.warn('[mailer] RESEND_API_KEY is not set. Email notification skipped.')
      return false
    }
    console.info('[mailer] dev mode, notification not sent:\n', payload.text)
    return true
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    })

    if (!res.ok) {
      // Log the status, never the body: provider errors can echo the payload,
      // and the payload contains a visitor's contact details.
      console.error(`[mailer] provider responded ${res.status}`)
      return false
    }
    return true
  } catch (error) {
    console.error('[mailer] send failed:', error instanceof Error ? error.message : 'unknown error')
    return false
  }
}
