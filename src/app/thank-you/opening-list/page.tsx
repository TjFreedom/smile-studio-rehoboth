import type { Metadata } from 'next'
import { Button } from '@/components/Ui'
import { CheckIcon } from '@/components/Icons'
import { email, mailtoUrl, practiceName } from '@/config/practice'

export const metadata: Metadata = {
  title: 'You Are on the Opening List',
  description: 'Thank you for joining the Smile Studio of Rehoboth opening list.',
  // Thank-you pages are excluded from the index and from the sitemap.
  robots: { index: false, follow: false },
}

export default function ThankYouOpeningList() {
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

        <h1>You&rsquo;re on the list</h1>
        <p className="lede" style={{ marginTop: 'var(--sp-4)', marginInline: 'auto' }}>
          We&rsquo;ll share the confirmed opening date, provider announcements, and early scheduling
          information as they become available.
        </p>
        <p style={{ marginTop: 'var(--sp-4)', marginInline: 'auto', fontSize: 'var(--fs-small)', color: 'var(--mist)' }}>
          Nothing else is needed from you today. {practiceName} is not open yet, and no appointment
          has been scheduled.
        </p>

        <div className="btn-row" style={{ justifyContent: 'center', marginTop: 'var(--sp-7)' }}>
          <Button href="/our-new-office/construction-updates" variant="primary">
            Follow Construction Progress
          </Button>
          <Button href="/services" variant="outline">
            Explore Planned Services
          </Button>
        </div>

        <p style={{ marginTop: 'var(--sp-7)', fontSize: 'var(--fs-caption)', color: 'var(--mist)', marginInline: 'auto' }}>
          Questions in the meantime? Email{' '}
          <a href={mailtoUrl} data-event="email_click">{email}</a>.
        </p>
      </div>
    </div>
  )
}
