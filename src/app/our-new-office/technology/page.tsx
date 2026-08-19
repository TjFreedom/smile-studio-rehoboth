import type { Metadata } from 'next'
import { ProsePage, type Block } from '@/components/ProsePage'
import { PlaceholderNote } from '@/components/Ui'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'Office Technology'
const DESCRIPTION =
  'The dental technology planned for the new Smile Studio of Rehoboth office in Rehoboth Beach, DE. Equipment will be confirmed and named once it is installed.'
const PATH = '/our-new-office/technology'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const blocks: Block[] = [
  {
    type: 'note',
    text: 'No equipment has been installed. Nothing on this page should be read as a description of technology the practice currently has. We will name the specific systems, by manufacturer and model, once they are in the building and in use.',
  },
  {
    type: 'p',
    text: 'Dental websites tend to describe technology in a way that says very little. "State-of-the-art" appears on practices with equipment spanning twenty years of vintage, which is precisely why we are not going to use the phrase.',
  },
  {
    type: 'p',
    text: 'Technology is worth discussing when it changes something for the patient: fewer visits, less discomfort, a clearer explanation, or a better-fitting result. Here is what we are planning for, and what each thing would actually change.',
  },

  { type: 'h2', text: 'Digital X-rays' },
  {
    type: 'p',
    text: 'Digital sensors replace film. The image appears immediately, so it can be reviewed with you on a screen during the appointment rather than described from memory, and digital systems generally use a lower radiation dose than the film they replaced.',
  },
  {
    type: 'p',
    text: 'The practical benefit is mostly the conversation. It is much easier to understand a recommendation when you can see the thing being discussed.',
  },

  { type: 'h2', text: 'Intraoral photography' },
  {
    type: 'p',
    text: 'A small camera that photographs individual teeth. Being shown a cracked cusp is more useful than being told about one, and it makes second opinions easier because you leave with an image rather than an assertion.',
  },

  { type: 'h2', text: 'Digital scanning' },
  {
    type: 'p',
    text: 'A scanner captures the shape of your teeth digitally instead of using impression material. For most people the main benefit is straightforward: no tray of putty, and no gagging.',
  },
  {
    type: 'p',
    text: 'Digital impressions also travel to a laboratory instantly and can be more accurate for certain restorations, which can mean fewer adjustment appointments.',
  },

  { type: 'h2', text: 'What we will say about it, and when' },
  {
    type: 'p',
    text: 'When the equipment is installed, this page will name each system specifically and describe what it does in plain language. Where a piece of technology is genuinely useful for a narrow set of cases, we will say that rather than implying it transforms every appointment.',
  },
  {
    type: 'p',
    text: 'What we will not do is list impressive-sounding equipment we do not have, or describe technology as installed while it is still a line item on a purchase order.',
  },

  { type: 'h2', text: 'Technology is not the point' },
  {
    type: 'p',
    text: 'Good equipment in a rushed appointment produces a rushed result. The scanner does not decide whether the plan is right for you, and the camera does not explain the options. Technology supports careful work. It does not substitute for it.',
  },
]

export default function Page() {
  return (
    <ProsePage
      eyebrow="Our new office"
      title="Technology, Described Honestly"
      lede="What we are planning to install, what each thing would actually change for you, and why we are not calling anything state-of-the-art."
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Our New Office', path: '/our-new-office' },
        { name: 'Technology', path: PATH },
      ]}
      seo={{ name: TITLE, description: DESCRIPTION, path: PATH }}
      blocks={blocks}
      disclaimer
      aside={
        <PlaceholderNote label="Required before opening: technology inventory">
          Confirm the installed equipment list with clinical leadership, including manufacturer and
          model for imaging, scanning, and any chairside systems. Only name equipment that is
          physically installed and in clinical use. Remove any item that was planned but not
          purchased. Owner: Clinical Lead with Marketing review.
        </PlaceholderNote>
      }
      related={[
        { label: 'Office Features', href: '/our-new-office/office-features' },
        { label: 'Construction Updates', href: '/our-new-office/construction-updates' },
        { label: 'Our Approach', href: '/about/our-approach' },
      ]}
    />
  )
}
