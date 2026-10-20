import Link from 'next/link'
import {
  BuildingIcon,
  CalendarIcon,
  ChevronIcon,
  ClockIcon,
  MailIcon,
  PinIcon,
  serviceIcons,
} from './Icons'
import { Button, WaveRule } from './Ui'
import type { Faq } from '@/content/faqs'
import type { Milestone } from '@/content/construction'
import { milestones } from '@/content/construction'
import { services, tierLabel, type ServiceCategory } from '@/content/services'
import {
  address,
  addressLines,
  affiliationLabel,
  anticipatedOpeningTitleCase,
  cta,
  directionsUrl,
  email,
  hoursLabel,
  hoursSummary,
  isPreOpening,
  mailtoUrl,
  plannedHours,
  practiceName,
} from '@/config/practice'

/* ------------------------------------------------------------------ *
 * FAQ
 * ------------------------------------------------------------------ *
 * Native <details>/<summary>. Keyboard operable and screen-reader friendly
 * with no JavaScript, which also means the answers are in the DOM for
 * crawlers, satisfying the "visible content" requirement for FAQPage schema.
 */

export function FaqList({ items }: { items: readonly Faq[] }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.question} className="faq__item" name="faq">
          <summary className="faq__q">
            <span>{f.question}</span>
            <ChevronIcon size={20} />
          </summary>
          <div className="faq__a">
            <p>{f.answer}</p>
          </div>
        </details>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * SERVICE CARD
 * ------------------------------------------------------------------ */

export function ServiceCard({ service }: { service: ServiceCategory }) {
  const Icon = serviceIcons[service.icon]
  const badge = tierLabel(service.tier)

  return (
    <article className="card card--link svc-card">
      <span className="svc-card__icon" aria-hidden="true">
        <Icon size={24} />
      </span>
      {badge ? (
        <span className={`tier-badge${service.tier === 'network' ? ' tier-badge--network' : ''}`}>
          {badge}
        </span>
      ) : null}
      <h3>{service.name}</h3>
      <p>{service.cardSummary}</p>
      <Link
        href={`/services/${service.slug}`}
        className="link-arrow"
        data-event="planned_service_click"
      >
        {isPreOpening ? 'View planned services' : 'Learn more'}
        <span className="sr-only"> about {service.name}</span>
      </Link>
    </article>
  )
}

export function ServiceGrid({ items = services }: { items?: readonly ServiceCategory[] }) {
  return (
    <div className="grid grid-3">
      {items.map((s) => (
        <ServiceCard key={s.slug} service={s} />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * CONSTRUCTION TIMELINE
 * ------------------------------------------------------------------ */

const statusLabel: Record<Milestone['status'], string> = {
  complete: 'Complete',
  current: 'In progress',
  upcoming: 'Upcoming',
}

export function Timeline({ items = milestones }: { items?: readonly Milestone[] }) {
  return (
    <ol className="timeline">
      {items.map((m) => (
        <li key={m.title} className="timeline__item" data-status={m.status}>
          <span className="timeline__marker" aria-hidden="true">
            {m.status === 'complete' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12.5 4.5 4.5L19 7" />
              </svg>
            ) : (
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'currentColor',
                  display: 'block',
                }}
              />
            )}
          </span>
          <div>
            <div className="timeline__title">
              <h3>{m.title}</h3>
              {/* Status is given as text, never by color alone. */}
              <span className="timeline__status">{statusLabel[m.status]}</span>
            </div>
            <p className="timeline__desc">{m.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

/* ------------------------------------------------------------------ *
 * STATIC MAP
 * ------------------------------------------------------------------ *
 * Renders a lightweight branded preview by default. The interactive Google
 * Maps iframe is inserted only after an explicit click, which keeps roughly
 * 900KB of third-party JavaScript off the initial page load and avoids setting
 * Google cookies before the visitor asks for the map.
 */

// The map lives in its own client component so that the Google iframe is
// only created after the visitor opts in. Re-exported here so existing
// imports keep working.
export { StaticMap } from './StaticMap'

/* ------------------------------------------------------------------ *
 * LOCATION BLOCK
 * ------------------------------------------------------------------ */

export function LocationDetails() {
  return (
    <div className="stack-lg">
      <div className="site-footer__fact" style={{ color: 'inherit' }}>
        <PinIcon size={20} />
        <address style={{ fontStyle: 'normal', display: 'grid', gap: '0.1rem' }}>
          <strong style={{ color: 'var(--navy)' }}>{practiceName}</strong>
          {addressLines.map((l) => (
            <span key={l}>{l}</span>
          ))}
          <span style={{ color: 'var(--mist)', fontSize: 'var(--fs-caption)' }}>
            {address.complex}
          </span>
        </address>
      </div>

      <div className="site-footer__fact" style={{ color: 'inherit' }}>
        <ClockIcon size={20} />
        <div>
          <span className="quickbar__label">{hoursLabel}</span>
          <ul className="list-clean" style={{ display: 'grid', gap: '0.3rem' }}>
            {plannedHours.map((d) => (
              <li key={d.day} style={{ fontSize: 'var(--fs-small)' }}>
                <span style={{ display: 'inline-block', minWidth: '6.5rem', fontWeight: 600 }}>
                  {d.day}
                </span>
                {d.display}
              </li>
            ))}
          </ul>
          <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--mist)', marginTop: '0.6rem' }}>
            Weekend hours have not been set. We will publish confirmed hours before opening.
          </p>
        </div>
      </div>

      <div className="site-footer__fact" style={{ color: 'inherit' }}>
        <MailIcon size={20} />
        <div>
          <span className="quickbar__label">Email</span>
          <a href={mailtoUrl} data-event="email_click">
            {email}
          </a>
        </div>
      </div>

      <div className="btn-row">
        <Button href={directionsUrl} variant="outline" event="directions_click" external>
          Get Directions
        </Button>
        <Button href={cta.primaryHref} variant="primary">
          {cta.primaryLabel}
        </Button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * QUICK INFO BAR
 * ------------------------------------------------------------------ */

export function QuickBar() {
  const items = [
    { icon: BuildingIcon, label: 'Current status', value: 'Currently under construction' },
    { icon: CalendarIcon, label: 'Anticipated opening', value: anticipatedOpeningTitleCase },
    { icon: ClockIcon, label: hoursLabel, value: hoursSummary },
    { icon: PinIcon, label: 'Location', value: `${address.line1}, ${address.city}` },
    { icon: MailIcon, label: 'Affiliation', value: affiliationLabel },
  ]

  return (
    <section className="quickbar" aria-label="Practice status at a glance">
      <div className="container">
        <ul className="quickbar__grid list-clean">
          {items.map((i) => {
            const Icon = i.icon
            return (
              <li key={i.label} className="quickbar__item">
                <Icon size={20} />
                <div>
                  <span className="quickbar__label">{i.label}</span>
                  <span className="quickbar__value">{i.value}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * FINAL CTA BAND
 * ------------------------------------------------------------------ */

export function CtaBand({
  eyebrow = 'Stay in the loop',
  title = "Follow the Progress of Rehoboth's Newest Dental Office",
  lede = 'Opening list subscribers hear the confirmed opening date, provider introductions, and early scheduling information first.',
}: {
  eyebrow?: string
  title?: string
  lede?: string
}) {
  return (
    <section className="cta-band section">
      <WaveRule
        className="hero__horizon"
        tone=""
      />
      <div className="container">
        <span className="eyebrow eyebrow--invert eyebrow--ruled">{eyebrow}</span>
        <h2>{title}</h2>
        <p className="lede" style={{ marginTop: 'var(--sp-4)', textAlign: 'center' }}>
          {lede}
        </p>
        <div className="btn-row">
          <Button href={cta.primaryHref} variant="invert" size="lg">
            {cta.primaryLabel}
          </Button>
          <Button href={mailtoUrl} variant="ghost-invert" size="lg" event="email_click">
            Email {email}
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ *
 * MEDICAL DISCLAIMER
 * ------------------------------------------------------------------ */

export function MedicalDisclaimer() {
  return (
    <div className="med-disclaimer">
      <strong>About this information</strong>
      This page is general education, not dental or medical advice, and reading it does not create a
      provider and patient relationship. Individual recommendations depend on an examination.{' '}
      {isPreOpening
        ? `${practiceName} is not yet open for patient care. Services described here are planned and have not been confirmed. If you are experiencing a life-threatening emergency, call 911. For an urgent dental concern, contact an established dental provider or an appropriate emergency service.`
        : 'If you are experiencing a life-threatening emergency, call 911.'}
    </div>
  )
}
