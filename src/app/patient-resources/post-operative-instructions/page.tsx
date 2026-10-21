import type { Metadata } from 'next'
import { ProsePage, type Block } from '@/components/ProsePage'
import { PlaceholderNote } from '@/components/Ui'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'Post-Operative Instructions'
const DESCRIPTION =
  'Aftercare guidance following dental treatment. Smile Studio of Rehoboth in Rehoboth Beach, DE will publish procedure-specific instructions before opening.'
const PATH = '/patient-resources/post-operative-instructions'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const blocks: Block[] = [
  {
    type: 'note',
    text: 'Smile Studio of Rehoboth is not yet open and has not treated any patients. If you have had treatment elsewhere and are looking for aftercare guidance, contact the practice that treated you. They know what was done, what was used, and what to expect, and their instructions take precedence over anything on this page.',
  },
  {
    type: 'p',
    text: 'Procedure-specific post-operative instructions will be published here before we open, and each set will be reviewed by a named provider before it goes live. Aftercare guidance is clinical content, and clinical content should carry a clinician’s name.',
  },

  { type: 'h2', text: 'What will be published here' },
  {
    type: 'ul',
    items: [
      'After a filling',
      'After a crown or bridge, both temporary and final',
      'After root canal treatment',
      'After a tooth extraction',
      'After periodontal treatment or a deep cleaning',
      'After implant surgery and after implant restoration',
      'After teeth whitening',
      'Caring for a nightguard, mouthguard, or oral appliance',
      'Caring for dentures and partial dentures',
    ],
  },

  { type: 'h2', text: 'General principles that apply after most dental treatment' },
  {
    type: 'p',
    text: 'The following is general education, not instructions for your specific treatment. Where it differs from what your own dentist told you, follow your dentist.',
  },
  { type: 'h3', text: 'While you are numb' },
  {
    type: 'p',
    text: 'Avoid eating and drinking anything hot until the anesthetic has fully worn off. It is very easy to bite your cheek, lip, or tongue without noticing, and easier still to burn yourself on something you cannot feel. Take particular care with children, who may chew a numb lip out of curiosity.',
  },
  { type: 'h3', text: 'Sensitivity' },
  {
    type: 'p',
    text: 'Some sensitivity to hot and cold after treatment is common and usually settles over days to weeks. Sensitivity that is getting worse rather than better, or pain that wakes you at night, is worth a call to the practice that treated you.',
  },
  { type: 'h3', text: 'Bleeding' },
  {
    type: 'p',
    text: 'Some oozing after an extraction or gum treatment is normal on the first day. Steady bleeding that does not slow with firm pressure on clean gauze is not, and should be reported promptly.',
  },
  { type: 'h3', text: 'Swelling' },
  {
    type: 'p',
    text: 'Mild swelling after surgical treatment often peaks around the second or third day and then improves. Swelling that increases after that point, spreads, or comes with fever or difficulty swallowing needs urgent attention. If breathing or swallowing is affected, call 911.',
  },
  { type: 'h3', text: 'Your bite' },
  {
    type: 'p',
    text: 'A new filling or crown should feel level when you bite. If one tooth hits first, or the bite feels tall, that is straightforward to adjust and worth having checked. Left alone, a high restoration can cause soreness and can fracture.',
  },
  { type: 'h3', text: 'Keeping the area clean' },
  {
    type: 'p',
    text: 'Healing tissue still needs to be kept clean, usually gently and often with a warm salt water rinse rather than vigorous brushing. Your provider will tell you what applies to your situation and when to resume normal brushing and flossing.',
  },

  { type: 'h2', text: 'When to seek urgent care' },
  {
    type: 'ul',
    items: [
      'Difficulty breathing or swallowing. Call 911.',
      'Swelling that is spreading, especially toward the eye or down the neck.',
      'Bleeding that does not stop with firm pressure.',
      'Pain that is worsening after the third day rather than improving.',
      'Fever alongside facial swelling.',
      'A reaction to a prescribed medication.',
    ],
  },
]

export default function Page() {
  return (
    <ProsePage
      eyebrow="Patient resources"
      title="Post-Operative Instructions"
      lede="Procedure-specific aftercare will be published here before we open. In the meantime, here is general guidance and a clear note about who to contact."
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Patient Resources', path: '/patient-resources' },
        { name: 'Post-Operative Instructions', path: PATH },
      ]}
      seo={{ name: TITLE, description: DESCRIPTION, path: PATH }}
      blocks={blocks}
      disclaimer
      aside={
        <PlaceholderNote label="Required before opening: post-op instructions">
          Draft and publish procedure-specific instructions for each service the practice confirms.
          Each set requires named provider review with credentials and a review date before
          publication, and printable accessible PDF versions for chairside handout. Do not publish
          any set that clinical leadership has not signed off. Owner: Clinical Lead.
        </PlaceholderNote>
      }
      related={[
        { label: 'Dental Emergency Information', href: '/patient-resources/dental-emergency-information' },
        { label: 'Patient Resources', href: '/patient-resources' },
        { label: 'Our Services', href: '/services' },
      ]}
    />
  )
}
