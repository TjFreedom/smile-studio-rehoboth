import type { Metadata } from 'next'
import { Button } from '@/components/Ui'
import { CheckIcon } from '@/components/Icons'
import { email, mailtoUrl } from '@/config/practice'

export const metadata: Metadata = {
  title: 'Message Received',
  description: 'Thank you for contacting Smile Studio of Rehoboth.',
  robots: { index: false, follow: false },
}

export default function ThankYouInquiry() {
  return (
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

        <h1>Thank you, we have your message</h1>
        {/* No response-time promise is made. No internal service standard has
            been confirmed, and a promise we cannot keep is worse than none. */}
        <p className="lede" style={{ marginTop: 'var(--sp-4)', marginInline: 'auto' }}>
          A member of our team will read it and reply by email. If your question is time-sensitive,
          please say so in a follow-up and we will prioritize it.
        </p>
        <p style={{ marginTop: 'var(--sp-4)', marginInline: 'auto', fontSize: 'var(--fs-small)', color: 'var(--mist)' }}>
          This form is not monitored for emergencies. If you are experiencing a life-threatening
          emergency, call 911. For an urgent dental concern, contact an established dental provider
          or an appropriate emergency service.
        </p>

        <div className="btn-row" style={{ justifyContent: 'center', marginTop: 'var(--sp-7)' }}>
          <Button href="/opening-list" variant="primary">Join the Opening List</Button>
          <Button href="/" variant="outline">Return Home</Button>
        </div>

        <p style={{ marginTop: 'var(--sp-7)', fontSize: 'var(--fs-caption)', color: 'var(--mist)', marginInline: 'auto' }}>
          You can also reach us any time at{' '}
          <a href={mailtoUrl} data-event="email_click">{email}</a>.
        </p>
      </div>
    </div>
  )
}
