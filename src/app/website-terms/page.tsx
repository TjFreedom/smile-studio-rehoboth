import type { Metadata } from 'next'
import { ProsePage, type Block } from '@/components/ProsePage'
import { PlaceholderNote } from '@/components/Ui'
import { pageMetadata } from '@/lib/seo'
import { email, parentOrganization, practiceName, siteUrl } from '@/config/practice'

const TITLE = 'Website Terms of Use'
const DESCRIPTION =
  'The terms that apply to your use of the Smile Studio of Rehoboth website.'
const PATH = '/website-terms'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const blocks: Block[] = [
  { type: 'p', text: 'Effective date: August 19, 2026' },
  {
    type: 'p',
    text: `These terms apply to your use of ${siteUrl.replace(/^https?:\/\//, '')}, operated by ${practiceName}. By using the site you agree to them. If you do not agree, please do not use the site.`,
  },

  { type: 'h2', text: 'The site is informational' },
  {
    type: 'p',
    text: 'This website provides general information about the practice. It does not provide dental or medical advice, it does not create a provider and patient relationship, and it is not a substitute for examination by a qualified clinician.',
  },
  {
    type: 'p',
    text: `${practiceName} is under construction and is not open for patient care. Nothing on this site schedules an appointment or registers you as a patient.`,
  },

  { type: 'h2', text: 'No emergency service' },
  {
    type: 'p',
    text: 'This website and its forms are not monitored for emergencies and must not be used to report one. If you are experiencing a life-threatening emergency, call 911. For an urgent dental concern, contact an established dental provider or an appropriate emergency service.',
  },

  { type: 'h2', text: 'Accuracy of information' },
  {
    type: 'p',
    text: 'We work to keep the site accurate and current, and content describing services, providers, hours, technology, and the opening timeline is subject to change. Content labelled as planned or to be confirmed describes an intention, not a commitment. The anticipated opening window is an estimate, and construction schedules can change.',
  },

  { type: 'h2', text: 'Acceptable use' },
  { type: 'p', text: 'You agree not to:' },
  {
    type: 'ul',
    items: [
      'Use the site for any unlawful purpose.',
      'Submit false information, or submit information on behalf of another person without their permission.',
      'Submit another person’s health information through any form on this site.',
      'Attempt to gain unauthorised access to the site, its servers, or connected systems.',
      'Use automated systems to scrape, harvest, or submit data, or to send unsolicited messages.',
      'Interfere with the operation of the site, including by attempting to overwhelm it with requests.',
    ],
  },

  { type: 'h2', text: 'Submissions' },
  {
    type: 'p',
    text: 'Information you submit through a form is handled as described in our Privacy Policy. Do not submit confidential health information. Email and web forms are not secure channels, and information sent through them may be intercepted.',
  },

  { type: 'h2', text: 'Intellectual property' },
  {
    type: 'p',
    text: `The content, design, text, graphics, and logos on this site are owned by ${practiceName} or ${parentOrganization}, or are used under licence, and are protected by intellectual property law. The ${practiceName} name, logo, and the lighthouse and tooth mark are protected brand assets. You may view and print pages for your own personal, non-commercial use. Any other reproduction, distribution, modification, or use requires written permission.`,
  },

  { type: 'h2', text: 'Third-party links' },
  {
    type: 'p',
    text: 'The site links to websites we do not operate. Those links are provided for convenience and do not imply endorsement. We are not responsible for the content, accuracy, or practices of third-party sites, and your use of them is governed by their own terms.',
  },

  { type: 'h2', text: 'Disclaimer of warranties' },
  {
    type: 'p',
    text: 'The site is provided on an "as is" and "as available" basis. To the fullest extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the site will be uninterrupted, error free, or free of harmful components.',
  },

  { type: 'h2', text: 'Limitation of liability' },
  {
    type: 'p',
    text: 'To the fullest extent permitted by law, neither the practice nor its affiliates, officers, employees, or agents will be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this site.',
  },

  { type: 'h2', text: 'Governing law' },
  {
    type: 'p',
    text: 'These terms are governed by the laws of the State of Delaware, without regard to conflict of law principles. Any dispute will be brought in the state or federal courts located in Delaware.',
  },

  { type: 'h2', text: 'Changes to these terms' },
  {
    type: 'p',
    text: 'We may update these terms from time to time. The effective date above will change when we do, and continued use of the site after a change means you accept the revised terms.',
  },

  { type: 'h2', text: 'Contact' },
  { type: 'p', text: `Questions about these terms can be sent to ${email}.` },
]

export default function Page() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Website Terms of Use"
      lede="The terms that apply when you use this website."
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Website Terms', path: PATH },
      ]}
      seo={{ name: TITLE, description: DESCRIPTION, path: PATH }}
      blocks={blocks}
      hideCta
      aside={
        <PlaceholderNote label="Required before launch: legal review">
          Draft terms requiring review and approval by counsel before publication. Confirm the
          correct contracting entity (practice or Freedom Dental Health), governing law and venue,
          limitation of liability against Delaware law, trademark ownership and registration
          status, and whether an arbitration or class action waiver clause is wanted. Owner:
          Director of Marketing and Communications with legal counsel.
        </PlaceholderNote>
      }
      related={[
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Website Disclaimer', href: '/website-disclaimer' },
        { label: 'Accessibility Statement', href: '/accessibility-statement' },
      ]}
    />
  )
}
