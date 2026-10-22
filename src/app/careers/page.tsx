import type { Metadata } from 'next'
import { ProsePage, type Block } from '@/components/ProsePage'
import { PlaceholderNote } from '@/components/Ui'
import { pageMetadata } from '@/lib/seo'
import { affiliationLabel, email, parentOrganization, practiceName } from '@/config/practice'

const TITLE = 'Careers'
const DESCRIPTION =
  'Join a new dental practice in Rehoboth Beach, Delaware. Smile Studio of Rehoboth is building a clinical and front office team ahead of opening in late 2026.'
const PATH = '/careers'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const blocks: Block[] = [
  {
    type: 'p',
    text: `${practiceName} is a new practice under construction in Rehoboth Beach, and we are building the team before we open. That is a genuinely unusual opportunity: the culture of a practice is set in its first year, and the people who arrive first are the ones who set it.`,
  },

  { type: 'h2', text: 'Roles we expect to hire' },
  {
    type: 'ul',
    items: [
      'General dentists',
      'Dental hygienists',
      'Dental assistants',
      'Front office and patient coordination',
      'Practice management',
    ],
  },
  {
    type: 'note',
    text: 'Specific openings, compensation, benefits, and start dates have not been finalised. We are not going to advertise a role we cannot yet describe accurately. If you are interested, please write to us and we will contact you as positions are defined.',
    variant: 'info',
  },

  { type: 'h2', text: 'What we are building' },
  {
    type: 'p',
    text: 'A practice organized around the appointment rather than around throughput. Schedules with enough room in them that a normal visit stays on time. Treatment planning that is explained rather than presented. Clinical decisions made by the clinician in the room.',
  },
  {
    type: 'p',
    text: 'If you have worked somewhere that measures the day in production and calls a fifteen-minute hygiene appointment normal, you already know why that list is worth writing down.',
  },

  { type: 'h2', text: 'Being honest about the market' },
  {
    type: 'p',
    text: 'Rehoboth Beach is an excellent place to live and work, and it comes with real considerations that are better raised now than discovered later.',
  },
  {
    type: 'ul',
    items: [
      'Housing costs in coastal Sussex County are high relative to much of Delaware, and summer rentals are competitive.',
      'The pace is seasonal. Summer traffic is genuinely significant and it affects commuting.',
      'A new practice starts quiet. The first months are about building a patient base, not about a full schedule from day one.',
      'You would be helping to establish systems rather than inheriting them, which suits some people and frustrates others.',
    ],
  },
  {
    type: 'p',
    text: 'The wrong hire costs more than a slow hire, for us and for you. We would rather have this conversation properly.',
  },

  { type: 'h2', text: 'What we can offer' },
  {
    type: 'ul',
    items: [
      'A brand new, purpose-built office rather than a tired space with somebody else’s workflow baked in',
      'A voice in how the practice runs, at the point where that voice actually changes things',
      `The support of ${parentOrganization}, including operational infrastructure and a wider professional network`,
      'Living and working at the Delaware beaches, which is a real benefit and not a line of marketing copy',
      'Growth as the practice grows',
    ],
  },

  { type: 'h2', text: 'Getting in touch' },
  {
    type: 'p',
    text: `Write to ${email} with the subject line "Careers" and tell us what you do, what you are looking for, and what you would want to be different from your current role. A CV is welcome but the last question is the more useful one.`,
  },
  {
    type: 'p',
    text: `${practiceName} is ${affiliationLabel.toLowerCase()}. Some hiring is coordinated at the organization level, so you may hear from a ${parentOrganization} colleague as well as from the practice.`,
  },
]

export default function Page() {
  return (
    <ProsePage
      eyebrow="Careers"
      title="Help Build a New Practice"
      lede="We are hiring ahead of opening. The culture of a practice is set in its first year, and the people who arrive first are the ones who set it."
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Careers', path: PATH },
      ]}
      seo={{ name: TITLE, description: DESCRIPTION, path: PATH }}
      blocks={blocks}
      aside={
        <PlaceholderNote label="Required before publication: open roles">
          No specific openings, salary ranges, benefits, or start dates have been confirmed. Do not
          publish a named role until the position, compensation band, and benefits are approved.
          Confirm whether applications route to the practice or to Freedom Dental Health HR, and
          add the applicant tracking link to externalLinks.careers in src/config/practice.ts.
        </PlaceholderNote>
      }
      related={[
        { label: 'About Smile Studio of Rehoboth', href: '/about' },
        { label: `The ${parentOrganization} Connection`, href: '/about/freedom-dental-health' },
        { label: 'Our New Office', href: '/our-new-office' },
      ]}
    />
  )
}
