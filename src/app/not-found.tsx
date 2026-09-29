import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/Ui'
import { cta, mailtoUrl, email } from '@/config/practice'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you were looking for could not be found.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="container">
      <div className="notfound">
        <span className="notfound__code" aria-hidden="true">
          404
        </span>
        <h1>We could not find that page</h1>
        <p className="lede" style={{ marginTop: 'var(--sp-4)', marginInline: 'auto' }}>
          The page may have moved, or the link may have a typo in it. Here are a few places that
          might have what you were looking for.
        </p>

        <div className="btn-row" style={{ justifyContent: 'center', marginTop: 'var(--sp-7)' }}>
          <Button href="/">Return Home</Button>
          <Button href={cta.primaryHref} variant="outline">
            {cta.primaryLabel}
          </Button>
        </div>

        <nav aria-label="Helpful links" style={{ marginTop: 'var(--sp-8)' }}>
          <ul
            className="list-clean"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--sp-3) var(--sp-6)',
              justifyContent: 'center',
              fontSize: 'var(--fs-small)',
            }}
          >
            <li>
              <Link href="/services">Planned Services</Link>
            </li>
            <li>
              <Link href="/our-new-office">Our New Office</Link>
            </li>
            <li>
              <Link href="/new-patients">New Patients</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/site-map">Site Map</Link>
            </li>
          </ul>
        </nav>

        <p style={{ marginTop: 'var(--sp-7)', fontSize: 'var(--fs-caption)', color: 'var(--mist)', marginInline: 'auto' }}>
          Still stuck? Email us at{' '}
          <a href={mailtoUrl} data-event="email_click">
            {email}
          </a>
          .
        </p>
      </div>
    </div>
  )
}
