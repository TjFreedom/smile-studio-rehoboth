/**
 * CENTRAL PRACTICE CONFIGURATION
 * ==============================
 * Single source of truth for every practice fact on the website.
 *
 * Nothing in this file should be duplicated in a component, a page, or a piece
 * of copy. If you find yourself typing the address, the email, or the opening
 * window into a component, import it from here instead.
 *
 * TO FLIP THE SITE FROM PRE-OPENING TO OPEN:
 *   1. Set `phoneNumber` + `phoneNumberE164`, and flip showPhoneNumber / enableClickToCall to true.
 *   2. Set `exactOpeningDate` to the confirmed ISO date.
 *   3. Set `openingStatus` to 'open'.
 *   4. Flip enableOnlineScheduling / enableAppointmentRequests and add externalLinks.onlineScheduling.
 *   5. Work through docs/OPENING-TRANSITION-CHECKLIST.md.
 * Everything else (labels, CTAs, structured data, nav, mobile action bar) follows automatically.
 */

export type OpeningStatus = 'under-construction' | 'open'

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
 * forbids by name. Resolved in favour of the brand guide and the finalized
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
 * PHONE: intentionally null until a line is assigned.
 * While null, the site renders NO phone number, NO phone icon, NO click-to-call
 * link, and omits `telephone` from all structured data.
 */
export const phoneNumber: string | null = null
export const showPhoneNumber = false
export const enableClickToCall = false

/** E.164 for schema.org and tel: links once a number exists. e.g. '+13025550123' */
export const phoneNumberE164: string | null = null

/* ------------------------------------------------------------------ *
 * ADDRESS
 * ------------------------------------------------------------------ */

export const address = {
  line1: '19411 Plantations Road',
  /** [TO CONFIRM] Suite number, if the practice is assigned one. */
  line2: null as string | null,
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

export const openingStatus: OpeningStatus = 'under-construction'
export const isPreOpening: boolean = openingStatus === 'under-construction'

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
  enableTeamPages: false,
  enableInsuranceList: false,
  enableBlog: true,
  enableSocialLinks: false,
} as const

/* ------------------------------------------------------------------ *
 * HOURS
 * ------------------------------------------------------------------ */

/**
 * PLANNED hours. Labelled "Planned Office Hours" everywhere while
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

const openMobileBar: readonly MobileAction[] = [
  { label: 'Call', href: phoneNumberE164 ? `tel:${phoneNumberE164}` : '/contact', icon: 'phone' },
  { label: 'Schedule', href: '/request-appointment', icon: 'calendar' },
  { label: 'Directions', href: '/contact/directions', icon: 'pin' },
]

export const cta = {
  primaryLabel: isPreOpening ? 'Join the Opening List' : 'Request an Appointment',
  primaryHref: isPreOpening ? '/opening-list' : '/request-appointment',
  secondaryLabel: 'Email Our Team',
  secondaryHref: mailtoUrl,
  tertiaryLabel: 'View Our Location',
  tertiaryHref: '/contact/directions',
  mobileBar: isPreOpening ? preOpeningMobileBar : openMobileBar,
} as const

/**
 * Announcement bar. Split into two elements rather than joined with an em dash,
 * because Brand Guide p.23 rules out em dashes in running copy.
 */
export const announcement = {
  lead: `A New Dental Office Is Coming to ${address.city}`,
  detail: `Anticipated Opening ${anticipatedOpeningTitleCase}`,
  linkLabel: 'Join the Opening List',
  linkHref: '/opening-list',
} as const
