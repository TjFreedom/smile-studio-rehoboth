import type { Metadata } from 'next'
import { ProsePage, type Block } from '@/components/ProsePage'
import { pageMetadata } from '@/lib/seo'
import {
  anticipatedOpening,
  email,
  isAcceptingAppointments,
  practiceName,
} from '@/config/practice'

const TITLE = 'Website Disclaimer'
const DESCRIPTION =
  'Important disclaimers about the content on the Smile Studio of Rehoboth website, including its pre-opening status and the limits of the information provided.'
const PATH = '/website-disclaimer'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const blocks: Block[] = [
  { type: 'p', text: 'Last updated: August 19, 2026' },

  { type: 'h2', text: 'Not dental or medical advice' },
  {
    type: 'p',
    text: 'The content on this website is general education. It is not dental or medical advice, it is not tailored to your circumstances, and it does not create a provider and patient relationship. Do not delay seeking care, or disregard advice you have been given, because of something you read here.',
  },
  {
    type: 'p',
    text: 'Recommendations in dentistry depend on an examination, your medical history, imaging, and your own goals. Two people with what appears to be the same problem can reasonably receive different recommendations.',
  },

  { type: 'h2', text: 'The practice is not open' },
  {
    type: 'p',
    text: isAcceptingAppointments
      ? `${practiceName} is under construction and is not open for patient care. We anticipate opening in ${anticipatedOpening}. You can request an appointment for after we open, but submitting a request does not confirm a booking, does not register you as a patient, and does not establish a clinical relationship. An appointment exists only once a member of our team has confirmed it with you directly.`
      : `${practiceName} is under construction and is not open for patient care. We anticipate opening in ${anticipatedOpening}. Nothing on this website schedules an appointment, registers you as a patient, or establishes a clinical relationship.`,
  },
  {
    type: 'p',
    text: 'The anticipated opening window is an estimate. Construction schedules can change, and we will publish the confirmed date when we have one.',
  },

  { type: 'h2', text: 'Planned and unconfirmed information' },
  {
    type: 'p',
    text: 'Content on this site describing services, providers, technology, office features, hours, insurance participation, and financing is planned rather than confirmed unless it explicitly says otherwise. Planned content describes an intention and is subject to confirmation by clinical and operational leadership before opening.',
  },
  {
    type: 'p',
    text: 'Where a service is described as available through Freedom Dental Health, it is provided at another affiliated location and not at the Rehoboth Beach office.',
  },

  { type: 'h2', text: 'No emergency service' },
  {
    type: 'p',
    text: 'This website, its forms, and its email address are not monitored for emergencies. If you are experiencing a life-threatening emergency, including difficulty breathing or swallowing, call 911. For an urgent dental concern, contact an established dental provider or an appropriate emergency service.',
  },

  { type: 'h2', text: 'No guarantee of outcomes' },
  {
    type: 'p',
    text: 'We do not guarantee any clinical outcome, treatment duration, level of comfort, insurance coverage, or result. Descriptions of what treatment may involve are general, and individual experience varies. Ranges quoted for how long a restoration may last are drawn from general dental literature and are not a warranty.',
  },

  { type: 'h2', text: 'Third-party content' },
  {
    type: 'p',
    text: 'Links to other websites are provided for convenience and do not constitute an endorsement. We do not control and are not responsible for content on sites we do not operate.',
  },

  { type: 'h2', text: 'Testimonials, reviews, and case photography' },
  {
    type: 'p',
    text: 'This website does not currently contain patient testimonials, reviews, ratings, or before-and-after case photography, because the practice has not treated any patients. Any such content published in future will be genuine, used with documented written consent, and will carry a note that individual results vary.',
  },

  { type: 'h2', text: 'Website security' },
  {
    type: 'p',
    text: 'The forms and email address on this site are not secure channels for protected health information, and we do not represent this website as HIPAA compliant. Please do not submit medical, dental, insurance, or financial details through it.',
  },

  { type: 'h2', text: 'Contact' },
  { type: 'p', text: `Questions about this disclaimer can be sent to ${email}.` },
]

export default function Page() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Website Disclaimer"
      lede="What this website is, what it is not, and the limits of the information on it."
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Website Disclaimer', path: PATH },
      ]}
      seo={{ name: TITLE, description: DESCRIPTION, path: PATH }}
      blocks={blocks}
      hideCta
      related={[
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Website Terms', href: '/website-terms' },
        { label: 'Dental Emergency Information', href: '/patient-resources/dental-emergency-information' },
      ]}
    />
  )
}
