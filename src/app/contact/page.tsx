import type { Metadata } from 'next'
import { InquiryForm } from '@/components/Forms'
import { JsonLd, PageHero, SectionHead, Callout, Button } from '@/components/Ui'
import { LocationDetails, StaticMap } from '@/components/Blocks'
import { contactPointSchema, webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import {
  anticipatedOpening,
  email,
  isAcceptingAppointments,
  mailtoUrl,
  openingQualifier,
  practiceName,
} from '@/config/practice'

const TITLE = 'Contact Us'
const DESCRIPTION =
  'Contact Smile Studio of Rehoboth by email at info@rehobothsmiles.com. Our new Rehoboth Beach, DE dental office is under construction at 19411 Plantations Road.'

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/contact',
})

export default function ContactPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: '/contact' }),
          contactPointSchema(),
        ]}
      />

      <PageHero
        eyebrow="Get in touch"
        title="Contact Smile Studio of Rehoboth"
        lede={`Our new Rehoboth Beach dental office is currently under construction. We anticipate opening in ${anticipatedOpening}. Contact our team by email or join the opening list for updates.`}
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <SectionHead
                eyebrow="Visit and contact"
                title="Where to Find Us, and How to Reach Us"
                as="h2"
              />
              <LocationDetails />

              <Callout className="mt-0" >
                <p style={{ fontSize: 'var(--fs-small)' }}>
                  <strong>No phone number yet.</strong> A public line has not been assigned to the
                  practice. Email is the fastest and only route to the team right now, and the
                  number will be published here the day it is active.
                </p>
              </Callout>

              <div style={{ marginTop: 'var(--sp-7)' }}>
                <StaticMap />
              </div>
            </div>

            <div className="split__aside">
              <div className="form-card">
                <h2 style={{ fontSize: 'var(--fs-h3)', fontFamily: 'var(--font-sans)' }}>
                  Send us a message
                </h2>
                <p
                  style={{
                    fontSize: 'var(--fs-caption)',
                    color: 'var(--mist)',
                    marginTop: 'var(--sp-2)',
                    marginBottom: 'var(--sp-5)',
                  }}
                >
                  For general questions about the practice, the opening, or working with us.
                </p>
                <InquiryForm />
              </div>

              <div className="card card--soft">
                <h3>Want the opening date?</h3>
                <p style={{ fontSize: 'var(--fs-small)', marginTop: 'var(--sp-2)' }}>
                  {isAcceptingAppointments
                    ? 'We are scheduling now. The opening list is how we share the confirmed opening date.'
                    : 'The opening list is the fastest way to hear when scheduling opens.'}
                </p>
                <div style={{ marginTop: 'var(--sp-4)' }}>
                  <Button href="/opening-list" full>
                    Join the Opening List
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container container--narrow">
          <h2>If you have a dental emergency</h2>
          <div className="callout callout--info" style={{ marginTop: 'var(--sp-5)' }}>
            <p>
              <strong>{practiceName} is not yet open for patient care.</strong>
            </p>
            <p>
              If you are experiencing a life-threatening emergency, including difficulty breathing
              or swallowing, call 911.
            </p>
            <p>
              For an urgent dental concern, contact an established dental provider or an appropriate
              emergency service. We are not able to see emergency patients until the office opens,
              and we will publish our own emergency procedures here before then.
            </p>
          </div>
          <p style={{ marginTop: 'var(--sp-5)', fontSize: 'var(--fs-caption)', color: 'var(--mist)' }}>
            {openingQualifier}
          </p>
          <p style={{ marginTop: 'var(--sp-4)', fontSize: 'var(--fs-caption)', color: 'var(--mist)' }}>
            Please do not send private medical, dental, insurance, or financial information by email
            or through the form above. Email is not a secure channel. You can write to us at{' '}
            <a href={mailtoUrl} data-event="email_click">
              {email}
            </a>{' '}
            for general questions.
          </p>
        </div>
      </section>
    </>
  )
}
