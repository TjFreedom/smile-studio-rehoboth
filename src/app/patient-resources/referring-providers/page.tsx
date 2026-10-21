import type { Metadata } from 'next'
import { ProsePage, type Block } from '@/components/ProsePage'
import { PlaceholderNote } from '@/components/Ui'
import { pageMetadata } from '@/lib/seo'
import { email, parentOrganization, practiceName } from '@/config/practice'

const TITLE = 'Referring Provider Information'
const DESCRIPTION =
  'Information for dentists, specialists, and physicians considering a referral to Smile Studio of Rehoboth in Rehoboth Beach, Delaware.'
const PATH = '/patient-resources/referring-providers'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const blocks: Block[] = [
  { type: 'p', text: 'Greetings, and thank you for looking.' },
  {
    type: 'note',
    text: `${practiceName} is under construction and is not yet accepting referrals. We anticipate opening in late November or early December 2026. This page sets out what we intend to offer colleagues, and it will be completed with providers, credentials, and a referral process before we open.`,
    variant: 'info',
  },

  { type: 'h2', text: 'Who we expect to work with' },
  {
    type: 'p',
    text: 'A new general practice at the shore is useful to several groups of colleagues:',
  },
  {
    type: 'ul',
    items: [
      'Specialists who need a general dentist to restore a case, maintain it afterwards, or take over routine care',
      'General practices at capacity, or with a waiting list, looking for somewhere to send new patients',
      'Physicians whose patients need a dental home, particularly before cardiac, oncology, or transplant treatment where dental clearance is required',
      'Physicians managing patients with sleep-disordered breathing who want a dental colleague for oral appliance therapy alongside their care',
      'Retiring practitioners planning continuity of care for their patients',
    ],
  },

  { type: 'h2', text: 'How we intend to work with referring colleagues' },
  {
    type: 'p',
    text: 'Referral relationships are built on a small number of unglamorous behaviors, and we intend to be reliable about all of them.',
  },
  {
    type: 'ul',
    items: [
      'A patient referred to us for a specific purpose is treated for that purpose. We do not use a referral as an opportunity to take over a relationship you have built.',
      'Where you have asked for the patient to return to you, they return to you, and we say so to the patient directly.',
      'You receive a written summary of what we found and what we did.',
      'Urgent referrals are acknowledged rather than left in an inbox.',
      'If we cannot help, or the case is better suited elsewhere, we tell you promptly instead of holding it.',
    ],
  },

  { type: 'h2', text: 'Referrals we make' },
  {
    type: 'p',
    text: `${practiceName} is a general practice, and complex surgical, endodontic, periodontal, orthodontic, and prosthodontic cases will be referred. Some of that goes to colleagues within ${parentOrganization}, and some will go to independent specialists in the region.`,
  },
  {
    type: 'p',
    text: 'Network affiliation does not mean every referral goes inside the network. Where a local specialist is the better answer for a patient, including on grounds of travel distance, that is where the referral goes.',
  },

  { type: 'h2', text: 'What is not yet confirmed' },
  {
    type: 'ul',
    items: [
      'Provider names, credentials, and areas of clinical interest',
      'The referral form and submission process',
      'Secure imaging and records transfer',
      'A direct line for colleagues',
      'Which specialty services will be delivered on site',
    ],
  },

  { type: 'h2', text: 'Getting in touch before we open' },
  {
    type: 'p',
    text: `If you would like to introduce yourself, discuss a future referral relationship, or be notified when we open, please write to ${email}. We would genuinely welcome the conversation, and we will come to you rather than expecting the reverse.`,
  },
]

export default function Page() {
  return (
    <ProsePage
      eyebrow="For colleagues"
      title="Referring Provider Information"
      lede="For dentists, specialists, and physicians considering a referral to our practice once we open."
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Patient Resources', path: '/patient-resources' },
        { name: 'Referring Providers', path: PATH },
      ]}
      seo={{ name: TITLE, description: DESCRIPTION, path: PATH }}
      blocks={blocks}
      aside={
        <PlaceholderNote label="Required before opening: referral process">
          Confirm and publish: provider names and credentials, clinical areas of interest, referral
          form, secure records and imaging transfer method, direct contact route for colleagues,
          expected acknowledgement turnaround, and the list of specialty services delivered on
          site. Owner: Clinical Lead with Practice Operations.
        </PlaceholderNote>
      }
      related={[
        { label: `The ${parentOrganization} Connection`, href: '/about/freedom-dental-health' },
        { label: 'Our Services', href: '/services' },
        { label: 'Contact', href: '/contact' },
      ]}
    />
  )
}
