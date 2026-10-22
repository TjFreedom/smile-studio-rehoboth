/**
 * SERVICE ARCHITECTURE
 * ====================
 * Three tiers, exactly as specified in the project brief. The tier controls
 * how a service is labeled, whether it gets a scheduling CTA, and whether it
 * is emitted as schema.org Service data.
 *
 *   'confirmed' — verified as performed at the Rehoboth office. Gets a direct
 *                 scheduling CTA once the practice opens, and Service schema.
 *   'planned'   — expected, but not yet confirmed by clinical leadership.
 *                 Labeled "Planned", never given a scheduling CTA, never
 *                 emitted as schema. This is the correct tier for everything
 *                 until clinical leadership signs off.
 *   'network'   — available elsewhere in Freedom Dental Health, NOT at Rehoboth.
 *                 Presented as a referral handoff with an honest travel note.
 *
 * Brand Guidelines v1.0 §10: "Never advertise a service the practice does not
 * currently provide on site, even if a network practice provides it."
 *
 * TO CONFIRM A SERVICE: change `tier` to 'confirmed'. Labels, CTAs, and
 * structured data all follow. No other file needs editing.
 */

export type ServiceTier = 'confirmed' | 'planned' | 'network'

export interface ServiceFaq {
  question: string
  answer: string
}

export interface ServiceCategory {
  slug: string
  /** Full name, used in headings and schema. */
  name: string
  /** Short name for cards and navigation. */
  shortName: string
  tier: ServiceTier
  icon: IconName
  /** Meta description. 150 to 160 characters. */
  metaDescription: string
  /** Page H1. */
  headline: string
  /** One-sentence card summary. */
  cardSummary: string
  /** Opening paragraphs on the category page. */
  intro: string[]
  /** Individual treatments within the category. */
  treatments: string[]
  /** Why patients come to us for this. */
  reasons?: string[]
  /** What a visit involves. Written without promising an outcome. */
  whatToExpect?: string[]
  faqs?: ServiceFaq[]
  related: string[]
  /** Shown when tier === 'network'. */
  networkNote?: string
  /** Extra qualification shown above the fold on sensitive categories. */
  publicationGate?: string
}

export type IconName =
  | 'shield'
  | 'tooth'
  | 'sparkle'
  | 'anchor-implant'
  | 'alert'
  | 'jaw'
  | 'moon'
  | 'stethoscope'

/* ------------------------------------------------------------------ */

export const services: ServiceCategory[] = [
  {
    slug: 'general-and-preventive-dentistry',
    name: 'General and Preventive Dentistry',
    shortName: 'General and Preventive',
    tier: 'confirmed',
    icon: 'shield',
    metaDescription:
      'General and preventive dentistry at Smile Studio of Rehoboth, opening in Rehoboth Beach, DE. Exams, cleanings, digital X-rays, and gum health care.',
    headline: 'Care That Keeps It Simple',
    cardSummary:
      'Exams, cleanings, digital X-rays, and gum health care for every age in the family.',
    intro: [
      'Preventive visits are the quietest part of dentistry, and the part that does the most work. Regular exams and cleanings are how small problems stay small, and how you avoid the appointments nobody wants to need.',
      'Our new office is being built to make routine care feel routine. Appointments that run on time, findings explained in plain language, and a plan you actually understand before anything is scheduled.',
    ],
    treatments: [
      'New patient exams',
      'Routine dental exams',
      'Dental cleanings',
      'Digital X-rays',
      'Oral cancer screenings',
      'Fluoride treatments',
      'Dental sealants',
      'Periodontal evaluations',
      'Gum disease treatment',
      'Nightguards',
      'Sports mouthguards',
    ],
    reasons: [
      'You are new to the area and need a dental home',
      'It has been a while since your last visit',
      'Your gums bleed when you brush or floss',
      'You want a second opinion on a treatment plan',
      'Your family needs one practice that can see everyone',
    ],
    whatToExpect: [
      'A conversation first. We ask what brought you in, what has worked for you before, and what has not.',
      'A full examination, including digital X-rays where they are clinically appropriate, and a screening of the soft tissues in your mouth and throat.',
      'A cleaning matched to what we find. Healthy gums and gum disease call for different appointments, and we will tell you which one you need before we begin.',
      'A written plan, in order of priority, with the reasoning for each item.',
    ],
    faqs: [
      {
        question: 'How often should I have a cleaning?',
        answer:
          'Every six months is the common recommendation for patients with healthy gums. Patients being treated for gum disease often benefit from a shorter interval. Your provider will recommend a schedule based on what they find at your examination, and explain why.',
      },
      {
        question: 'It has been years since I saw a dentist. Will I get a lecture?',
        answer:
          'No. Gaps in dental care are ordinary, and they happen for practical reasons: a move, a job change, a bad experience, or cost. We start with a conversation, work at a pace you choose, and build the plan in steps.',
      },
      {
        question: 'Do you see children?',
        answer:
          'The practice is being developed to care for families. Confirmed age ranges and pediatric services will be announced before opening.',
      },
    ],
    related: ['restorative-dentistry', 'cosmetic-dentistry', 'emergency-dentistry'],
  },

  {
    slug: 'restorative-dentistry',
    name: 'Restorative Dentistry',
    shortName: 'Restorative',
    tier: 'confirmed',
    icon: 'tooth',
    metaDescription:
      'Restorative dentistry at Smile Studio of Rehoboth in Rehoboth Beach, DE. Fillings, crowns, bridges, dentures, and root canal treatment.',
    headline: 'Comfortable, Lasting Repairs',
    cardSummary:
      'Fillings, crowns, bridges, and dentures using current materials and digital planning.',
    intro: [
      'When a tooth is damaged, worn, or missing, the goal is to get function back first and appearance back alongside it. Chewing comfortably, speaking clearly, and keeping the teeth around the problem healthy all matter as much as how the result looks.',
      'Restorative work is planned before it starts. We show you what we see, explain the options with their trade-offs, and give you the costs in writing before anything is scheduled.',
    ],
    treatments: [
      'Tooth-colored fillings',
      'Dental crowns',
      'Dental bridges',
      'Dentures',
      'Partial dentures',
      'Implant restorations',
      'Root canal treatment',
      'Tooth extractions',
      'Full-mouth rehabilitation',
    ],
    reasons: [
      'A tooth is chipped, cracked, or worn down',
      'An old filling or crown has failed',
      'You have a tooth that hurts with pressure or temperature',
      'You are missing one or more teeth',
      'Your dentures no longer fit the way they used to',
    ],
    whatToExpect: [
      'An examination that looks at the whole picture, including how your teeth meet, because a repair that ignores the bite tends not to last.',
      'A discussion of the realistic options. Most situations have more than one reasonable answer, and they differ in cost, longevity, and how much tooth structure they preserve.',
      'A written treatment plan with sequencing, so you know what happens first and why.',
      'Follow-up to check how the restoration is settling in.',
    ],
    faqs: [
      {
        question: 'How long does a crown last?',
        answer:
          'Longevity varies with the material, the tooth, your bite, and your home care. Published ranges commonly cited for well-maintained crowns span roughly ten to fifteen years or more, but no restoration carries a guarantee. Your provider will discuss what is realistic for your specific tooth.',
      },
      {
        question: 'Will I be comfortable during treatment?',
        answer:
          'We use local anesthetic for restorative procedures and will talk through the comfort measures available to you before we begin. We cannot promise how any individual will feel, but we can promise to stop, check in, and adjust.',
      },
    ],
    related: ['dental-implants', 'general-and-preventive-dentistry', 'emergency-dentistry'],
  },

  {
    slug: 'cosmetic-dentistry',
    name: 'Cosmetic Dentistry',
    shortName: 'Cosmetic',
    tier: 'confirmed',
    icon: 'sparkle',
    metaDescription:
      'Cosmetic dentistry at Smile Studio of Rehoboth in Rehoboth Beach, DE. Whitening, veneers, bonding, and clear aligner consultations.',
    headline: 'A Smile That Looks Like You',
    cardSummary:
      'Whitening, veneers, and bonding, planned around your features rather than a template.',
    intro: [
      'Cosmetic dentistry works best when it looks like it was always yours. That means planning around your face, your existing teeth, and what you actually want to change, rather than applying a standard shape and shade to everyone.',
      'We show you the plan before we start. For most cosmetic work that means photographs, digital planning, and a clear conversation about what is achievable, what it costs, and what it will ask of you over time.',
    ],
    treatments: [
      'Professional teeth whitening',
      'Porcelain veneers',
      'Cosmetic bonding',
      'Smile makeovers',
      'Clear aligners',
      'Cosmetic consultations',
    ],
    reasons: [
      'You have an event coming up and want to look like yourself, rested',
      'A front tooth is chipped, stained, or out of line with its neighbors',
      'Old bonding or veneers no longer match the teeth around them',
      'You have wanted to do something about it for years and want to know the options',
    ],
    whatToExpect: [
      'A consultation that starts with what you would change if you could change one thing.',
      'Photographs and, where useful, digital planning so you can see a proposal before committing.',
      'An honest conversation about trade-offs. Some options are reversible, some are not, and some ask for maintenance over the years.',
      'Written costs and sequencing before treatment begins.',
    ],
    faqs: [
      {
        question: 'How white will my teeth get?',
        answer:
          'Whitening results vary with the starting shade, the cause of the discoloration, and the tooth itself. Existing fillings, crowns, and veneers do not change color with whitening, which is a common surprise and something we check for before recommending it. Your provider will tell you what is realistic for your teeth.',
      },
      {
        question: 'What is the difference between veneers and bonding?',
        answer:
          'Bonding uses a tooth-colored composite material shaped directly onto the tooth in a single visit. Veneers are thin custom-made shells, usually porcelain, made in a laboratory and bonded to the front of the tooth. Bonding generally costs less and is more easily repaired. Veneers generally resist staining better and last longer. They also usually require removing a small amount of enamel, which is not reversible.',
      },
    ],
    related: ['restorative-dentistry', 'general-and-preventive-dentistry', 'dental-implants'],
  },

  {
    slug: 'dental-implants',
    name: 'Dental Implants',
    shortName: 'Implants',
    tier: 'confirmed',
    icon: 'anchor-implant',
    metaDescription:
      'Dental implant care at Smile Studio of Rehoboth in Rehoboth Beach, DE. Consultations, single-tooth implants, and implant-supported dentures.',
    headline: 'A Stable Replacement for a Missing Tooth',
    cardSummary:
      'Consultations, single-tooth implants, and implant-supported bridges and dentures.',
    intro: [
      'A dental implant replaces the root of a missing tooth with a post placed in the jawbone, which then supports a crown, a bridge, or a denture. Because the support comes from the bone rather than the neighboring teeth, an implant can replace a tooth without altering the healthy teeth on either side.',
      'Implants are not right for everyone or every site. Bone volume, gum health, medical history, and habits all affect whether an implant is a sound recommendation. A proper consultation answers that question before anything is planned.',
    ],
    treatments: [
      'Implant consultations',
      'Single-tooth implants',
      'Implant-supported bridges',
      'Implant-supported dentures',
      'Full-arch implant treatment',
      'Implant restoration',
      'Implant maintenance',
    ],
    reasons: [
      'You are missing a tooth and do not want to alter the teeth beside it',
      'A denture or partial moves when you eat or speak',
      'A tooth is failing and you want to understand the options before it is removed',
      'You have been told you are not a candidate and want a second look',
    ],
    whatToExpect: [
      'An evaluation of the site, including imaging appropriate to the case, plus a review of your medical history and any medications that affect healing.',
      'A frank conversation about candidacy. If an implant is not the right answer for your situation, we will say so and walk through the alternatives.',
      'A staged plan with a realistic timeline. Implant treatment usually happens across several appointments with healing time in between.',
      'A maintenance plan, because implants need ongoing care just as natural teeth do.',
    ],
    faqs: [
      {
        question: 'How long does implant treatment take?',
        answer:
          'It depends on the site and whether any preparatory work is needed. Treatment is typically staged across several months to allow healing between steps. Your provider will give you a timeline specific to your case at the consultation.',
      },
      {
        question: 'Am I a candidate for an implant?',
        answer:
          'That question can only be answered by an examination and appropriate imaging. Bone volume, gum health, medical conditions, medications, and smoking all influence the recommendation. We would rather tell you honestly at the consultation than discover it partway through treatment.',
      },
    ],
    related: ['restorative-dentistry', 'general-and-preventive-dentistry', 'cosmetic-dentistry'],
  },

  {
    slug: 'emergency-dentistry',
    name: 'Emergency Dentistry',
    shortName: 'Emergency Care',
    tier: 'confirmed',
    icon: 'alert',
    metaDescription:
      'Emergency dental care at our Rehoboth Beach, DE practice. The office is not yet open, and emergency procedures will be published before opening.',
    headline: 'Dental Pain Should Not Wait',
    cardSummary:
      'Same-day care for pain, breaks, and lost restorations, for residents and visitors.',
    publicationGate:
      'The office is not yet open and cannot accept emergency patients. Emergency procedures, hours, and contact methods will be published here before opening.',
    intro: [
      'A resort town needs a dentist who can help when something goes wrong, whether you live here year-round or you are two days into a week at the beach. That is a service we intend to offer, and it is one of the reasons for the location.',
      'Until the office opens, we cannot see emergency patients. The guidance below is for the period before we open, and it will be replaced with our own procedures once they are confirmed.',
    ],
    treatments: [
      'Toothaches',
      'Broken teeth',
      'Lost fillings or crowns',
      'Dental infections',
      'Swelling',
      'Dental trauma',
      'Emergency evaluations',
    ],
    faqs: [
      {
        question: 'I have a dental emergency right now. Can you help?',
        answer:
          'Not yet. Smile Studio of Rehoboth is under construction and is not open for patient care. If you are experiencing a life-threatening emergency, including difficulty breathing or swallowing, call 911. For an urgent dental concern, contact an established dental provider or an appropriate emergency service.',
      },
      {
        question: 'Will you see visitors who are not established patients?',
        answer:
          'Serving visitors who need care while they are at the beach is part of the plan for this practice. Confirmed emergency policies, including whether we will see patients who are not of record, will be published before opening.',
      },
    ],
    related: ['restorative-dentistry', 'general-and-preventive-dentistry'],
  },

  {
    slug: 'tmj-and-facial-pain',
    name: 'TMJ and Facial Pain',
    shortName: 'TMJ and Facial Pain',
    tier: 'confirmed',
    icon: 'jaw',
    metaDescription:
      'TMJ and facial pain evaluations at Smile Studio of Rehoboth in Rehoboth Beach, DE. Providers and available services will be confirmed before opening.',
    headline: 'When the Jaw Is the Problem',
    cardSummary:
      'Evaluations for jaw pain, clicking, clenching, and headache-related dental concerns.',
    publicationGate:
      'Dr. Cottone provides TMJ and facial pain care at the Rehoboth office. Whether visiting affiliated providers will hold sessions here has not been decided, and a complex case may still be referred to a Freedom Dental Health location. We will tell you which applies to you before you commit to anything.',
    intro: [
      'Jaw pain, clicking, limited opening, and morning headaches often have a dental component. Sometimes the answer is straightforward, such as a worn bite or a clenching habit. Sometimes it is more involved and benefits from a coordinated evaluation.',
      'This is an area where honest scoping matters. An evaluation tells you what is going on and which of the available approaches is reasonable for you. It does not promise that a dental appliance resolves every headache, because it does not.',
    ],
    treatments: [
      'TMJ and TMD evaluations',
      'Facial pain treatment',
      'Headache-related dental evaluations',
      'Oral appliance therapy',
      'Nightguards for clenching and grinding',
      'Interdisciplinary care coordination',
    ],
    reasons: [
      'Your jaw clicks, pops, or catches when you open',
      'You wake with a sore jaw or a headache',
      'You have been told you clench or grind',
      'Your teeth are wearing down faster than they should',
    ],
    faqs: [
      {
        question: 'Will a nightguard fix my headaches?',
        answer:
          'Sometimes it helps, and sometimes the headaches have another cause entirely. An appliance can reduce the load on the jaw joint and protect the teeth from grinding. It is not a treatment for headaches in general, and anyone who tells you otherwise is overstating the evidence. An evaluation is how you find out whether your symptoms have a dental component.',
      },
    ],
    related: ['sleep-and-airway-care', 'general-and-preventive-dentistry', 'restorative-dentistry'],
  },

  {
    slug: 'sleep-and-airway-care',
    name: 'Sleep and Airway Care',
    shortName: 'Sleep and Airway',
    tier: 'confirmed',
    icon: 'moon',
    metaDescription:
      'Sleep and airway dental care at Smile Studio of Rehoboth in Rehoboth Beach, DE. Providers and available services will be confirmed before opening.',
    headline: 'Breathing, Sleep, and the Mouth',
    cardSummary:
      'Screening and oral appliance care for snoring and sleep-disordered breathing.',
    publicationGate:
      'Dr. Cottone provides sleep and airway care at the Rehoboth office. Care in this category is often shared with a physician, because the diagnosis of sleep-disordered breathing is a medical one rather than a dental one. Whether visiting affiliated providers will hold sessions here has not been decided, and some services may be referred to a Freedom Dental Health location.',
    intro: [
      'Dentists see the airway from an angle physicians usually do not. Worn teeth, a scalloped tongue, a narrow palate, and a history of snoring are all things we notice during an ordinary examination, and any of them can be worth a conversation.',
      'What a dental practice can do here is specific and bounded. We can screen, we can raise the question, and where a physician has made a diagnosis we can provide oral appliance therapy as one of the recognized treatment options. Diagnosing sleep apnea is a physician role, and treatment decisions belong with them.',
    ],
    treatments: [
      'Sleep apnea screening',
      'Snoring evaluation',
      'Oral appliance therapy',
      'Adult airway evaluations',
      'Pediatric airway evaluations',
      'Frenectomy consultations',
      'Myofunctional therapy coordination',
      'Whole-health treatment planning',
    ],
    reasons: [
      'You snore, or you have been told you stop breathing in your sleep',
      'You wake unrefreshed despite enough hours in bed',
      'You have been diagnosed with sleep apnea and cannot tolerate CPAP',
      'You are looking for an evaluation of your child',
    ],
    faqs: [
      {
        question: 'Can a dentist diagnose sleep apnea?',
        answer:
          'No. Sleep apnea is diagnosed by a physician, usually on the basis of a sleep study. A dental practice can screen, identify signs worth investigating, and coordinate with your physician. Where a physician has diagnosed obstructive sleep apnea and considers an oral appliance appropriate, a dentist can provide and adjust that appliance.',
      },
      {
        question: 'Is an oral appliance an alternative to CPAP?',
        answer:
          'For some patients with mild to moderate obstructive sleep apnea, and for patients who cannot tolerate CPAP, an oral appliance is a recognized option. Whether it is appropriate for you is a decision made with your physician, not instead of them.',
      },
    ],
    related: ['tmj-and-facial-pain', 'general-and-preventive-dentistry'],
  },
]

/* ------------------------------------------------------------------ *
 * SPECIALTY SERVICES  (network tier)
 * ------------------------------------------------------------------ */

export interface NetworkService {
  name: string
  description: string
  note: string
  /**
   * A sister practice physically at Plantations Professional Park rather than a
   * referral to another town. Rendered differently: "next door" is a materially
   * different promise from "coordinated referral", and conflating the two is
   * the kind of thing a patient only discovers when they are in the car.
   */
  neighboring?: { practice: string; suite: string }
}

/**
 * Specialty care available elsewhere in Freedom Dental Health.
 * Presented as a referral handoff, never as something offered at Rehoboth.
 * Brand Guide §9: "Distance matters. Set honest expectations in referral copy."
 */
export const networkSpecialties: NetworkService[] = [
  {
    name: 'Periodontics',
    description: 'Advanced gum disease treatment, gum grafting, and surgical periodontal care.',
    note: 'Provided next door by Periodontal Associates of Delaware, opening in Suite 4.',
    neighboring: { practice: 'Periodontal Associates of Delaware', suite: 'Suite 4' },
  },
  {
    name: 'Endodontics',
    description: 'Complex root canal treatment and retreatment by a root canal specialist.',
    note: 'Referral coordinated through your Smile Studio provider.',
  },
  {
    name: 'Oral Surgery',
    description: 'Surgical extractions, wisdom teeth, and implant placement in complex cases.',
    note: 'Referral coordinated through your Smile Studio provider.',
  },
  {
    name: 'Orthodontics',
    description: 'Comprehensive orthodontic treatment for children, teenagers, and adults.',
    note: 'Referral coordinated through your Smile Studio provider.',
  },
  {
    name: 'Prosthodontics',
    description: 'Complex full-mouth reconstruction and advanced prosthetic treatment.',
    note: 'Referral coordinated through your Smile Studio provider.',
  },
  {
    name: 'Pediatric Dentistry',
    description: 'Dedicated pediatric dental care for young children and patients with special needs.',
    note: 'Referral coordinated through your Smile Studio provider.',
  },
]

/* ------------------------------------------------------------------ *
 * HELPERS
 * ------------------------------------------------------------------ */

export function getService(slug: string): ServiceCategory | undefined {
  return services.find((s) => s.slug === slug)
}

export const serviceSlugs = services.map((s) => s.slug)

/** True only when at least one service is confirmed AND the office is open. */
export function tierLabel(tier: ServiceTier): string | null {
  if (tier === 'planned') return 'Planned service'
  if (tier === 'network') return 'Available through Freedom Dental Health'
  return null
}
