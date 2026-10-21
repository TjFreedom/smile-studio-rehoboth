import type { Metadata } from 'next'
import { AppointmentRequestForm } from '@/components/AppointmentRequestForm'
import { FaqList } from '@/components/Blocks'
import { Logo } from '@/components/Logo'
import { Button, SectionHead } from '@/components/Ui'
import { BuildingIcon, CheckIcon, PinIcon, UsersIcon } from '@/components/Icons'
import { legalNav } from '@/content/navigation'
import { pageMetadata } from '@/lib/seo'
import {
  address,
  addressLines,
  affiliationLabel,
  anticipatedOpening,
  email,
  mailtoUrl,
  parentOrganization,
  parentOrganizationUrl,
  practiceName,
} from '@/config/practice'
import type { Faq } from '@/content/faqs'

/**
 * PAID-TRAFFIC LANDING PAGE
 * =========================
 * The destination for ads. One message, one form, no site navigation (the
 * chrome is withheld by components/ChromeGate.tsx). Not indexed and not in
 * the sitemap: organic visitors land on the home page instead.
 *
 * Brief: new office, come check us out. Lead with appointment availability
 * and experienced providers. Insurance is deliberately not a selling point
 * here; it is answered plainly once, in the FAQ, so a visitor who asks is not
 * surprised on the phone.
 *
 * Every factual claim here is already made elsewhere on the site. No provider
 * names or credentials appear because none have been published.
 */

const TITLE = 'Reserve Your First Appointment'
const DESCRIPTION = `${practiceName} is a brand-new dental office opening in Rehoboth Beach, Delaware. Experienced providers, a new office built for comfort, and first appointments being reserved now.`

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/visit',
  index: false,
})

const heroPoints = [
  'Experienced dentists and clinical team',
  'A brand-new office, designed from the ground up',
  'First appointments being reserved now',
  'Plantations Professional Park, minutes from Route 1',
]

const faqs: Faq[] = [
  {
    question: 'Is the office open yet?',
    answer: `Not quite. We anticipate opening in ${anticipatedOpening}, and we are reserving first appointments now so you have a place in the schedule when the doors open. Construction schedules can change, and we will tell you plainly if the date moves.`,
  },
  {
    question: 'What happens after I send the form?',
    answer:
      'A member of our team will call the number you provide to find a time that works for you, answer any questions, and confirm what to bring. Nothing is scheduled until you have spoken with us.',
  },
  {
    question: 'Do you accept my insurance?',
    answer:
      'We are not currently in network with insurance plans. We will explain costs clearly before any treatment, and we are happy to talk through options on the call.',
  },
  {
    question: 'What does a first visit include?',
    answer:
      'A conversation before an examination, an examination before a plan, and a plan before any treatment. We take the time to understand what you want from your dental care, not just what we see in your mouth.',
  },
  {
    question: 'Where are you?',
    answer: `${address.line1}, ${address.city}, ${address.state} ${address.postalCode}, in ${address.complex}.`,
  },
]

export default function VisitLandingPage() {
  const year = new Date().getFullYear()

  return (
    <>
      {/* Minimal header: identity only, no navigation. */}
      <header className="lp-header">
        <div className="container">
          <Logo variant="horizontal" width={220} priority />
          <span className="lp-header__tag">{affiliationLabel}</span>
        </div>
      </header>

      {/* Hero with the form beside it. */}
      <section className="lp-hero">
        <div className="container">
          <div className="lp-hero__grid">
            <div>
              <span className="eyebrow eyebrow--invert">
                Now reserving first appointments · {address.city}, {address.state}
              </span>
              <h1>A Brand-New Dental Office Is Opening in Rehoboth Beach</h1>
              <p className="lp-hero__lede">
                {practiceName} brings experienced providers and a thoughtfully designed new office
                to {address.complex}. Tell us a little about you, and we will call to reserve your
                first appointment.
              </p>

              <ul className="lp-points">
                {heroPoints.map((p) => (
                  <li key={p}>
                    <CheckIcon size={18} aria-hidden="true" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <p className="lp-hero__qualifier">
                Anticipated opening in {anticipatedOpening}. Construction schedules can change, and
                we will tell you plainly if the date moves.
              </p>
            </div>

            <div className="form-card" id="reserve">
              <h2 style={{ fontSize: 'var(--fs-h3)', fontFamily: 'var(--font-sans)' }}>
                Reserve your first appointment
              </h2>
              <p
                style={{
                  fontSize: 'var(--fs-caption)',
                  color: 'var(--mist)',
                  marginTop: 'var(--sp-2)',
                  marginBottom: 'var(--sp-5)',
                }}
              >
                Takes about a minute. A member of our team will call to find a time.
              </p>
              <AppointmentRequestForm />
            </div>
          </div>
        </div>
      </section>

      {/* Why here. */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Why Smile Studio of Rehoboth"
            title="Experienced Care in a Brand-New Office"
            center
            ruled
          />
          <div className="lp-cards">
            <article className="lp-card">
              <span className="lp-card__icon" aria-hidden="true">
                <UsersIcon size={22} />
              </span>
              <h3>Experienced providers</h3>
              <p>
                Our dentists and clinical team bring years of experience, with the support of{' '}
                {parentOrganization}, a Delaware dental group with offices across the state. Care
                decisions are made here, in this office, by the people treating you.
              </p>
            </article>
            <article className="lp-card">
              <span className="lp-card__icon" aria-hidden="true">
                <BuildingIcon size={22} />
              </span>
              <h3>Built for comfort</h3>
              <p>
                Not a renovation. A new office planned from the ground up around how a visit should
                feel: calm, unhurried, and clear about what happens next.
              </p>
            </article>
            <article className="lp-card">
              <span className="lp-card__icon" aria-hidden="true">
                <PinIcon size={22} />
              </span>
              <h3>Easy to reach</h3>
              <p>
                {address.line1} in {address.complex}, {address.city}, minutes from the Route 1
                corridor and convenient to Lewes, Dewey Beach, and Milton.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* How it works. */}
      <section className="section section--soft">
        <div className="container container--narrow">
          <SectionHead eyebrow="How it works" title="Three Simple Steps" center ruled />
          <ol className="lp-steps">
            <li>
              <h3>Tell us about you</h3>
              <p>Your name, a mobile number, and what brings you in. That is all we need to start.</p>
            </li>
            <li>
              <h3>We call to reserve your time</h3>
              <p>
                A member of our team calls at the time you prefer, answers your questions, and holds
                a first appointment for you.
              </p>
            </li>
            <li>
              <h3>Come check us out</h3>
              <p>
                Your first visit starts with a conversation, then an examination, then a plan you
                understand before anything else happens.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* FAQ. */}
      <section className="section">
        <div className="container container--narrow">
          <SectionHead eyebrow="Good to know" title="Questions People Ask" center ruled />
          <FaqList items={faqs} />
        </div>
      </section>

      {/* Closing CTA. */}
      <section className="section section--navy">
        <div className="container" style={{ textAlign: 'center' }}>
          <SectionHead
            eyebrow="Reserve your place"
            title="First Appointments Are Being Reserved Now"
            lede="Send us your details and we will call to find a time that suits you."
            center
            invert
          />
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <Button href="#reserve" variant="invert" size="lg" event="landing_cta_click">
              Reserve My Appointment
            </Button>
          </div>
        </div>
      </section>

      {/* Minimal footer: identity, address, email, legal. */}
      <footer className="lp-footer">
        <div className="container">
          <Logo variant="horizontal-reversed" width={200} decorative />
          <p>
            {affiliationLabel}
            <br />
            {addressLines.join(', ')} · {address.complex}
            <br />
            <a href={mailtoUrl} data-event="email_click">
              {email}
            </a>
          </p>
          <p>
            This page does not book an appointment by itself and is not monitored for emergencies.
            If you are experiencing a life-threatening emergency, call 911.
          </p>
          <ul className="lp-footer__legal">
            {legalNav.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
          <p>
            &copy; {year} {practiceName}. All rights reserved.{' '}
            <a href={parentOrganizationUrl} target="_blank" rel="noopener noreferrer">
              {parentOrganization}
            </a>
            .
          </p>
        </div>
      </footer>

      {/* Mobile sticky CTA. Occupies the space the site's action bar normally reserves. */}
      <div className="lp-sticky">
        <a href="#reserve" className="btn" data-event="landing_sticky_cta_click">
          Reserve My Appointment
        </a>
      </div>
    </>
  )
}
