import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, PageHero, SectionHead, Callout, Button } from '@/components/Ui'
import { CtaBand, FaqList } from '@/components/Blocks'
import { webPageSchema, faqSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { newPatientFaqs } from '@/content/faqs'
import {
  anticipatedOpening,
  email,
  isAcceptingAppointments,
  mailtoUrl,
  practiceName,
} from '@/config/practice'

const TITLE = 'New Patient Information'
const DESCRIPTION =
  'New patient information for Smile Studio of Rehoboth in Rehoboth Beach, DE. The office is under construction, with an anticipated opening in late 2026.'
const PATH = '/new-patients'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const sections = [
  {
    h: 'What to Expect',
    p: 'How a first visit will be structured, how long it takes, and what happens if you are anxious about being there.',
    href: '/new-patients/what-to-expect',
  },
  {
    h: 'Insurance and Financing',
    p: 'What we can tell you about coverage and payment today, and what will be confirmed before opening.',
    href: '/new-patients/insurance-and-financing',
  },
  {
    h: 'Patient Forms',
    p: 'Intake paperwork is not available yet. Here is what will be required and how you will complete it.',
    href: '/new-patients/patient-forms',
  },
  {
    h: 'Frequently Asked Questions',
    p: 'The questions we are hearing most often from people planning to become patients.',
    href: '/new-patients/faq',
  },
]

export default function Page() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'New Patients', path: PATH },
  ]

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
          faqSchema(newPatientFaqs),
        ]}
      />

      <PageHero
        eyebrow="New patients"
        title="Planning to Become a Patient"
        lede={
          isAcceptingAppointments
            ? `${practiceName} is not open yet, but we are scheduling appointments for after we open. This is what we can tell you now, and how to book your first visit.`
            : `${practiceName} is not open yet, so we cannot register patients or schedule appointments. This is what we can tell you now, and how to be first in line when scheduling opens.`
        }
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container">
          <Callout>
            <p>
              <strong>
                {isAcceptingAppointments
                  ? 'Scheduling is open. The office is not.'
                  : 'Scheduling is not open.'}
              </strong>
            </p>
            <p style={{ fontSize: 'var(--fs-small)' }}>
              {isAcceptingAppointments ? (
                <>
                  The office is under construction, with an anticipated opening in{' '}
                  {anticipatedOpening}. We are booking appointments now for dates after we open.
                  Requesting one is not a confirmed booking: a member of our team calls you back to
                  agree the details.
                </>
              ) : (
                <>
                  The office is under construction, with an anticipated opening in{' '}
                  {anticipatedOpening}. Nothing on this website books an appointment. Joining the
                  opening list is the fastest route to a first visit, because subscribers receive
                  scheduling information before appointments are offered publicly.
                </>
              )}
            </p>
          </Callout>

          <div className="grid grid-2" style={{ marginTop: 'var(--sp-8)' }}>
            {sections.map((s) => (
              <article key={s.href} className="card card--link">
                <h2 style={{ fontSize: 'var(--fs-h3)', fontFamily: 'var(--font-sans)' }}>{s.h}</h2>
                <p style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-small)' }}>{s.p}</p>
                <Link href={s.href} className="link-arrow" style={{ marginTop: 'var(--sp-4)' }}>
                  Read more
                  <span className="sr-only"> about {s.h}</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="split">
            <div>
              <SectionHead
                eyebrow="Getting started"
                title="How Becoming a Patient Will Work"
                as="h2"
              />
              <ol className="steps">
                <li>
                  <div>
                    <h3>Join the opening list</h3>
                    <p style={{ fontSize: 'var(--fs-small)', marginTop: '0.3rem' }}>
                      This is the only step available today. It takes about a minute and puts you
                      ahead of public scheduling.
                    </p>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>Receive early scheduling information</h3>
                    <p style={{ fontSize: 'var(--fs-small)', marginTop: '0.3rem' }}>
                      Before appointments open publicly, subscribers get the confirmed opening date
                      and instructions for booking.
                    </p>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>Book your first visit</h3>
                    <p style={{ fontSize: 'var(--fs-small)', marginTop: '0.3rem' }}>
                      Once scheduling is live, you will be able to book a comprehensive new patient
                      examination.
                    </p>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>Complete your intake forms</h3>
                    <p style={{ fontSize: 'var(--fs-small)', marginTop: '0.3rem' }}>
                      Sent ahead of the appointment so the visit is spent with your provider rather
                      than with a clipboard.
                    </p>
                  </div>
                </li>
                <li>
                  <div>
                    <h3>Come in</h3>
                    <p style={{ fontSize: 'var(--fs-small)', marginTop: '0.3rem' }}>
                      A conversation, a full examination, and a written plan in order of priority.
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <aside className="split__aside">
              <div className="card">
                <h3>Transferring from another practice?</h3>
                <p style={{ fontSize: 'var(--fs-small)', marginTop: 'var(--sp-3)' }}>
                  You do not need to do anything yet. When the time comes, we can usually request
                  your records and recent X-rays from your previous practice so images taken in the
                  last year do not need to be repeated.
                </p>
                <p style={{ fontSize: 'var(--fs-small)', marginTop: 'var(--sp-3)' }}>
                  You are not obliged to tell your current practice anything, and you do not need
                  their permission to see someone new.
                </p>
              </div>

              <div className="card card--soft">
                <h3>Questions in the meantime</h3>
                <p style={{ fontSize: 'var(--fs-small)', marginTop: 'var(--sp-3)' }}>
                  Email{' '}
                  <a href={mailtoUrl} data-event="email_click">
                    {email}
                  </a>
                  . A public phone number has not been assigned yet.
                </p>
                <div style={{ marginTop: 'var(--sp-4)' }}>
                  <Button href="/opening-list" full>
                    Join the Opening List
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <SectionHead eyebrow="Questions" title="New Patient Questions" center ruled />
          <FaqList items={newPatientFaqs} />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
