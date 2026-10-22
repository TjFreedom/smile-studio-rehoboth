import type { Metadata } from 'next'
import { JsonLd, PageHero, SectionHead, PlaceholderNote, Button } from '@/components/Ui'
import { CtaBand, FaqList, MedicalDisclaimer } from '@/components/Blocks'
import { faqSchema, webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { email, mailtoUrl, practiceName } from '@/config/practice'

const TITLE = 'Dental Emergency Information'
const DESCRIPTION =
  'Smile Studio of Rehoboth is not yet open for patient care. What to do about a dental emergency near Rehoboth Beach, DE, and when our emergency service will begin.'
const PATH = '/patient-resources/dental-emergency-information'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const faqs = [
  {
    question: 'Can Smile Studio of Rehoboth see me for an emergency today?',
    answer:
      `No. The office is under construction and is not open for patient care: there are no clinical staff on site and no operatories in use, so we cannot treat you today. Our phone line is open for scheduling future appointments only, and it is not monitored for emergencies. Please contact an established dental provider or an appropriate emergency service.`,
  },
  {
    question: 'What counts as a medical emergency rather than a dental one?',
    answer:
      'Call 911 for difficulty breathing or swallowing, swelling that is spreading toward the eye or down the neck, uncontrolled bleeding, a high fever alongside facial swelling, or any injury involving a suspected broken jaw or loss of consciousness. These need emergency medical care, not a dental appointment.',
  },
  {
    question: 'Will you offer emergency dental care once you open?',
    answer:
      'Emergency care is part of the plan for this practice, including for visitors who need help while they are at the beach. Our confirmed emergency procedures, hours, and contact methods will be published on this page before we open.',
  },
  {
    question: 'A tooth was knocked out. What should I do?',
    answer:
      'Time matters a great deal for a knocked-out permanent tooth. Handle it by the crown rather than the root, and if it is dirty rinse it briefly with milk or saline rather than scrubbing it. If you are able, reposition it gently in the socket. If not, keep it in milk or in the injured person’s saliva, and seek dental or emergency care immediately. This is general first-aid information and is not a substitute for being seen.',
  },
]

export default function Page() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Patient Resources', path: '/patient-resources' },
    { name: 'Dental Emergency Information', path: PATH },
  ]

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
          faqSchema(faqs),
        ]}
      />

      <PageHero
        eyebrow="Emergency information"
        title="If You Have a Dental Emergency"
        lede={`${practiceName} is not yet open for patient care. Please read this before doing anything else.`}
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container container--narrow">
          {/* The most important content on the page, placed first and styled to
              be impossible to scroll past. */}
          <div
            style={{
              background: 'var(--error-bg)',
              border: '2px solid var(--error)',
              borderRadius: 'var(--radius)',
              padding: 'var(--sp-6)',
            }}
          >
            <h2 style={{ color: 'var(--error)', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-h3)' }}>
              We cannot see emergency patients
            </h2>
            <div className="stack" style={{ marginTop: 'var(--sp-4)' }}>
              <p style={{ fontWeight: 600 }}>
                If you are experiencing a life-threatening emergency, call 911.
              </p>
              <p style={{ fontSize: 'var(--fs-small)' }}>
                That includes difficulty breathing or swallowing, swelling spreading toward the eye
                or down the neck, uncontrolled bleeding, or a facial injury involving a suspected
                broken jaw or loss of consciousness.
              </p>
              <p style={{ fontSize: 'var(--fs-small)' }}>
                <strong>
                  For an urgent dental concern, contact an established dental provider or an
                  appropriate emergency service.
                </strong>{' '}
                {practiceName} is under construction and cannot provide care, triage, or clinical
                advice. Our email inbox is not monitored for emergencies and we do not have a phone
                line.
              </p>
            </div>
          </div>

          <div className="article-body" style={{ marginTop: 'var(--sp-8)' }}>
            <h2>Where to go instead, for now</h2>
            <p>
              If you have a regular dentist, call them first. Most practices keep some capacity for
              urgent problems and many have after-hours instructions on their voicemail.
            </p>
            <p>
              If you do not have a dentist, or you are visiting the area, a hospital emergency
              department can address infection, swelling, bleeding, and pain, and it is the right
              place for anything involving breathing, swallowing, or a facial injury. Urgent care
              centres can often help with pain and infection but do not usually provide dental
              treatment.
            </p>
            <p>
              The Delaware State Dental Society and the American Dental Association both publish
              directories that can help you find a dentist accepting urgent cases.
            </p>

            <h2>General first-aid guidance while you arrange care</h2>
            <p>
              The following is general information, not advice about your specific situation, and it
              is not a substitute for being examined.
            </p>

            <h3>Toothache</h3>
            <p>
              Rinse with warm salt water and keep the area clean. Over-the-counter pain relief taken
              according to the packaging may help, provided it is appropriate for you and does not
              conflict with your medications or medical conditions. Do not place aspirin directly
              against the gum, which can burn the tissue. A toothache that keeps you awake, or one
              accompanied by swelling or fever, needs to be seen promptly.
            </p>

            <h3>Broken or chipped tooth</h3>
            <p>
              Rinse your mouth with warm water and keep any pieces. A cold compress on the outside of
              the cheek can reduce swelling. Avoid chewing on that side.
            </p>

            <h3>Knocked-out permanent tooth</h3>
            <p>
              Time matters. Handle the tooth by the crown, not the root. If it is dirty, rinse it
              briefly with milk or saline rather than scrubbing it. If you can, reposition it gently
              into the socket and bite on a clean cloth to hold it. If not, keep it in milk or in the
              injured person’s saliva and seek care immediately.
            </p>

            <h3>Lost filling or crown</h3>
            <p>
              Keep the crown if you have it. Avoid chewing on that side and keep the area clean.
              Temporary dental cement from a pharmacy may protect the tooth briefly, but it is a
              stopgap rather than a repair.
            </p>

            <h3>Swelling</h3>
            <p>
              Facial swelling associated with a tooth can indicate an infection that needs prompt
              treatment. Swelling that is spreading, that affects the eye or the floor of the mouth,
              or that comes with difficulty breathing or swallowing, is an emergency. Call 911.
            </p>

            <h2>What we will offer once we open</h2>
            <p>
              A dentist who can help when something goes wrong is a genuinely useful thing for a
              resort community to have, and it is part of why this location was chosen. Emergency
              care is planned for both patients of record and for visitors who need help while they
              are at the beach.
            </p>
            <p>
              Our confirmed emergency policy, including hours, how to reach us, after-hours
              arrangements, and whether we can see patients who are not of record, will be published
              on this page before we open. Until it is, please treat this page as a redirection to
              other care rather than an offer of our own.
            </p>
          </div>

          <PlaceholderNote label="Required before opening: emergency procedures">
            Confirm and publish: emergency phone number and after-hours routing, same-day
            availability policy, whether non-patients of record are seen, triage protocol, weekend
            and holiday coverage, and the named local hospital and urgent care referral routes.
            Then flip features.enableEmergencyInstructions in src/config/practice.ts and rewrite
            this page. Legal and clinical review required before publication. Owner: Clinical Lead
            with Compliance.
          </PlaceholderNote>

          <MedicalDisclaimer />
        </div>
      </section>

      <section className="section section--soft">
        <div className="container container--narrow">
          <SectionHead eyebrow="Questions" title="Emergency Questions" center ruled />
          <FaqList items={faqs} />
          <p style={{ marginTop: 'var(--sp-6)', fontSize: 'var(--fs-caption)', color: 'var(--mist)', textAlign: 'center' }}>
            For non-urgent questions only, email{' '}
            <a href={mailtoUrl} data-event="email_click">
              {email}
            </a>
            . This inbox is not monitored for emergencies.
          </p>
          <div className="btn-row" style={{ justifyContent: 'center', marginTop: 'var(--sp-6)' }}>
            <Button href="/opening-list" variant="outline">
              Hear When Emergency Care Begins
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
