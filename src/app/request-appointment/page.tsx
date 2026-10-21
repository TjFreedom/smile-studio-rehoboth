import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AppointmentRequestForm } from '@/components/AppointmentRequestForm'
import { FaqList } from '@/components/Blocks'
import { JsonLd, PageHero, SectionHead } from '@/components/Ui'
import { webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import {
  anticipatedOpening,
  email,
  enableClickToCall,
  isAcceptingAppointments,
  hoursSummary,
  mailtoUrl,
  openingQualifier,
  phoneNumber,
  phoneNumberE164,
  practiceName,
} from '@/config/practice'
import type { Faq } from '@/content/faqs'

/**
 * REQUEST AN APPOINTMENT
 * ======================
 * The destination for the site's primary CTA while `isAcceptingAppointments`
 * is true. Distinct from /visit, which is the chrome-less, noindex landing page
 * for paid traffic: this one is in the navigation, indexed, and reachable from
 * every page.
 *
 * The practice is scheduling but not yet open, so this page has to hold two
 * true things at once: you can book now, and your appointment will be after we
 * open. Saying only the first would be a promise of care we cannot currently
 * give; saying only the second would contradict the postcard that is already
 * in the mail.
 *
 * Phone is presented first. Both printed pieces lead with the number, and a
 * patient holding one of them is looking for it, not for a form.
 */

const TITLE = 'Request an Appointment'
const DESCRIPTION = `Request an appointment with ${practiceName} in Rehoboth Beach, Delaware. Call ${phoneNumber ?? 'our office'} or send a request and our team will confirm a time with you.`

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/request-appointment',
})

const appointmentFaqs: Faq[] = [
  {
    question: 'Can I book an appointment before the office opens?',
    answer: `Yes. We are scheduling now, with appointments beginning once the office opens in ${anticipatedOpening}. Request a time and our team will call you to confirm the details. ${openingQualifier}`,
  },
  {
    question: 'Is this an instant booking?',
    answer:
      'No. Sending this form reserves a request, not a confirmed slot. A member of our team calls you back to agree a date and time, confirm what you need, and answer anything you want to ask first.',
  },
  {
    question: 'What if I need to be seen urgently?',
    answer:
      'The office is not open for patient care yet, so we cannot treat an urgent problem today. If you are experiencing a life-threatening emergency, call 911. For an urgent dental concern, contact an established dental provider or an appropriate emergency service.',
  },
  {
    question: 'What insurance do you take?',
    answer:
      'Participation is still being confirmed, and we will not list a plan before the contract is signed. Ask when our team calls you back and we will tell you exactly where things stand.',
  },
  {
    question: 'Do I need to do anything before my first visit?',
    answer:
      'Nothing yet. When we confirm your appointment we will tell you what to bring and send any forms ahead of time, so your first visit starts on time.',
  },
]

export default function RequestAppointmentPage() {
  // Booking is not always live. If the practice goes back to
  // 'under-construction', this page would be claiming appointments it cannot
  // take, so send visitors to the opening list instead. The booking aliases in
  // next.config.mjs route through here precisely so this check is the only
  // place that decides.
  if (!isAcceptingAppointments) redirect('/opening-list')

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Request an Appointment', path: '/request-appointment' },
  ]

  return (
    <>
      <JsonLd
        nodes={[webPageSchema({ name: TITLE, description: DESCRIPTION, path: '/request-appointment' })]}
      />

      <PageHero
        eyebrow="Appointments"
        title="We Are Scheduling Appointments Now"
        lede={`${practiceName} opens in ${anticipatedOpening}, and we are booking appointments ahead of time. Call us, or send a request and our team will call you back to confirm a time.`}
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <SectionHead eyebrow="The fastest way" title="Call Our Team" as="h2" />

              {phoneNumber ? (
                <p style={{ marginTop: 'var(--sp-4)' }}>
                  {enableClickToCall && phoneNumberE164 ? (
                    <a
                      href={`tel:${phoneNumberE164}`}
                      data-event="phone_click"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'var(--fs-h2)',
                        fontWeight: 700,
                        color: 'var(--navy)',
                        textDecoration: 'none',
                        fontVariantNumeric: 'lining-nums tabular-nums',
                      }}
                    >
                      {phoneNumber}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'var(--fs-h2)',
                        fontWeight: 700,
                        color: 'var(--navy)',
                        fontVariantNumeric: 'lining-nums tabular-nums',
                      }}
                    >
                      {phoneNumber}
                    </span>
                  )}
                </p>
              ) : null}

              <p style={{ fontSize: 'var(--fs-small)', marginTop: 'var(--sp-3)' }}>
                {hoursSummary} If we are with a patient or the office is closed, leave a message
                and we will call you back.
              </p>

              <div className="callout" style={{ marginTop: 'var(--sp-7)' }}>
                <p style={{ fontSize: 'var(--fs-small)' }}>
                  <strong>Booking now, seeing patients soon.</strong> The office opens in{' '}
                  {anticipatedOpening}, so appointments are being scheduled from that point onward.{' '}
                  {openingQualifier}
                </p>
              </div>

              <p style={{ marginTop: 'var(--sp-6)', fontSize: 'var(--fs-small)' }}>
                Prefer to write to a person? Email{' '}
                <a href={mailtoUrl} data-event="email_click">
                  {email}
                </a>
                .
              </p>
            </div>

            <div className="form-card">
              <h2 style={{ fontSize: 'var(--fs-h3)', fontFamily: 'var(--font-sans)' }}>
                Request a time
              </h2>
              <p
                style={{
                  fontSize: 'var(--fs-caption)',
                  color: 'var(--mist)',
                  marginTop: 'var(--sp-2)',
                  marginBottom: 'var(--sp-5)',
                }}
              >
                Fields marked with an asterisk are required. We call you back to confirm.
              </p>
              <AppointmentRequestForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container container--narrow">
          <SectionHead eyebrow="Before you book" title="Questions About Appointments" center ruled />
          <FaqList items={appointmentFaqs} />
        </div>
      </section>
    </>
  )
}
