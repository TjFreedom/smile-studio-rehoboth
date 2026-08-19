import type { Metadata } from 'next'
import { ProsePage, type Block } from '@/components/ProsePage'
import { pageMetadata } from '@/lib/seo'

const TITLE = 'Whole-Person Dental Care'
const DESCRIPTION =
  'How Smile Studio of Rehoboth thinks about the connection between oral health, comfort, function, sleep, and breathing, and where the evidence actually stands.'
const PATH = '/about/whole-person-care'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const blocks: Block[] = [
  {
    type: 'p',
    text: 'Whole-person care is a phrase that gets used loosely in dental marketing, often to imply that dentistry can treat conditions it cannot. We want to be precise about what we mean by it, and equally precise about where the claims stop.',
  },

  { type: 'h2', text: 'What a dental examination actually notices' },
  {
    type: 'p',
    text: 'A thorough dental examination looks at more than the teeth. In the course of a routine visit a provider may observe things that are worth a conversation:',
  },
  {
    type: 'ul',
    items: [
      'Wear patterns that suggest clenching or grinding, often at night',
      'A jaw joint that clicks, catches, or is tender',
      'Tissue changes in the mouth, throat, or neck that warrant screening',
      'Signs associated with reflux, dry mouth, or the side effects of medication',
      'A narrow palate, a scalloped tongue, or other findings sometimes linked to airway concerns',
      'Gum inflammation, which can be affected by, and can affect, other conditions',
      'Difficulty chewing, which quietly changes what a person eats',
    ],
  },
  {
    type: 'p',
    text: 'None of those observations is a diagnosis of a medical condition. They are reasons to ask a question, and sometimes reasons to suggest you raise something with your physician.',
  },

  { type: 'h2', text: 'Function is health' },
  {
    type: 'p',
    text: 'The least glamorous part of whole-person care is also the most concrete. If chewing is uncomfortable, people change what they eat, usually toward softer and more processed food. If a denture moves, people avoid eating in company. If a tooth aches with cold, people stop drinking water at the temperature they prefer.',
  },
  {
    type: 'p',
    text: 'Restoring comfortable function is not cosmetic and it is not optional. It affects nutrition, social life, and sleep, which are health outcomes by any reasonable definition.',
  },

  { type: 'h2', text: 'Sleep and breathing: what dentistry can and cannot do' },
  {
    type: 'p',
    text: 'Dentists see the airway from an angle physicians usually do not, and dental practices have a legitimate role in screening for sleep-disordered breathing. That role is bounded, and the boundary matters.',
  },
  {
    type: 'ul',
    items: [
      'A dental practice can screen, ask the right questions, and identify findings worth investigating.',
      'A physician diagnoses sleep apnea, usually on the basis of a sleep study. A dentist does not.',
      'Where a physician has diagnosed obstructive sleep apnea and considers an oral appliance appropriate, a dentist can provide, fit, and adjust that appliance.',
      'An oral appliance is one recognized treatment option among several, not a replacement for medical care.',
    ],
  },
  {
    type: 'note',
    text: 'If you see a dental practice advertising that it treats sleep apnea without any mention of a physician, treat that as a warning sign rather than a selling point.',
    variant: 'info',
  },

  { type: 'h2', text: 'Where we are careful' },
  {
    type: 'p',
    text: 'There is genuine, ongoing research into associations between oral health, particularly gum disease, and a range of general health conditions. That research is real and it is worth taking seriously. It is also frequently overstated in dental advertising.',
  },
  {
    type: 'p',
    text: 'An association is not the same as a cause. Treating gum disease is worth doing because gum disease is worth treating, and because keeping your teeth matters. It is not a treatment for an unrelated medical condition, and we are not going to suggest otherwise in order to make a cleaning sound more urgent.',
  },
  {
    type: 'p',
    text: 'Fear is an effective marketing tool and a poor foundation for a long relationship with a patient. We would rather explain what we can help with, explain what we cannot, and let you decide.',
  },

  { type: 'h2', text: 'Working alongside your physician' },
  {
    type: 'p',
    text: 'The practical version of whole-person care is unglamorous coordination: knowing your medications and how they affect your mouth, understanding conditions that change how we plan treatment, and picking up the phone when a finding belongs with your doctor.',
  },
  {
    type: 'p',
    text: 'We ask for your physician’s details at the first visit for that reason, not for a file.',
  },
]

const faqs = [
  {
    question: 'Does treating gum disease improve my heart health?',
    answer:
      'Research has found associations between gum disease and several general health conditions, and that work is ongoing. An association is not proof of cause, and treating gum disease should not be presented as a treatment for heart disease. Treating gum disease is worth doing on its own terms, because it protects the bone and tissue holding your teeth in place.',
  },
  {
    question: 'Can a dentist tell me if I have sleep apnea?',
    answer:
      'A dentist can screen and can identify findings that suggest it is worth investigating. Diagnosis is made by a physician, generally on the basis of a sleep study. If a screening raises a question, the right next step is a conversation with your doctor.',
  },
  {
    question: 'What does whole-person care mean in a normal appointment?',
    answer:
      'Mostly it means the examination looks beyond individual teeth and the conversation includes your medical history, your medications, how you are sleeping, and whether you are able to eat comfortably. It rarely looks dramatic. It looks like being asked better questions.',
  },
]

export default function Page() {
  return (
    <ProsePage
      eyebrow="Our approach"
      title="Dentistry That Looks Beyond the Tooth"
      lede="The mouth is connected to the rest of you. That is a reason to look carefully, and a reason to be honest about where dentistry's competence ends."
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Whole-Person Care', path: PATH },
      ]}
      seo={{ name: TITLE, description: DESCRIPTION, path: PATH }}
      blocks={blocks}
      faqs={faqs}
      disclaimer
      related={[
        { label: 'TMJ and Facial Pain', href: '/services/tmj-and-facial-pain' },
        { label: 'Sleep and Airway Care', href: '/services/sleep-and-airway-care' },
        { label: 'Our Approach', href: '/about/our-approach' },
      ]}
    />
  )
}
