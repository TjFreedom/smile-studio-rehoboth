import { siteUrl } from '@/config/practice'

/**
 * NETLIFY FORMS CAPTURE
 * =====================
 * Server-only. Forwards a validated submission to Netlify Forms so that it
 * shows up in the Netlify dashboard and triggers whatever notifications are
 * configured there (email, Slack, and the outgoing webhook that feeds the CRM).
 *
 * Why forward from the server rather than post from the browser:
 *   · The route handler stays the single gate. Rate limiting, zod validation,
 *     the honeypot, and the timing trap all run before anything is stored.
 *   · Netlify Forms works even when no mail provider is configured, so a
 *     missing RESEND_API_KEY no longer loses the lead.
 *
 * How it works: Netlify only registers forms it finds in static HTML at deploy
 * time, so `public/__forms.html` declares each form and its field names. A
 * URL-encoded POST to that path with `form-name=<name>` is accepted by
 * Netlify's form handling before the request reaches the Next.js server.
 * See https://docs.netlify.com/manage/forms/setup/#forms-for-next-js-or-ssr-frameworks
 *
 * Any field not declared in `public/__forms.html` is dropped by Netlify.
 */

const FORMS_PATH = '/__forms.html'

export type NetlifyFormName = 'opening-list' | 'inquiry'

const productionHost = new URL(siteUrl).host

/**
 * The host that received the submission. On Netlify this is the production
 * domain or a deploy-preview host, and posting back to it reaches that same
 * deploy's form handling. Does not depend on any Netlify runtime variable.
 */
function requestHost(request: Request): string | null {
  const forwarded = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim()
  return forwarded || request.headers.get('host') || null
}

function captureOrigin(request: Request): string | null {
  // Nothing captures locally. Development logs the payload instead.
  if (process.env.NODE_ENV !== 'production') return null
  if (process.env.URL) return process.env.URL
  const host = requestHost(request)
  return host ? `https://${host}` : siteUrl
}

/**
 * Deploy context, so a preview submission is distinguishable from a real lead.
 * Uses Netlify's CONTEXT when present and falls back to the receiving host.
 */
export function deployContext(request: Request): string {
  if (process.env.CONTEXT) return process.env.CONTEXT
  if (process.env.NODE_ENV !== 'production') return 'local'
  const host = requestHost(request)
  return !host || host === productionHost ? 'production' : host
}

/**
 * Stores the submission in Netlify Forms. Returns false on failure rather than
 * throwing, so the route handler can decide what to tell the visitor.
 */
export async function captureSubmission(
  formName: NetlifyFormName,
  fields: Record<string, string>,
  request: Request,
): Promise<boolean> {
  const origin = captureOrigin(request)

  if (!origin) {
    console.info(`[netlify-forms] local dev, "${formName}" not captured:\n`, fields)
    return false
  }

  const body = new URLSearchParams({ 'form-name': formName, ...fields })

  try {
    const res = await fetch(`${origin}${FORMS_PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // Forwarded so Netlify's spam filtering sees the visitor's client, not
        // a bare server-side request.
        ...(request.headers.get('user-agent')
          ? { 'User-Agent': request.headers.get('user-agent') as string }
          : {}),
      },
      body: body.toString(),
      // Netlify answers a captured submission with its success page, which may
      // be a redirect. Do not follow it: a 3xx is a success here.
      redirect: 'manual',
      signal: AbortSignal.timeout(10_000),
    })

    if (res.status >= 200 && res.status < 400) return true

    // Log the status only. The response body can echo the visitor's details.
    console.error(`[netlify-forms] capture of "${formName}" at ${origin} responded ${res.status}`)
    return false
  } catch (error) {
    console.error(
      `[netlify-forms] capture of "${formName}" failed:`,
      error instanceof Error ? error.message : 'unknown error',
    )
    return false
  }
}
