import Link from 'next/link'
import { Logo } from './Logo'
import { WaveRule } from './Ui'
import { actionIcons, MailIcon, PinIcon, ClockIcon } from './Icons'
import { footerNav, legalNav } from '@/content/navigation'
import {
  address,
  addressLines,
  affiliationLabel,
  anticipatedOpening,
  announcement,
  cta,
  email,
  externalLinks,
  features,
  hoursLabel,
  hoursSummary,
  isPreOpening,
  mailtoUrl,
  parentOrganization,
  parentOrganizationUrl,
  phoneNumber,
  practiceName,
  showPhoneNumber,
} from '@/config/practice'

/* ------------------------------------------------------------------ *
 * ANNOUNCEMENT BAR
 * ------------------------------------------------------------------ */

export function AnnouncementBar() {
  if (!isPreOpening) return null

  return (
    <div className="announce">
      <div className="container announce__inner">
        <p className="announce__text">
          <strong>{announcement.lead}</strong>
          <span className="announce__sep" aria-hidden="true" />
          <span>{announcement.detail}</span>
        </p>
        <Link href={announcement.linkHref} className="announce__link">
          {announcement.linkLabel}
        </Link>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * MOBILE ACTION BAR
 * ------------------------------------------------------------------ *
 * Fixed to the bottom of the viewport under 900px. Pre-opening it offers
 * Opening Updates, Email, and Directions. It never renders a call action
 * while no phone number exists.
 */

export function MobileActionBar() {
  return (
    <nav className="mobile-bar" aria-label="Quick actions">
      {cta.mobileBar.map((action) => {
        const Icon = actionIcons[action.icon]
        const isExternal = action.href.startsWith('mailto:') || action.href.startsWith('tel:')
        const event =
          action.icon === 'mail'
            ? 'email_click'
            : action.icon === 'pin'
              ? 'directions_click'
              : undefined

        const content = (
          <>
            <Icon size={21} />
            <span>{action.label}</span>
          </>
        )

        return isExternal ? (
          <a key={action.label} href={action.href} className="mobile-bar__item" data-event={event}>
            {content}
          </a>
        ) : (
          <Link key={action.label} href={action.href} className="mobile-bar__item" data-event={event}>
            {content}
          </Link>
        )
      })}
    </nav>
  )
}

/* ------------------------------------------------------------------ *
 * FOOTER
 * ------------------------------------------------------------------ */

export function Footer() {
  const year = new Date().getFullYear()
  const socials = [
    externalLinks.facebook ? { label: 'Facebook', href: externalLinks.facebook } : null,
    externalLinks.instagram ? { label: 'Instagram', href: externalLinks.instagram } : null,
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <footer className="site-footer">
      <WaveRule className="site-footer__wave" />

      <div className="container">
        <div className="site-footer__top">
          {/* Identity */}
          <div className="site-footer__brand">
            <Logo variant="horizontal-reversed" width={250} decorative />
            <p className="site-footer__affiliation">{affiliationLabel}</p>
            <p className="site-footer__blurb">
              Modern dentistry coming to Rehoboth Beach, Delaware. Serving Rehoboth Beach, Dewey
              Beach, Lewes, and Sussex County.
            </p>
            {socials.length > 0 && features.enableSocialLinks ? (
              <ul className="site-footer__social list-clean">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Link columns */}
          {footerNav.map((col) => (
            <nav key={col.heading} className="site-footer__col" aria-label={col.heading}>
              <h2 className="site-footer__heading">{col.heading}</h2>
              <ul className="list-clean">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Visit block */}
          <div className="site-footer__col site-footer__visit">
            <h2 className="site-footer__heading">Visit and Contact</h2>

            <div className="site-footer__fact">
              <PinIcon size={18} />
              <address>
                {addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
                <span className="site-footer__muted">{address.complex}</span>
              </address>
            </div>

            <div className="site-footer__fact">
              <MailIcon size={18} />
              <a href={mailtoUrl} data-event="email_click">
                {email}
              </a>
            </div>

            {/* Phone renders only when a real number is configured. */}
            {showPhoneNumber && phoneNumber ? (
              <div className="site-footer__fact">
                <a href={`tel:${phoneNumber}`} data-event="click_to_call">
                  {phoneNumber}
                </a>
              </div>
            ) : null}

            <div className="site-footer__fact">
              <ClockIcon size={18} />
              <div>
                <span className="site-footer__factLabel">{hoursLabel}</span>
                <span>{hoursSummary}</span>
              </div>
            </div>

            {isPreOpening ? (
              <p className="site-footer__status">
                Anticipated opening in {anticipatedOpening}.
              </p>
            ) : null}
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copy">
            &copy; {year} {practiceName}. All rights reserved.{' '}
            <a href={parentOrganizationUrl} target="_blank" rel="noopener noreferrer" data-event="freedom_dental_health_click">
              {parentOrganization}
            </a>
            .
          </p>
          <nav aria-label="Legal">
            <ul className="site-footer__legal list-clean">
              {legalNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="site-footer__disclaimer">
          The information on this website is for general education and does not constitute dental or
          medical advice, and it does not create a provider and patient relationship. {practiceName}{' '}
          is not yet open for patient care. If you are experiencing a life-threatening emergency,
          call 911.
        </p>
      </div>
    </footer>
  )
}
