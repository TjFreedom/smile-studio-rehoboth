import type { Metadata } from 'next'
import { ProsePage, type Block } from '@/components/ProsePage'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'Office Technology'
const DESCRIPTION =
  'The dental technology confirmed for Smile Studio of Rehoboth in Rehoboth Beach, DE, including digital X-rays, intraoral photography, digital scanning, and an i-CAT CBCT scanner.'
const PATH = '/our-new-office/technology'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const blocks: Block[] = [
  {
    type: 'note',
    text: 'This is the confirmed equipment list for the practice. It is not installed yet, because the office is still being built, so nothing here should be read as describing a room you could walk into today. These are the systems that will be in use when we open.',
  },
  {
    type: 'p',
    text: 'Dental websites tend to describe technology in a way that says very little. "State-of-the-art" appears on practices with equipment spanning twenty years of vintage, which is precisely why we are not going to use the phrase.',
  },
  {
    type: 'p',
    text: 'Technology is worth discussing when it changes something for the patient: fewer visits, less discomfort, a clearer explanation, or a better-fitting result. Here is what we are putting in, and what each thing actually changes.',
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

  { type: 'h2', text: 'i-CAT cone beam CT' },
  {
    type: 'p',
    text: 'A CBCT scanner produces a three-dimensional image of the jaws, rather than the flat picture an ordinary dental X-ray gives. The difference matters when the question is about something a flat image cannot answer: how much bone is available for an implant and exactly where the nerve runs, the shape of a root canal system that has not responded to treatment, an impacted tooth, or the structure of the airway.',
  },
  {
    type: 'p',
    text: 'Planning an implant from a 3D scan rather than a 2D film is the clearest example. The position can be worked out before the appointment rather than judged during it, which is better for the result and usually shorter for you.',
  },
  {
    type: 'p',
    text: 'A CBCT scan involves more radiation than a routine dental X-ray, though considerably less than a medical CT. It is not part of a check-up and we will not scan you because the machine is there. It is used when a specific clinical question needs it, and we will tell you what that question is before we take it.',
  },

  { type: 'h2', text: 'What we will say about it, and when' },
  {
    type: 'p',
    text: 'As each system is commissioned, this page will name it by manufacturer and model. Where a piece of technology is genuinely useful only for a narrow set of cases, we will say that rather than implying it transforms every appointment: the CBCT scanner above is exactly that kind of equipment.',
  },
  {
    type: 'p',
    text: 'What we will not do is list impressive-sounding equipment we are not actually buying, or describe technology as installed and in use while the office is still a building site.',
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
      related={[
        { label: 'Office Features', href: '/our-new-office/office-features' },
        { label: 'Construction Updates', href: '/our-new-office/construction-updates' },
        { label: 'Our Approach', href: '/about/our-approach' },
      ]}
    />
  )
}
