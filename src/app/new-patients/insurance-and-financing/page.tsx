import type { Metadata } from 'next'
import { ProsePage, type Block } from '@/components/ProsePage'
import { PlaceholderNote } from '@/components/Ui'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'Insurance and Financing'
const DESCRIPTION =
  'Smile Studio of Rehoboth in Rehoboth Beach, DE offers courtesy insurance billing. We are out of network while in-network options are evaluated, and we submit your claim for you.'
const PATH = '/new-patients/insurance-and-financing'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const blocks: Block[] = [
  {
    type: 'note',
    text: 'We are not currently in network with any dental plan. We offer courtesy billing, which means we submit your claim to your insurer for you. In-network participation is being evaluated, and no plan will be named here until a contract is signed.',
  },
  {
    type: 'p',
    text: 'Dental costs are one of the main reasons people postpone care, and dental insurance is one of the more confusing products a person is expected to understand. Here is exactly where we stand, in plain terms.',
  },

  { type: 'h2', text: 'What courtesy billing means' },
  {
    type: 'p',
    text: 'Two phrases get used almost interchangeably and they are not the same thing. "We take your insurance" usually means a practice is in network, having signed a contract with your insurer that sets discounted fees. "We bill your insurance" means the practice submits the paperwork on your behalf. We do the second, not the first.',
  },
  {
    type: 'p',
    text: 'In practice: you do not have to file your own claim. We prepare it and send it to your insurer. Because we are out of network, your plan may reimburse at a different rate than it would for a practice it holds a contract with, and the difference is your responsibility. Out of network does not mean not covered. It usually means covered differently, and how differently depends entirely on your plan.',
  },
  {
    type: 'p',
    text: 'We would rather you hear that from us now than discover it from an explanation of benefits later.',
  },

  { type: 'h2', text: 'Why we are starting here' },
  {
    type: 'p',
    text: 'Joining a network is a contract, and the terms differ considerably between insurers. We are evaluating those options rather than signing whatever is quickest in order to advertise a longer list of plan names before opening. If and when we join a network, it will be named on this page, and not a day before the contract is executed.',
  },

  { type: 'h2', text: 'What is not settled yet' },
  {
    type: 'ul',
    items: [
      'Which networks, if any, the practice will join',
      'Whether your benefit is paid to us or reimbursed directly to you, which varies by plan',
      'Whether payment is due in full at the time of service',
      'Whether an in-house membership plan will be offered for patients without insurance',
      'Which third-party financing options will be available',
      'The fee schedule, and accepted payment methods',
    ],
  },
  {
    type: 'p',
    text: 'Our scheduling team can answer these for your specific situation when they call to confirm your appointment, and every one of them will be published here before we open. Opening list subscribers will hear when it happens.',
  },

  { type: 'h2', text: 'How we will handle costs' },
  {
    type: 'p',
    text: 'You will have written costs before treatment is scheduled. Where insurance is involved, that estimate will show what we expect the plan to cover and what we expect to remain your responsibility.',
  },
  {
    type: 'p',
    text: 'An estimate is an estimate. Coverage depends on your specific plan, your annual maximum, what you have already used this year, waiting periods, and how the insurer classifies a given procedure. Any practice that tells you exactly what insurance will pay before the claim is processed is guessing, and we would rather say so.',
  },
  {
    type: 'p',
    text: 'If an estimate changes, you will hear about it before the work happens rather than on the invoice.',
  },

  { type: 'h2', text: 'A few things worth knowing about dental insurance' },
  {
    type: 'p',
    text: 'None of this is specific to us, and all of it is worth understanding before you need it.',
  },
  {
    type: 'ul',
    items: [
      'Most dental plans have an annual maximum, and it is often lower than people expect. Once it is used, further treatment in that plan year is generally your responsibility.',
      'Benefits usually reset each plan year and unused benefit does not carry over. Where a treatment plan can reasonably be sequenced across two plan years, that is worth discussing.',
      'Many plans have waiting periods for major treatment after enrolment.',
      'Being "in network" affects the fee, not the quality of care. This is worth repeating because it is the single most misunderstood point, and it is directly relevant to us: out of network does not mean not covered.',
      'A pre-treatment estimate submitted to your insurer before major work is often the clearest way to find out what will actually be paid. Where a case warrants it, we will submit one.',
    ],
  },

  { type: 'h2', text: 'If you do not have dental insurance' },
  {
    type: 'p',
    text: 'A substantial number of adults do not, and it should not be a barrier to being seen. Whether we will offer an in-house membership plan has not been decided. If we do, it will be described plainly, with what it includes, what it does not, and what it costs.',
  },
  {
    type: 'p',
    text: 'What we can commit to now is transparency: you will know the cost before you agree to treatment, and treatment that can be staged over time will be offered that way rather than presented as all or nothing.',
  },

  { type: 'h2', text: 'What we will not do' },
  {
    type: 'ul',
    items: [
      'Claim to "accept most insurance" without being able to substantiate it.',
      'List a named plan before participation is verified.',
      'Present an estimate as a guarantee of coverage.',
      'Advertise a discount or new-patient offer without stating its conditions and expiry.',
    ],
  },
]

export default function Page() {
  return (
    <ProsePage
      eyebrow="New patients"
      title="Insurance and Financing"
      lede="What we can tell you today, what is still being confirmed, and how we will handle costs once we open."
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'New Patients', path: '/new-patients' },
        { name: 'Insurance and Financing', path: PATH },
      ]}
      seo={{ name: TITLE, description: DESCRIPTION, path: PATH }}
      blocks={blocks}
      aside={
        <PlaceholderNote label="Required before opening: insurance and financing">
          Courtesy billing confirmed 2026-10-21. Still to confirm and publish: assignment of
          benefits (paid to the practice or reimbursed to the patient), whether payment is due in
          full at the time of service, accepted payment methods, third-party financing providers,
          membership plan details if offered, and the pre-treatment estimate process. Do not
          publish any plan name until the contract is executed. Have counsel review this page
          against Delaware Board of Dentistry advertising rules before opening, since it now makes
          an affirmative statement about billing practice. Owner: Practice Operations with
          Marketing review.
        </PlaceholderNote>
      }
      related={[
        { label: 'New Patient Information', href: '/new-patients' },
        { label: 'What to Expect', href: '/new-patients/what-to-expect' },
        { label: 'Frequently Asked Questions', href: '/new-patients/faq' },
      ]}
    />
  )
}
