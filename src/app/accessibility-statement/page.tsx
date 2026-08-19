import type { Metadata } from 'next'
import { ProsePage, type Block } from '@/components/ProsePage'
import { pageMetadata } from '@/lib/seo'
import { email, practiceName } from '@/config/practice'

const TITLE = 'Accessibility Statement'
const DESCRIPTION =
  'Smile Studio of Rehoboth is committed to WCAG 2.2 Level AA accessibility. How this website was built, known limitations, and how to report a barrier.'
const PATH = '/accessibility-statement'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const blocks: Block[] = [
  { type: 'p', text: 'Last reviewed: August 19, 2026' },
  {
    type: 'p',
    text: `${practiceName} is committed to making this website usable by as many people as possible, including people who use screen readers, keyboard navigation, magnification, or other assistive technology. A meaningful share of our future patients are over sixty, so legibility and ease of use are practical requirements here rather than a compliance footnote.`,
  },

  { type: 'h2', text: 'Standard we aim to meet' },
  {
    type: 'p',
    text: 'This website has been built to conform to the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. We consider that a working commitment rather than a one-off certification, and we re-test as the site changes.',
  },

  { type: 'h2', text: 'What we have done' },
  {
    type: 'ul',
    items: [
      'Semantic HTML with correct landmark regions and one clear heading hierarchy per page.',
      'A skip-to-content link as the first focusable element on every page.',
      'Full keyboard operability, with a visible focus indicator that is never removed.',
      'Text contrast that meets or exceeds 4.5 to 1 for body text and 3 to 1 for large text and interface components.',
      'No information conveyed by colour alone. Status and error messages carry text and an icon as well as colour.',
      'Form fields with persistent visible labels, programmatically associated hints, and errors announced through a live region and linked to the field they describe.',
      'Touch targets of at least 44 by 44 pixels, with primary buttons at 48 pixels or larger.',
      'Text that reflows without horizontal scrolling down to a 320 pixel viewport, and remains usable at 200 percent zoom.',
      'Respect for the reduced motion preference, which disables animation and smooth scrolling.',
      'Alternative text on meaningful images, and decorative images hidden from assistive technology.',
      'Expandable menus and accordions built from native elements or with correct ARIA state, so their state is announced.',
      'Wide content such as tables scrolls within its own container rather than forcing the page sideways.',
      'The interactive map loads only on request, and the address is available as real text regardless.',
    ],
  },

  { type: 'h2', text: 'Known limitations' },
  {
    type: 'p',
    text: 'We would rather list these than imply the site is flawless.',
  },
  {
    type: 'ul',
    items: [
      'The embedded Google map, if you choose to load it, is a third-party component whose accessibility we do not control. The address and directions are provided as text so the map is never the only route to that information.',
      'Automated testing tools catch only part of what matters. Manual keyboard and screen reader testing has informed this build and continues as pages are added.',
      'Content that does not exist yet, including provider biographies, office photography, and downloadable forms, has not been tested. Any PDF we publish will be a tagged, accessible PDF.',
    ],
  },

  { type: 'h2', text: 'Physical accessibility of the office' },
  {
    type: 'p',
    text: 'The office is under construction, and we have deliberately not published claims about parking, entrances, or interior access. Publishing an unverified accessibility claim is worse than publishing nothing: someone who needs step-free access and arrives to find something different has been let down by this website.',
  },
  {
    type: 'p',
    text: 'Before we open, we will publish specific details covering parking and accessible spaces, the distance and surface from parking to the door, whether entry is step-free, door widths, restroom accessibility, and operatory access. If you have a particular requirement and want to know now whether we will be able to meet it, please ask.',
  },

  { type: 'h2', text: 'Tell us about a barrier' },
  {
    type: 'p',
    text: `If you encounter something on this website you cannot use, we want to hear about it, and we treat it as a fault rather than a complaint. Email ${email} with the page address, what you were trying to do, and the browser or assistive technology you were using if you know it.`,
  },
  {
    type: 'p',
    text: 'We will acknowledge your message, tell you what we find, and give you the information you were after by another route while any fix is made.',
  },
  {
    type: 'note',
    text: 'We have deliberately not committed to a specific response time here, because the practice is not yet staffed and a promise we cannot keep would help nobody. A response standard will be published on this page when the practice opens.',
  },

  { type: 'h2', text: 'Ongoing work' },
  {
    type: 'p',
    text: 'Accessibility is reviewed whenever pages are added or significantly changed, and a full review is scheduled before the practice opens, once provider content, photography, and patient forms are in place.',
  },
]

export default function Page() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Accessibility Statement"
      lede="Our commitment, what we have built, the limitations we know about, and how to tell us when something does not work."
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Accessibility Statement', path: PATH },
      ]}
      seo={{ name: TITLE, description: DESCRIPTION, path: PATH }}
      blocks={blocks}
      hideCta
      related={[
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Website Terms', href: '/website-terms' },
        { label: 'Contact', href: '/contact' },
      ]}
    />
  )
}
