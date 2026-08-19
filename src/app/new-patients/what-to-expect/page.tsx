import type { Metadata } from 'next'
import { ProsePage, type Block } from '@/components/ProsePage'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'What to Expect at Your First Visit'
const DESCRIPTION =
  'What a first visit at our new Rehoboth Beach, DE dental practice will involve: a conversation, a full examination, and a written plan.'
const PATH = '/new-patients/what-to-expect'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const blocks: Block[] = [
  {
    type: 'note',
    text: 'The office is under construction and is not yet seeing patients. This page describes how first visits are being planned. Appointment lengths and specific procedures will be confirmed before opening.',
    variant: 'info',
  },
  {
    type: 'p',
    text: 'A first dental appointment carries more weight than most. You are deciding whether to trust a practice, often while sitting in a chair that does not encourage clear thinking. Here is how we intend to structure it so that decision is easier.',
  },

  { type: 'h2', text: 'Before you arrive' },
  {
    type: 'p',
    text: 'Intake forms will be sent ahead of the appointment so you can complete them at home rather than in the waiting room. That is not just a convenience: rushed medical history forms are where important details get missed.',
  },
  { type: 'h3', text: 'What to bring' },
  {
    type: 'ul',
    items: [
      'Photo identification',
      'Your dental insurance information, if you have coverage',
      'A list of medications you take, including supplements',
      'The name and practice of your physician',
      'The name of your previous dental practice, if you have one, so we can request records',
      'Anything you want to ask about, written down. It is very easy to forget in the chair.',
    ],
  },

  { type: 'h2', text: 'The conversation comes first' },
  {
    type: 'p',
    text: 'The appointment starts with a conversation, sitting up, before any instruments appear. What brought you in, what has worked for you in the past and what has not, whether anything is bothering you right now, and what you would want to change if you could change one thing.',
  },
  {
    type: 'p',
    text: 'This is also the moment to tell us if you are anxious, if you have had a bad experience, if you have a strong gag reflex, or if there is anything that would make the visit harder. That is useful clinical information, not a confession.',
  },

  { type: 'h2', text: 'The examination' },
  {
    type: 'ol',
    items: [
      'A review of your medical history and medications, because both affect dental treatment and healing.',
      'Digital X-rays where they are clinically appropriate. If you have had images taken elsewhere within the last year, we can often request them rather than repeating them.',
      'An examination of every tooth, existing fillings and crowns, and the way your teeth meet when you bite.',
      'An assessment of your gums, including measurements around the teeth where indicated.',
      'A screening of the soft tissues of the mouth, throat, and neck.',
      'Photographs where they help explain a finding. Seeing it is usually clearer than hearing it described.',
    ],
  },

  { type: 'h2', text: 'Will I get a cleaning at the first visit?' },
  {
    type: 'p',
    text: 'Sometimes, and sometimes not, and an honest practice tells you why. A cleaning for healthy gums and treatment for gum disease are different appointments requiring different amounts of time. Until the examination is done, nobody knows which one you need.',
  },
  {
    type: 'p',
    text: 'Where a cleaning can appropriately be done the same day, we will do it. Where you need something more involved, we will explain what and why, and schedule the right appointment rather than doing a partial job to tick a box.',
  },

  { type: 'h2', text: 'The plan' },
  {
    type: 'p',
    text: 'You leave with a written plan, in order of priority, with the reasoning for each item and the cost. Urgent things first, then the rest in an order that fits your circumstances.',
  },
  {
    type: 'p',
    text: 'If the plan is long, that is a sequencing conversation, not an ultimatum. You are allowed to say not yet.',
  },

  { type: 'h2', text: 'If you are anxious about being there' },
  {
    type: 'p',
    text: 'Dental anxiety is common and it is much easier to plan around when we know in advance. Tell us before the appointment, not during it.',
  },
  {
    type: 'ul',
    items: [
      'The first visit can be a conversation only, with no examination and no treatment, if that is what makes it possible.',
      'We can explain each step before it happens, or stay quiet if narration makes it worse. Both are fine.',
      'A raised hand stops us. That is how the appointment runs by default, not a special arrangement.',
      'You can bring someone with you.',
      'Breaks are always available, and asking for one is not an imposition.',
    ],
  },
  {
    type: 'p',
    text: 'What we will not do is promise you will not feel anything. We can describe the comfort measures available and we can stop when you need us to. Nobody can promise how another person will feel.',
  },

  { type: 'h2', text: 'How long will it take?' },
  {
    type: 'p',
    text: 'A comprehensive new patient examination takes longer than a routine check, because it includes a full assessment and a real conversation. Exact appointment lengths will be confirmed before opening, and we will tell you the length when you book rather than leaving you to guess.',
  },
]

export default function Page() {
  return (
    <ProsePage
      eyebrow="New patients"
      title="What to Expect at Your First Visit"
      lede="A conversation before an examination, an examination before a plan, and a plan before any treatment."
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'New Patients', path: '/new-patients' },
        { name: 'What to Expect', path: PATH },
      ]}
      seo={{ name: TITLE, description: DESCRIPTION, path: PATH }}
      blocks={blocks}
      disclaimer
      related={[
        { label: 'New Patient Information', href: '/new-patients' },
        { label: 'Insurance and Financing', href: '/new-patients/insurance-and-financing' },
        { label: 'Patient Forms', href: '/new-patients/patient-forms' },
        { label: 'Our Approach', href: '/about/our-approach' },
      ]}
    />
  )
}
