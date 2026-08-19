import type { Metadata } from 'next'
import { ProsePage, type Block } from '@/components/ProsePage'
import { PlaceholderNote } from '@/components/Ui'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'Insurance and Financing'
const DESCRIPTION =
  'Insurance participation and payment options for Smile Studio of Rehoboth in Rehoboth Beach, DE. Plans and financing will be confirmed before the office opens.'
const PATH = '/new-patients/insurance-and-financing'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const blocks: Block[] = [
  {
    type: 'note',
    text: 'Insurance participation has not been confirmed. We are not going to publish a list of plans we have not verified, and we will not describe ourselves as accepting a plan until the contract is in place. The confirmed list will be published here before opening.',
  },
  {
    type: 'p',
    text: 'Dental costs are one of the main reasons people postpone care, and dental insurance is one of the more confusing products a person is expected to understand. Here is how we intend to handle both, and what we can honestly tell you at this stage.',
  },

  { type: 'h2', text: 'What is not confirmed yet' },
  {
    type: 'ul',
    items: [
      'Which insurance plans the practice will be in network with',
      'Whether an in-house membership plan will be offered for patients without insurance',
      'Which third-party financing options will be available',
      'The fee schedule',
      'Payment methods accepted',
    ],
  },
  {
    type: 'p',
    text: 'Every one of those will be published on this page before opening. Opening list subscribers will hear when it happens.',
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
      'Being "in network" affects the fee, not the quality of care. Out-of-network does not mean not covered, it usually means covered differently.',
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
          Confirm and publish: in-network plan list (verified contracts only), out-of-network
          policy, membership plan details if offered, third-party financing providers, accepted
          payment methods, and the pre-treatment estimate process. Do not publish any plan name
          until the contract is executed. Owner: Practice Operations with Marketing review.
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
