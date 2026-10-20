import type { Metadata } from 'next'
import { ProsePage, type Block } from '@/components/ProsePage'
import { PlaceholderNote } from '@/components/Ui'
import { pageMetadata } from '@/lib/seo'
import { serviceArea } from '@/config/practice'

const TITLE = 'Community Involvement'
const DESCRIPTION =
  'Smile Studio of Rehoboth is being built for the people who live in coastal Sussex County year-round, and for visitors who need care while they are at the shore.'
const PATH = '/about/community'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const blocks: Block[] = [
  {
    type: 'p',
    text: 'A resort town has two populations, and a business here has to decide which one it is really for. We are building for the people who are here in February.',
  },

  { type: 'h2', text: 'The year-round community comes first' },
  {
    type: 'p',
    text: 'Sussex County has grown considerably, and a large share of that growth is people who moved here deliberately, many of them to retire near the water. Those households need the ordinary, continuing work of dentistry: examinations, cleanings, restorations over time, and a practice that knows their history.',
  },
  {
    type: 'p',
    text: `That is why the office is on Plantations Road rather than downtown, why the planned hours are weekdays, and why the priority is comprehensive general dentistry. We expect to serve ${serviceArea.slice(0, -1).join(', ')}, and ${serviceArea[serviceArea.length - 1]}, along with the surrounding coastal Sussex County communities.`,
  },

  { type: 'h2', text: 'Visitors are welcome too' },
  {
    type: 'p',
    text: 'A crown that comes off on the second day of a beach week is a genuinely bad week, and a practice that can help is a useful thing for a resort community to have. Serving visitors who need urgent care is part of the plan, once we are open and our emergency procedures are confirmed.',
  },
  {
    type: 'p',
    text: 'The order matters, though. Serve the residents properly and the practice is stable enough to be there for the visitor as well.',
  },

  { type: 'h2', text: 'Hospitality and service workers' },
  {
    type: 'p',
    text: 'A significant part of the local workforce keeps hours that do not fit neatly around a standard dental schedule, and that is a real barrier to routine care. As we settle into the community we want to understand those constraints properly rather than assume we already do.',
  },

  { type: 'h2', text: 'How we intend to show up locally' },
  {
    type: 'p',
    text: 'We would rather commit to a small number of things consistently than appear at everything once. Sponsorship and outreach decisions have not been made yet, and we are not going to list aspirations here as though they were commitments.',
  },
  {
    type: 'p',
    text: 'What we can say is the principle: support local causes and events steadily rather than opportunistically, lead with what we are contributing rather than what we are asking for, and be specific about the places we mean.',
  },

  { type: 'h2', text: 'If you are a local organization' },
  {
    type: 'p',
    text: 'If you run a community organization, a school program, a nonprofit, or a local event and you would like to talk, please write to us. We are new here, and hearing what the community actually needs is more useful than deciding it ourselves.',
  },
]

export default function Page() {
  return (
    <ProsePage
      eyebrow="Community"
      title="Built for the People Who Live Here"
      lede="A dental practice in a beach town has to choose who it is for. We are choosing the year-round community, and welcoming everybody else."
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Community', path: PATH },
      ]}
      seo={{ name: TITLE, description: DESCRIPTION, path: PATH }}
      blocks={blocks}
      aside={
        <PlaceholderNote label="Required before publication: community commitments">
          No sponsorships, partnerships, or community programs have been confirmed. Do not add
          named organizations, events, or donation claims to this page until each is agreed in
          writing. Owner: Director of Marketing and Communications.
        </PlaceholderNote>
      }
      related={[
        { label: 'About Smile Studio of Rehoboth', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
      ]}
    />
  )
}
