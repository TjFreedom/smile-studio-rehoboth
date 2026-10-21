import type { Metadata } from 'next'
import { ProsePage, type Block } from '@/components/ProsePage'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'Our Approach to Dental Care'
const DESCRIPTION =
  'How Smile Studio of Rehoboth approaches dental care: unhurried appointments, plain-language explanations, written costs, and treatment planned at your pace.'
const PATH = '/about/our-approach'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const blocks: Block[] = [
  {
    type: 'p',
    text: 'A dental practice is a set of small operating decisions that patients only notice when they go wrong. How long an appointment is scheduled for. Whether the cost arrives before or after the treatment. Whether a question gets a real answer or a reassuring noise. These are the ones we have made.',
  },

  { type: 'h2', text: 'We explain before we treat' },
  {
    type: 'p',
    text: 'Nothing gets started without an explanation you actually followed. That means plain language first and the technical term second, defined when we use it. If you have been handed a treatment plan full of tooth numbers and abbreviations before, you know why this matters.',
  },
  {
    type: 'p',
    text: 'Most dental situations have more than one reasonable answer. They differ in cost, in how long they are likely to last, and in how much natural tooth they preserve. You will hear the alternatives with their trade-offs, not only the option we would pick.',
  },

  { type: 'h2', text: 'Costs come in writing, first' },
  {
    type: 'p',
    text: 'You will have written costs before treatment is scheduled, with the sequence laid out so you know what happens first and why. Where insurance is involved we will tell you what we expect it to cover and what remains, and we will be clear that an estimate is an estimate until the claim is processed.',
  },
  {
    type: 'note',
    text: 'We will not quote a fee we cannot honor, and we will not describe an insurance outcome as certain when it is not. If an estimate changes, you hear about it before the work happens, not on the invoice.',
  },

  { type: 'h2', text: 'The schedule has room in it' },
  {
    type: 'p',
    text: 'Running late is usually a scheduling decision wearing a disguise. If every appointment is booked to the minute, one complication pushes the rest of the day back and everybody after you pays for it. We are building the schedule with enough slack that a normal appointment stays on time.',
  },

  { type: 'h2', text: 'A gap in care is information, not a failing' },
  {
    type: 'p',
    text: 'People stop going to the dentist for ordinary reasons: a move, a job change, a bad experience, cost, or simply life getting in the way. None of those are moral failings, and none of them are useful to lecture about.',
  },
  {
    type: 'p',
    text: 'If it has been years, tell us. It changes how we plan the first visit, not how we think about you. The first appointment can be a conversation only, with no treatment at all, if that is what makes it possible to walk through the door.',
  },

  { type: 'h2', text: 'We go at your pace' },
  {
    type: 'p',
    text: 'A long treatment plan can be sequenced. Urgent things first, then the rest in an order that fits your circumstances. You are allowed to say not yet, and you are allowed to change your mind.',
  },
  {
    type: 'p',
    text: 'During treatment, a raised hand stops us. That is not a courtesy we extend on request, it is how the appointment runs by default.',
  },

  { type: 'h2', text: 'We say when something is outside our lane' },
  {
    type: 'p',
    text: 'A general dental practice is very good at a wide range of things and is not the right place for everything. Complex surgical cases, some root canal treatment, orthodontics, and certain medical findings belong with a specialist or with your physician.',
  },
  {
    type: 'p',
    text: 'Where that is true we will tell you, coordinate the referral, and be honest about how far you would need to travel. Keeping a case in-house that should have gone elsewhere serves the practice, not the patient.',
  },

  { type: 'h2', text: 'What we do not promise' },
  {
    type: 'ul',
    items: [
      'That treatment will be pain-free. We can describe the comfort measures available and we can stop when you need us to. We cannot promise how you will feel.',
      'That a restoration will last a specific number of years. We can tell you what the published ranges look like and what affects longevity in your particular case.',
      'That insurance will cover a given amount. We can tell you what we expect and what we have verified.',
      'A specific cosmetic result before we have examined you and planned it with you.',
    ],
  },
]

export default function Page() {
  return (
    <ProsePage
      eyebrow="Our approach"
      title="How We Intend to Work"
      lede="We are a new practice, which means we get to decide how we operate before habits form. Here is what we have committed to, written down while it is still easy to hold ourselves to it."
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Our Approach', path: PATH },
      ]}
      seo={{ name: TITLE, description: DESCRIPTION, path: PATH }}
      blocks={blocks}
      related={[
        { label: 'What to Expect at a First Visit', href: '/new-patients/what-to-expect' },
        { label: 'Whole-Person Care', href: '/about/whole-person-care' },
        { label: 'Insurance and Financing', href: '/new-patients/insurance-and-financing' },
        { label: 'Our Services', href: '/services' },
      ]}
    />
  )
}
