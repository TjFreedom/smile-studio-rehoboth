import type { Metadata } from 'next'
import { ProsePage, type Block } from '@/components/ProsePage'
import { PlaceholderNote } from '@/components/Ui'
import { pageMetadata } from '@/lib/seo'
import { features } from '@/config/practice'

const TITLE = 'Patient Forms'
const DESCRIPTION =
  'Patient intake forms for Smile Studio of Rehoboth will be available before the office opens in Rehoboth Beach, DE. Here is what they will cover.'
const PATH = '/new-patients/patient-forms'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const blocks: Block[] = [
  {
    type: 'note',
    text: 'Patient forms are not available yet. The practice is under construction and is not registering patients, so there is nothing to complete. This page explains what will be required and how, so there are no surprises later.',
    variant: 'info',
  },

  { type: 'h2', text: 'What the forms will cover' },
  {
    type: 'ul',
    items: [
      'Patient details and contact information',
      'Medical history, including conditions that affect dental treatment and healing',
      'Current medications and supplements',
      'Allergies, including any reaction to local anesthetic or latex',
      'Dental history, including previous treatment and any difficulties you have had',
      'Insurance details, if you have coverage',
      'Consent for examination and treatment',
      'Acknowledgement of the Notice of Privacy Practices',
    ],
  },

  { type: 'h2', text: 'How you will complete them' },
  {
    type: 'p',
    text: 'Forms will be sent ahead of your appointment so you can complete them at home. Filling in a medical history while sitting in a waiting room is how important details get missed, and it eats into time that should be spent with your provider.',
  },
  {
    type: 'p',
    text: 'Paper copies will be available for anyone who prefers them, and the front desk will help if you would rather work through it together.',
  },

  { type: 'h2', text: 'A note on privacy and security' },
  {
    type: 'p',
    text: 'Health information belongs in a system designed to hold it. When intake is live, forms will be completed through a system selected for that purpose, and the practice will provide its Notice of Privacy Practices describing how your information is used and protected.',
  },
  {
    type: 'p',
    text: 'In the meantime, please do not send medical, dental, insurance, or financial details by email or through the contact form on this website. Email is not a secure channel, and the forms here are for general questions only.',
  },
  {
    type: 'note',
    text: 'We are not going to describe this website or its forms as HIPAA compliant. That claim requires the entire technology stack and workflow to have been verified, and that verification has not been completed. When patient intake goes live it will run on a system evaluated for the purpose, and we will say plainly what that system is.',
  },

  { type: 'h2', text: 'What you can do now' },
  {
    type: 'p',
    text: 'Nothing is required. If you would like to be ready, the useful preparation is simply knowing your medications, your physician’s details, and the name of your previous dental practice so records can be requested when the time comes.',
  },
]

export default function Page() {
  return (
    <ProsePage
      eyebrow="New patients"
      title="Patient Forms"
      lede="Intake forms are not available yet. Here is what they will ask for and how you will complete them."
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'New Patients', path: '/new-patients' },
        { name: 'Patient Forms', path: PATH },
      ]}
      seo={{ name: TITLE, description: DESCRIPTION, path: PATH }}
      blocks={blocks}
      aside={
        <PlaceholderNote label="Required before opening: patient forms">
          {features.enablePatientForms
            ? 'Forms flag is enabled. Confirm the live forms URL in src/config/practice.ts.'
            : 'Set externalLinks.patientForms in src/config/practice.ts and flip features.enablePatientForms to true. Also required: Notice of Privacy Practices URL, confirmation that the intake vendor has a signed Business Associate Agreement, and accessible PDF versions of any downloadable form. Owner: Practice Operations with Compliance review.'}
        </PlaceholderNote>
      }
      related={[
        { label: 'What to Expect', href: '/new-patients/what-to-expect' },
        { label: 'Insurance and Financing', href: '/new-patients/insurance-and-financing' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
      ]}
    />
  )
}
