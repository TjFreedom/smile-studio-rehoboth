import type { Metadata } from 'next'
import { ProsePage, type Block } from '@/components/ProsePage'
import { PlaceholderNote } from '@/components/Ui'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'Office Features'
const DESCRIPTION =
  'What is being designed into the new Smile Studio of Rehoboth office in Rehoboth Beach, DE, and what has not been finalised yet.'
const PATH = '/our-new-office/office-features'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const blocks: Block[] = [
  {
    type: 'note',
    text: 'The office is under construction. Everything below is a design intention, not a description of a finished space. We will replace this page with an accurate account, and photographs, once the build-out is complete.',
    variant: 'info',
  },
  {
    type: 'p',
    text: 'The word "studio" sets an expectation about the space, and a new practice gets exactly one chance to design that space properly rather than adapt around something that already exists.',
  },

  { type: 'h2', text: 'A purpose-built professional space' },
  {
    type: 'p',
    text: 'The office is being built in Plantations Professional Park rather than converted from retail. That matters more than it sounds. A dental practice has particular requirements for plumbing, electrical supply, air handling, and sterilisation workflow, and a building designed for professional use accommodates them without awkward compromises.',
  },
  {
    type: 'p',
    text: 'It also allows the operatories to be laid out deliberately, rather than fitted around somebody else’s floor plan.',
  },

  { type: 'h2', text: 'What we are designing for' },
  { type: 'h3', text: 'A calm arrival' },
  {
    type: 'p',
    text: 'The first ninety seconds of a dental visit set the tone for the rest of it. We want an arrival that feels unhurried: natural light, room to sit without being on top of a stranger, and a front desk positioned so a private conversation can stay private.',
  },
  { type: 'h3', text: 'Sound' },
  {
    type: 'p',
    text: 'Sound is the most underestimated factor in dental anxiety, and it is far easier to address during construction than afterwards. Separation between the waiting area and treatment rooms is a design priority.',
  },
  { type: 'h3', text: 'Privacy' },
  {
    type: 'p',
    text: 'Conversations about treatment and cost should not be overheard. That shapes where the front desk sits, where consultations happen, and how the operatories are separated.',
  },
  { type: 'h3', text: 'A dedicated sterilisation area' },
  {
    type: 'p',
    text: 'Instrument processing follows a one-directional workflow from contaminated to clean. Designing that properly from the start is straightforward. Retrofitting it is not.',
  },
  { type: 'h3', text: 'Accessibility' },
  {
    type: 'p',
    text: 'Given how many of our future patients will be over sixty, accessible access is a basic requirement rather than a feature. We will describe exactly what the finished building provides once it can be verified on site, and we will be specific rather than vague about it.',
  },

  { type: 'h2', text: 'What has not been finalised' },
  {
    type: 'ul',
    items: [
      'The final number of operatories',
      'Whether a dedicated consultation room will be included',
      'Parking layout, accessible space locations, and the walk from parking to the entrance',
      'Entrance type, door widths, and step-free access details',
      'Restroom accessibility',
      'Suite number and interior signage',
      'Amenities in the waiting area',
    ],
  },
  {
    type: 'p',
    text: 'Each of these will be described here once it is real. A patient who needs step-free access and arrives to find something different has been let down by our website, and that is a failure we can avoid by simply not guessing.',
  },
]

export default function Page() {
  return (
    <ProsePage
      eyebrow="Our new office"
      title="What We Are Building Into the Space"
      lede="Design intentions for the new office, and an honest list of what has not been decided yet."
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Our New Office', path: '/our-new-office' },
        { name: 'Office Features', path: PATH },
      ]}
      seo={{ name: TITLE, description: DESCRIPTION, path: PATH }}
      blocks={blocks}
      aside={
        <PlaceholderNote label="Required before opening: office description">
          Replace design intentions with a verified description of the finished space. Confirm:
          operatory count, consultation room, sterilisation area, waiting area capacity and
          amenities, parking count and accessible spaces, entrance and door specification, restroom
          accessibility, and suite number. Add completed-office photography per
          docs/PHOTOGRAPHY-SHOT-LIST.md. Owner: Practice Operations.
        </PlaceholderNote>
      }
      related={[
        { label: 'Technology', href: '/our-new-office/technology' },
        { label: 'Construction Updates', href: '/our-new-office/construction-updates' },
        { label: 'Directions and Parking', href: '/contact/directions' },
      ]}
    />
  )
}
