/**
 * CENTRAL PRACTICE CONFIGURATION
 * ==============================
 * Single source of truth for every practice fact on the website.
 *
 * Nothing in this file should be duplicated in a component, a page, or a piece
 * of copy. If you find yourself typing the address, the email, or the opening
 * window into a component, import it from here instead.
 *
 * THE THREE OPENING STATES
 * ------------------------
 *   'under-construction'  Building. No phone, no booking. CTA: join the opening list.
 *   'scheduling'          Not open yet, but taking appointments by phone. This is
 *                         what the printed postcard advertises ("CURRENTLY
 *                         SCHEDULING APPOINTMENTS"), so the site must match it.
 *   'open'                Seeing patients. Hours become real opening hours.
 *
 * Two derived booleans carry the distinction, and they are NOT the same test:
 *   `isPreOpening`            not yet seeing patients. Keeps hours labeled
 *                             "Planned", keeps openingHoursSpecification out of
 *                             structured data, keeps services marked planned.
 *   `isAcceptingAppointments` booking is live. Swaps every CTA to Request an
 *                             Appointment and puts Call in the mobile bar.
 * In 'scheduling' mode BOTH are true. Use the one that matches the claim you
 * are making, or the site will either promise care it cannot give or hide a
 * phone line that is already printed on a postcard.
 *
 * TO FLIP TO FULLY OPEN:
 *   1. Set `exactOpeningDate` to the confirmed ISO date.
 *   2. Set `openingStatus` to 'open'.
 *   3. Confirm hours in `plannedHours` are the real hours.
 *   4. Work through docs/OPENING-TRANSITION-CHECKLIST.md.
 * Everything else (labels, CTAs, structured data, nav, mobile action bar) follows automatically.
 */

export type OpeningStatus = 'under-construction' | 'scheduling' | 'open'

export interface DayHours {
  readonly day: string
  readonly opens: string | null // 24h "HH:MM" for schema.org, null = closed
  readonly closes: string | null
  readonly display: string
}

/* ------------------------------------------------------------------ *
 * IDENTITY
 * ------------------------------------------------------------------ */

/**
 * Practice name.
 *
 * DECISION LOG: Brand Guidelines v1.0 p.23 (Style Quick Reference) mandates
 * "Smile Studio of Rehoboth" and explicitly prohibits "Rehoboth Smile Studio".
 * The finalized logo lockups read SMILE STUDIO of REHOBOTH DENTISTRY.
 * The original brief specified "Rehoboth Smile Studio", which the brand guide
 * forbids by name. Resolved in favor of the brand guide and the finalized
 * logo artwork, since both are later and more specific than the brief.
 * NOT YET RATIFIED BY THE PRACTICE — see docs/REQUIRED-BEFORE-OPENING.md.
 * Changing this one value renames the practice across every page, meta tag,
 * and structured-data block.
 */
export const practiceName = 'Smile Studio of Rehoboth'

/** Short reference, used after the first full mention. Brand Guide p.23. */
export const practiceNameShort = 'Smile Studio'

/** Formal and legal contexts only. Brand Guide p.23. */
export const practiceNameLegal = 'Smile Studio of Rehoboth Dentistry'

export const parentOrganization = 'Freedom Dental Health'
export const parentOrganizationUrl = 'https://freedomdentalhealth.com/'
export const affiliationLabel = 'A Freedom Dental Health Practice'

/* ------------------------------------------------------------------ *
 * DOMAIN
 * ------------------------------------------------------------------ */

/**
 * Canonical origin. Always the www host, always https.
 * Non-www and http variants redirect here at the DNS and host layer.
 * See docs/LAUNCH-CHECKLIST.md, "Domain and redirects".
 */
export const siteUrl = 'https://www.rehobothsmiles.com'

/**
 * Absolute URL helper. Use for canonicals, OG tags, JSON-LD, and the sitemap.
 *
 * The home page resolves to the bare origin with no trailing slash, which is
 * what Next.js emits for the canonical tag. Returning a trailing slash here
 * would make the sitemap disagree with the canonical on the single most
 * important URL on the site.
 */
export function absoluteUrl(path = '/'): string {
  if (path === '/') return siteUrl
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

/* ------------------------------------------------------------------ *
 * CONTACT
 * ------------------------------------------------------------------ */

export const email = 'info@rehobothsmiles.com'
export const emailSubject = 'Smile Studio of Rehoboth Inquiry'
export const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}`

/**
 * PHONE
 * Confirmed 2026-10-21 by two pieces of the practice's own printed collateral:
 * "Smile Studio of Rehoboth Postcard - FINAL.pdf" (job code MAR070SSR10092026)
 * and "Smile Studio of Rehoboth - Coming Soon Sign.pdf". The postcard pairs it
 * with "CURRENTLY SCHEDULING APPOINTMENTS", which is why openingStatus below is
 * 'scheduling' rather than 'under-construction'.
 *
 * Display form follows the postcard's own punctuation style for the sign
 * ((302) 715-0020); the E.164 form drives tel: links and schema.org.
 */
export const phoneNumber: string | null = '(302) 715-0020'
export const showPhoneNumber = true
export const enableClickToCall = true

/** E.164 for schema.org and tel: links. */
export const phoneNumberE164: string | null = '+13027150020'

/* ------------------------------------------------------------------ *
 * ADDRESS
 * ------------------------------------------------------------------ */

export const address = {
  /**
   * CONFIRMED by the practice 2026-10-21: "Plantations Road", plural.
   *
   * This is the string to syndicate to Google, Apple, Bing and the data
   * aggregators, character for character. Note that the FINAL postcard already
   * in circulation prints "19411 Plantation Road" (singular), which is a typo
   * in the printed piece rather than a variant spelling. Correct it on the
   * next print run, and do not let it become the address anyone submits to a
   * directory. See docs/REQUIRED-BEFORE-OPENING.md.
   */
  line1: '19411 Plantations Road',
  /** Confirmed 2026-10-21 by the FINAL postcard: "19411 Plantation Road, Suite 1". */
  line2: 'Suite 1' as string | null,
  city: 'Rehoboth Beach',
  state: 'DE',
  stateName: 'Delaware',
  postalCode: '19971',
  country: 'US',
  countryName: 'United States',
  /** Plantations Professional Park. Confirmed in the project brief. */
  complex: 'Plantations Professional Park',
} as const

export const addressLines: readonly string[] = [
  address.line1,
  ...(address.line2 ? [address.line2] : []),
  `${address.city}, ${address.state} ${address.postalCode}`,
]

export const addressSingleLine = `${address.line1}, ${address.city}, ${address.state} ${address.postalCode}`

/**
 * [TO CONFIRM] Verified rooftop coordinates.
 * Approximate, derived from the Plantations Road corridor, and used ONLY to
 * frame the static map graphic. Deliberately NOT emitted in structured data
 * until a Google Business Profile pin is verified.
 */
export const approximateGeo = { latitude: 38.7185, longitude: -75.1355 } as const
export const geoIsVerified = false

/** Directions deep link. Address based, so it works before a GBP pin exists. */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  addressSingleLine,
)}`

/* ------------------------------------------------------------------ *
 * OPENING STATUS
 * ------------------------------------------------------------------ */

export const openingStatus: OpeningStatus = 'scheduling'

/**
 * The full truth table for the three states, rather than a chain of equality
 * checks. Two reasons: TypeScript narrows a `const` to its literal type, so
 * `openingStatus === 'open'` reads as a provably-false comparison and fails the
 * build; and a Record keyed by OpeningStatus means adding a fourth state will
 * not compile until someone decides what it does to booking and to care.
 */
const STATUS: Record<OpeningStatus, { readonly seeingPatients: boolean; readonly booking: boolean }> = {
  'under-construction': { seeingPatients: false, booking: false },
  scheduling: { seeingPatients: false, booking: true },
  open: { seeingPatients: true, booking: true },
}

/** Seeing patients. Only this unlocks real opening hours and openingDate. */
export const isOpen: boolean = STATUS[openingStatus].seeingPatients

/**
 * Not yet seeing patients. True for BOTH 'under-construction' and 'scheduling',
 * because a practice taking bookings for a future date still cannot claim to be
 * open, publish current opening hours, or present planned services as delivered.
 */
export const isPreOpening: boolean = !isOpen

/** Booking is live: drives CTAs, the mobile Call action, and nav labels. */
export const isAcceptingAppointments: boolean = STATUS[openingStatus].booking

/** Approved phrasing. Do not tighten this to an exact date. */
export const anticipatedOpening = 'late November or early December 2026'
export const anticipatedOpeningTitleCase = 'Late November or Early December 2026'

/** [TO CONFIRM] ISO date. Stays null until construction confirms. */
export const exactOpeningDate: string | null = null

/** Required qualifier. Appears near every statement of the opening window. */
export const openingQualifier =
  'Construction schedules can change. Join our opening list for the confirmed opening date and early scheduling information.'

/* ------------------------------------------------------------------ *
 * FEATURE FLAGS
 * ------------------------------------------------------------------ */

export const features = {
  enableOnlineScheduling: false,
  enableAppointmentRequests: false,
  enableOpeningList: true,
  enablePatientForms: false,
  enablePayOnline: false,
  enableEmergencyInstructions: false,
  enableTeamPages: true,
  enableInsuranceList: false,
  enableBlog: true,
  enableSocialLinks: false,
} as const

/* ------------------------------------------------------------------ *
 * BILLING AND INSURANCE
 * ------------------------------------------------------------------ */

export type InsurancePosture = 'unconfirmed' | 'courtesy-billing' | 'in-network'

/**
 * Confirmed by the practice 2026-10-21: "we are going to do courtesy dental
 * billing as we continue to evaluate in network options."
 *
 * 'courtesy-billing' means the practice is OUT of network with every plan and
 * submits claims on the patient's behalf as a convenience. That distinction is
 * the whole point of stating it carefully: "we bill your insurance" and "we
 * take your insurance" sound alike to a patient and mean very different things
 * for what they owe. Copy derived from this flag must never blur the two.
 *
 * Flip to 'in-network' only once a contract is executed, and name a plan only
 * then. Delaware Board of Dentistry advertising rules apply.
 */
export const insurancePosture: InsurancePosture = 'courtesy-billing'

/**
 * Confirmed by the practice 2026-10-21:
 *   · Payment is collected IN FULL at the time of service.
 *   · Assignment of benefits is turned over to the PATIENT, so the insurer
 *     reimburses them directly rather than paying the practice.
 *
 * Together with courtesy billing that is a complete and unusually clear
 * arrangement, and it is the single most important thing for a patient to
 * understand before their first visit: they pay us, we file the claim for
 * them, and their insurer pays them back. Copy must never leave someone
 * expecting the practice to bill their insurance and wait.
 *
 * [TO CONFIRM] still: accepted payment methods, any third-party financing, and
 * whether an in-house membership plan will exist for uninsured patients.
 */
export const insuranceDetailsConfirmed = true
export const paymentDueInFullAtService = true
export const assignmentOfBenefits: 'practice' | 'patient' = 'patient'

/** Named plans. Stays empty until a contract is signed. Never pre-populate. */
export const inNetworkPlans: readonly string[] = []

/* ------------------------------------------------------------------ *
 * HOURS
 * ------------------------------------------------------------------ */

/**
 * PLANNED hours. Labeled "Planned Office Hours" everywhere while
 * `isPreOpening` is true, and deliberately NOT emitted as `openingHours`
 * in structured data until the office is actually open.
 *
 * Saturday and Sunday are absent on purpose. No weekend hours have been
 * confirmed, and inventing them would be a factual claim we cannot support.
 */
export const plannedHours: readonly DayHours[] = [
  { day: 'Monday', opens: '08:00', closes: '17:00', display: '8:00 a.m. to 5:00 p.m.' },
  { day: 'Tuesday', opens: '08:00', closes: '17:00', display: '8:00 a.m. to 5:00 p.m.' },
  { day: 'Wednesday', opens: '08:00', closes: '17:00', display: '8:00 a.m. to 5:00 p.m.' },
  { day: 'Thursday', opens: '08:00', closes: '17:00', display: '8:00 a.m. to 5:00 p.m.' },
  { day: 'Friday', opens: '08:00', closes: '17:00', display: '8:00 a.m. to 5:00 p.m.' },
]

export const hoursLabel = isPreOpening ? 'Planned Office Hours' : 'Office Hours'
export const hoursSummary = 'Monday through Friday, 8:00 a.m. to 5:00 p.m.'
export const hoursSummaryShort = 'Mon to Fri, 8:00 a.m. to 5:00 p.m.'

/* ------------------------------------------------------------------ *
 * SERVICE AREA
 * ------------------------------------------------------------------ */

export const serviceArea: readonly string[] = [
  'Rehoboth Beach',
  'Lewes',
  'Dewey Beach',
  'Henlopen Acres',
  'Milton',
  'Harbeson',
  'Long Neck',
  'Millsboro',
]

/* ------------------------------------------------------------------ *
 * EXTERNAL LINKS  [ALL TO CONFIRM]
 * ------------------------------------------------------------------ *
 * Every value here is null until the real destination exists. Components check
 * for null and hide the link rather than rendering a dead "#" href.
 */
export const externalLinks: Record<string, string | null> = {
  onlineScheduling: null,
  patientForms: null,
  payOnline: null,
  googleBusinessProfile: null,
  googleMaps: null,
  noticeOfPrivacyPractices: null,
  facebook: null,
  instagram: null,
  careers: null,
}

/* ------------------------------------------------------------------ *
 * DERIVED CTA LABELS
 * ------------------------------------------------------------------ *
 * Centralised so the pre/post-opening language swap is one flag, not a
 * find-and-replace across forty files.
 */
export type MobileAction = {
  readonly label: string
  readonly href: string
  readonly icon: 'bell' | 'mail' | 'pin' | 'phone' | 'calendar'
}

const preOpeningMobileBar: readonly MobileAction[] = [
  { label: 'Opening Updates', href: '/opening-list', icon: 'bell' },
  { label: 'Email', href: mailtoUrl, icon: 'mail' },
  { label: 'Directions', href: '/contact/directions', icon: 'pin' },
]

/**
 * Booking is live. Call comes first: the postcard and the coming-soon sign both
 * lead with the phone number, so a patient arriving from either expects to find
 * it immediately. Falls back to /contact if the number is ever unset again,
 * rather than rendering a dead tel: link.
 */
const bookingMobileBar: readonly MobileAction[] = [
  { label: 'Call', href: phoneNumberE164 ? `tel:${phoneNumberE164}` : '/contact', icon: 'phone' },
  { label: 'Request', href: '/request-appointment', icon: 'calendar' },
  { label: 'Directions', href: '/contact/directions', icon: 'pin' },
]

export const cta = {
  primaryLabel: isAcceptingAppointments ? 'Request an Appointment' : 'Join the Opening List',
  primaryHref: isAcceptingAppointments ? '/request-appointment' : '/opening-list',
  secondaryLabel: 'Email Our Team',
  secondaryHref: mailtoUrl,
  tertiaryLabel: 'View Our Location',
  tertiaryHref: '/contact/directions',
  mobileBar: isAcceptingAppointments ? bookingMobileBar : preOpeningMobileBar,
} as const

/**
 * Announcement bar. Split into two elements rather than joined with an em dash,
 * because Brand Guide p.23 rules out em dashes in running copy.
 */
export const announcement = isAcceptingAppointments
  ? ({
      lead: `Now Scheduling Appointments in ${address.city}`,
      detail: `Opening ${anticipatedOpeningTitleCase}`,
      linkLabel: 'Request an Appointment',
      linkHref: '/request-appointment',
    } as const)
  : ({
      lead: `A New Dental Office Is Coming to ${address.city}`,
      detail: `Anticipated Opening ${anticipatedOpeningTitleCase}`,
      linkLabel: 'Join the Opening List',
      linkHref: '/opening-list',
    } as const)
