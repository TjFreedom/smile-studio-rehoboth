import {
  address,
  anticipatedOpening,
  email,
  hoursSummary,
  practiceName,
  parentOrganization,
} from '@/config/practice'

export interface Faq {
  question: string
  answer: string
}

/**
 * Opening FAQ. Rendered visibly on the homepage and the Opening FAQ page, and
 * only then emitted as FAQPage structured data. Answers are plain text so the
 * same string serves both the visible copy and the JSON-LD, which keeps them
 * from drifting apart.
 */
export const openingFaqs: Faq[] = [
  {
    question: `When will ${practiceName} open?`,
    answer: `The office is currently under construction, and we anticipate opening in ${anticipatedOpening}. Construction schedules can change, so we encourage future patients to join our opening list for the confirmed date.`,
  },
  {
    question: 'Where will the office be located?',
    answer: `${practiceName} will be located at ${address.line1} in ${address.city}, ${address.stateName}, in ${address.complex}.`,
  },
  {
    question: 'What will the office hours be?',
    answer: `Our planned regular hours are ${hoursSummary}. Weekend hours have not been set. We will publish confirmed hours before opening.`,
  },
  {
    question: 'Can I schedule an appointment now?',
    answer:
      'Appointment scheduling is not yet available. Join our opening list to receive early scheduling information as soon as appointments become available.',
  },
  {
    question: 'How can I contact the practice?',
    answer: `Email the team at ${email}. A public phone number has not been assigned yet, and we will publish it here as soon as it is active.`,
  },
  {
    question: 'What services will be available?',
    answer:
      'The practice is being developed to provide comprehensive dental care. Confirmed services, providers, and specialty schedules will be announced before opening.',
  },
  {
    question: 'Will you accept my insurance?',
    answer:
      'We are not in network with any dental plan. Payment is collected in full on the day of your visit, and we file your insurance claim for you as a courtesy. Your benefit is assigned to you rather than to us, so your insurer reimburses you directly. Out of network does not mean not covered, but it usually means covered differently, and how differently depends on your plan. In-network options are being evaluated, and we will not name a plan until a contract is signed.',
  },
  {
    question: 'Who are the providers?',
    answer:
      'Dr. Jonathon Cottone, DDS is the dentist at Smile Studio of Rehoboth. You can read about his training and background on our Meet the Team page. Hygienists, assistants and front-office staff are being hired now and will be introduced there by name before we open.',
  },
]

/**
 * New patient FAQ. Written for the pre-opening period and revised at opening.
 * See docs/OPENING-TRANSITION-CHECKLIST.md.
 */
export const newPatientFaqs: Faq[] = [
  {
    question: 'How do I become a patient?',
    answer:
      'The practice is not yet open, so we are not able to register patients. Joining the opening list is the fastest route to a first appointment: subscribers receive early scheduling information before appointments are opened to the public.',
  },
  {
    question: 'What should I bring to a first visit?',
    answer:
      'Once we open, plan to bring a photo ID, your dental insurance information if you have coverage, a list of any medications you take, and the name of your physician. If you have had X-rays taken elsewhere in the last year, we can often request them so they do not need to be repeated.',
  },
  {
    question: 'How long is a first appointment?',
    answer:
      'A comprehensive new patient examination typically takes longer than a routine visit, because it includes a full assessment and a conversation about your history and goals. We will confirm appointment lengths before opening.',
  },
  {
    question: 'What if I am anxious about dental visits?',
    answer:
      'Tell us before your visit, not during it. Dental anxiety is common and it is far easier to plan around when we know in advance. We can start with a conversation only, no treatment, if that is what makes the first visit possible.',
  },
  {
    question: 'Do you see children and families?',
    answer:
      'The practice is being developed to care for families. Confirmed age ranges and pediatric services will be announced before opening.',
  },
  {
    question: 'What will treatment cost?',
    answer:
      'We will give you written costs before treatment is scheduled. Fees have not been published because the practice is not open, and we will not quote a price we cannot honor.',
  },
  {
    question: 'Do you offer payment plans?',
    answer:
      'Financing options have not been confirmed. We will publish the available options, including any third-party financing, before opening.',
  },
  {
    question: 'Are you accepting new patients?',
    answer:
      'Not yet. The office is under construction. Joining the opening list is how you will be notified the moment scheduling opens.',
  },
]

export const affiliationFaqs: Faq[] = [
  {
    question: `What is ${parentOrganization}?`,
    answer: `${parentOrganization} is a Delaware-based network of dental and healthcare professionals working together to provide comprehensive, patient-centered care, with practices in Delaware, Pennsylvania, and Maryland.`,
  },
  {
    question: 'Does that mean this is a corporate dental office?',
    answer: `${practiceName} is the practice you will visit, and the relationship you build is with the team here. ${parentOrganization} provides the shared infrastructure behind it, including administrative support and access to a broader professional network. Your care decisions are made in this office, with your provider.`,
  },
  {
    question: 'Will every service in the network be available in Rehoboth Beach?',
    answer:
      'No. Some specialty care is provided at other locations. Where that is the case we will tell you plainly, including how far you would need to travel, so you can decide what works for you.',
  },
]
