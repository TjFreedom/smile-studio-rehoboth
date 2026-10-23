import type { Metadata } from 'next'
import { Logo } from '@/components/Logo'
import { CheckIcon } from '@/components/Icons'
import { address, addressLines, email, mailtoUrl, practiceName } from '@/config/practice'

export const metadata: Metadata = {
  title: 'We Will Be in Touch',
  description: 'Thank you for asking to reserve a first appointment at Smile Studio of Rehoboth.',
  robots: { index: false, follow: false },
}

/**
 * Conversion page for the paid-traffic landing page. Reached only by a
 * client-side redirect after a successful submission, so a pageview here is
 * a conversion: point Google Ads at this URL or at the
 * appointment_request_form_submit event.
 */
export default function VisitThankYou() {
  return (
    <>
      <header className="lp-header">
        <div className="container">
          <Logo variant="horizontal" width={220} />
        </div>
      </header>

      <div className="container">
        <div className="notfound">
          <span
            aria-hidden="true"
            style={{
              display: 'grid',
              placeItems: 'center',
              width: 68,
              height: 68,
              borderRadius: '50%',
              background: 'var(--success-bg)',
              color: 'var(--success)',
              marginBottom: 'var(--sp-5)',
            }}
          >
            <CheckIcon size={34} />
          </span>

          <h1>Thank you. We&rsquo;ll be in touch soon.</h1>
          <p className="lede" style={{ marginTop: 'var(--sp-4)', marginInline: 'auto' }}>
            Our new patient concierge will text or call the number you gave us to find a time
            that works and answer any questions.
          </p>
          <p
            style={{
              marginTop: 'var(--sp-4)',
              marginInline: 'auto',
              fontSize: 'var(--fs-small)',
              color: 'var(--mist)',
            }}
          >
            No appointment is scheduled until you have heard from us. If you would rather write,
            email <a href={mailtoUrl}>{email}</a>.
          </p>

          <p
            style={{
              marginTop: 'var(--sp-7)',
              marginInline: 'auto',
              fontSize: 'var(--fs-caption)',
              color: 'var(--mist)',
            }}
          >
            {practiceName} · {addressLines.join(', ')} · {address.complex}
          </p>
        </div>
      </div>
    </>
  )
}
