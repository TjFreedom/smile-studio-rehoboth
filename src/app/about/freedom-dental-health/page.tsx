import type { Metadata } from 'next'
import { ProsePage, type Block } from '@/components/ProsePage'
import { pageMetadata } from '@/lib/seo'
import { affiliationFaqs } from '@/content/faqs'
import { parentOrganization, parentOrganizationUrl, practiceName } from '@/config/practice'

const TITLE = parentOrganization
const DESCRIPTION =
  'Smile Studio of Rehoboth is a Freedom Dental Health Practice. What the affiliation means for your care, and what it does not.'
const PATH = '/about/freedom-dental-health'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const blocks: Block[] = [
  {
    type: 'p',
    text: `${practiceName} is part of ${parentOrganization}, a Delaware-based network of dental and healthcare professionals working together to provide comprehensive, patient-centered care, with practices in Delaware, Pennsylvania, and Maryland.`,
  },
  {
    type: 'p',
    text: 'People are reasonably wary when they see that a dental practice belongs to a larger organization. The concern is usually the same: will decisions about my care be made by someone I have never met, in a building I have never visited? It is a fair question and it deserves a direct answer.',
  },

  { type: 'h2', text: 'The practice is the front door' },
  {
    type: 'p',
    text: `${practiceName} is the practice you visit. The relationship you build is with the team here, your records live here, and clinical decisions are made in this office by the provider sitting with you.`,
  },
  {
    type: 'p',
    text: 'The network sits behind that, handling the parts of running a practice that have nothing to do with your appointment.',
  },

  { type: 'h2', text: 'What the affiliation actually provides' },
  {
    type: 'ul',
    items: [
      'Administrative and operational support, so the clinical team spends its attention on patients rather than on back-office work.',
      'A route to specialty collaboration when a case calls for periodontics, endodontics, oral surgery, orthodontics, or prosthodontics.',
      'Coordinated records and referrals between affiliated practices, so you are not retelling your history from scratch.',
      'Shared standards, continuing education, and clinical resources.',
      'The financial backing for a new practice to invest properly in its equipment and its team from the first day.',
      'Continuity. A practice with organizational support behind it is more likely to still be here in ten years, which matters for something as long-term as dental care.',
    ],
  },

  { type: 'h2', text: 'What it does not mean' },
  {
    type: 'p',
    text: 'It does not mean every service offered anywhere in the network is available in Rehoboth Beach. Some specialty care happens at other locations, and some of those locations are a substantial drive from the beach.',
  },
  {
    type: 'p',
    text: 'Where a referral involves real travel, we will tell you how far before you commit to it. A referral that looks convenient on a website and turns out to be a ninety-minute drive is not a service, it is a surprise.',
  },
  {
    type: 'note',
    text: 'We will not advertise a service on this website that is not performed at the Rehoboth Beach office. Network services are labeled as network services, every time.',
  },

  { type: 'h2', text: 'Specialty partners within the network' },
  {
    type: 'p',
    text: 'Patients here may need care that affiliated specialty practices provide, including TMJ, sleep, and airway care, and pediatric airway and tongue tie care. Where those services are relevant we will name the practice, explain the handoff, and set honest expectations about location.',
  },
  {
    type: 'p',
    text: 'Which of those services, if any, will be delivered at the Rehoboth Beach office, and whether any visiting specialists will hold sessions here, has not been determined. That will be confirmed and published before opening.',
  },

  { type: 'h2', text: 'Learn more' },
  {
    type: 'p',
    text: `You can read about the wider organization at ${parentOrganizationUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}. For anything about care in Rehoboth Beach, this website and this team are the right place to ask.`,
  },
]

export default function Page() {
  return (
    <ProsePage
      eyebrow="A Freedom Dental Health Practice"
      title="Independent Care, Supported by a Wider Network"
      lede="What the affiliation means for your care, and just as importantly, what it does not."
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: parentOrganization, path: PATH },
      ]}
      seo={{ name: TITLE, description: DESCRIPTION, path: PATH }}
      blocks={blocks}
      faqs={affiliationFaqs}
      related={[
        { label: 'About Smile Studio of Rehoboth', href: '/about' },
        { label: 'Our Services', href: '/services' },
        { label: 'Referring Providers', href: '/patient-resources/referring-providers' },
      ]}
    />
  )
}
