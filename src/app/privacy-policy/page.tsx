import type { Metadata } from 'next'
import { ProsePage, type Block } from '@/components/ProsePage'
import { PlaceholderNote } from '@/components/Ui'
import { pageMetadata } from '@/lib/seo'
import { address, email, parentOrganization, practiceName, siteUrl } from '@/config/practice'

const TITLE = 'Privacy Policy'
const DESCRIPTION =
  'How Smile Studio of Rehoboth collects, uses, and protects information submitted through this website.'
const PATH = '/privacy-policy'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const EFFECTIVE = 'August 19, 2026'

const blocks: Block[] = [
  { type: 'p', text: `Effective date: ${EFFECTIVE}` },
  {
    type: 'p',
    text: `This policy explains what information ${practiceName} collects through ${siteUrl.replace(/^https?:\/\//, '')}, how it is used, and the choices available to you. It covers this website only.`,
  },
  {
    type: 'note',
    text: 'This website is not a patient portal and is not a secure channel for health information. Please do not submit medical, dental, insurance, or financial details through any form on this site or by email. Once the practice opens, protected health information will be handled through systems selected for that purpose and governed by the practice Notice of Privacy Practices.',
  },

  { type: 'h2', text: 'Information we collect' },
  { type: 'h3', text: 'Information you give us' },
  {
    type: 'p',
    text: 'When you join the opening list we collect your first and last name, email address, and optionally your mobile phone number, ZIP code, preferred contact method, and the general area of dental care you are interested in. We also record which permissions you granted.',
  },
  {
    type: 'p',
    text: 'When you use the general inquiry form we collect your name, email address, optionally a phone number, the category of your question, and the content of your message.',
  },
  { type: 'h3', text: 'Information collected automatically' },
  {
    type: 'p',
    text: 'Our hosting provider records standard server log information, including IP address, browser type, pages requested, and timestamps. This is used for security, abuse prevention, and diagnosing faults.',
  },
  {
    type: 'p',
    text: 'Where you consent to analytics, we may collect information about how the site is used, such as pages viewed and links clicked. Analytics and advertising storage are set to denied by default and are only enabled if you grant consent.',
  },
  { type: 'h3', text: 'What we do not collect' },
  {
    type: 'ul',
    items: [
      'We do not ask for Social Security numbers, insurance member numbers, or payment card details through this website.',
      'We do not knowingly collect information from children under 13.',
      'We do not currently operate a patient portal, an online booking system, or an online payment system.',
    ],
  },

  { type: 'h2', text: 'How we use information' },
  {
    type: 'ul',
    items: [
      'To send the opening updates you asked for, including the confirmed opening date, provider introductions, service announcements, and early scheduling information.',
      'To respond to your inquiry.',
      'To operate, secure, and improve the website, including preventing spam and abuse.',
      'To comply with legal obligations.',
    ],
  },
  {
    type: 'p',
    text: 'We do not sell your personal information, and we do not share it with third parties for their own marketing purposes.',
  },

  { type: 'h2', text: 'Consent for email and text messages' },
  {
    type: 'p',
    text: 'Email updates and text message updates are separate permissions, and neither is pre-selected. You must actively check each box. Consenting to email updates is required to join the opening list, because the list is delivered by email. Text messages are entirely optional.',
  },
  {
    type: 'p',
    text: 'You can withdraw either permission at any time. Use the unsubscribe link in any email, reply STOP to any text message, or write to us and we will remove you. Message and data rates may apply to text messages, and message frequency varies.',
  },

  { type: 'h2', text: 'Service providers' },
  {
    type: 'p',
    text: 'We use third parties to operate the site, including a hosting provider, an email delivery provider that sends form notifications to the practice, and, subject to your consent, an analytics provider. These providers process information on our behalf and are not permitted to use it for their own purposes.',
  },
  {
    type: 'p',
    text: 'The interactive map on our location pages is provided by Google and loads only after you click to load it. If you choose to load it, Google may set cookies and receive information about your visit under its own privacy policy.',
  },

  { type: 'h2', text: 'Cookies and tracking' },
  {
    type: 'p',
    text: 'Strictly necessary cookies may be used to operate the site securely. Analytics and advertising storage default to denied and are only enabled with your consent. Most browsers let you refuse or delete cookies, and the site remains usable if you do.',
  },

  { type: 'h2', text: 'Data retention' },
  {
    type: 'p',
    text: 'Opening list information is kept until you unsubscribe or ask us to delete it, or until it is no longer needed for the purpose you provided it. Inquiry messages are retained for as long as needed to handle your question and to keep a reasonable record of correspondence. Server logs are retained for a limited period.',
  },

  { type: 'h2', text: 'Security' },
  {
    type: 'p',
    text: 'The site is served over HTTPS, form submissions are validated and processed on the server, and access to submitted information is limited to people who need it. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.',
  },

  { type: 'h2', text: 'Your choices and rights' },
  {
    type: 'ul',
    items: [
      'Ask what information we hold about you.',
      'Ask us to correct information that is wrong.',
      'Ask us to delete information we hold about you.',
      'Withdraw consent for email or text updates at any time.',
      'Opt out of analytics through your browser or by declining consent.',
    ],
  },
  {
    type: 'p',
    text: `To make a request, email ${email}. We may need to verify your identity before acting on a request. Depending on where you live, you may have additional rights under state privacy law.`,
  },

  { type: 'h2', text: 'Links to other websites' },
  {
    type: 'p',
    text: `This site links to other websites, including ${parentOrganization}. We are not responsible for the privacy practices or content of sites we do not operate.`,
  },

  { type: 'h2', text: 'Changes to this policy' },
  {
    type: 'p',
    text: 'We may update this policy as the practice opens and as our systems change. The effective date at the top of this page will change when we do, and material changes will be highlighted.',
  },

  { type: 'h2', text: 'Contact us' },
  {
    type: 'p',
    text: `${practiceName}, ${address.line1}, ${address.city}, ${address.state} ${address.postalCode}. Email ${email}.`,
  },
]

export default function Page() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Privacy Policy"
      lede="What this website collects, how it is used, and what you can ask us to do about it."
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Privacy Policy', path: PATH },
      ]}
      seo={{ name: TITLE, description: DESCRIPTION, path: PATH }}
      blocks={blocks}
      hideCta
      aside={
        <PlaceholderNote label="Required before launch: legal review">
          This policy has been drafted to describe the website as actually built and must be
          reviewed by counsel before publication. Confirm: applicable state privacy law obligations
          (including Delaware Personal Data Privacy Act applicability and thresholds), the named
          hosting, email, and analytics processors, retention periods, the data subject request
          process and response times, the Notice of Privacy Practices URL, whether a cookie consent
          banner is legally required, and SMS consent language against TCPA and CTIA requirements.
          Owner: Director of Marketing and Communications with legal counsel.
        </PlaceholderNote>
      }
      related={[
        { label: 'Website Terms', href: '/website-terms' },
        { label: 'Accessibility Statement', href: '/accessibility-statement' },
        { label: 'Website Disclaimer', href: '/website-disclaimer' },
      ]}
    />
  )
}
