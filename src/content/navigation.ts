import { features, isAcceptingAppointments } from '@/config/practice'

export interface NavItem {
  label: string
  /**
   * Shorter label for the desktop nav bar only. The full `label` is still used
   * in the mobile drawer, the footer, and the site map, where there is room.
   * Without this the six top-level items need 672px, which overflows the
   * 1200px container once the logo and actions are accounted for.
   */
  shortLabel?: string
  href: string
  children?: NavItem[]
  /** Hidden until the underlying feature or content is live. */
  enabled?: boolean
}

const all: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About Smile Studio', href: '/about' },
      { label: 'Our Approach', href: '/about/our-approach' },
      { label: 'Whole-Person Care', href: '/about/whole-person-care' },
      { label: 'The Freedom Dental Health Connection', href: '/about/freedom-dental-health' },
      { label: 'Community Involvement', href: '/about/community' },
    ],
  },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'All Services', href: '/services' },
      { label: 'General and Preventive', href: '/services/general-and-preventive-dentistry' },
      { label: 'Restorative Dentistry', href: '/services/restorative-dentistry' },
      { label: 'Cosmetic Dentistry', href: '/services/cosmetic-dentistry' },
      { label: 'Dental Implants', href: '/services/dental-implants' },
      { label: 'Emergency Dentistry', href: '/services/emergency-dentistry' },
      { label: 'TMJ and Facial Pain', href: '/services/tmj-and-facial-pain' },
      { label: 'Sleep and Airway Care', href: '/services/sleep-and-airway-care' },
    ],
  },
  {
    label: 'New Patients',
    shortLabel: 'New Patients',
    href: '/new-patients',
    children: [
      { label: 'New Patient Information', href: '/new-patients' },
      { label: 'What to Expect', href: '/new-patients/what-to-expect' },
      { label: 'Insurance and Financing', href: '/new-patients/insurance-and-financing' },
      { label: 'Patient Forms', href: '/new-patients/patient-forms' },
      { label: 'Frequently Asked Questions', href: '/new-patients/faq' },
    ],
  },
  { label: 'Meet the Team', href: '/team', enabled: features.enableTeamPages },
  {
    label: 'Our New Office',
    shortLabel: 'New Office',
    href: '/our-new-office',
    children: [
      { label: 'Our New Rehoboth Office', href: '/our-new-office' },
      { label: 'Construction Updates', href: '/our-new-office/construction-updates' },
      { label: 'Office Features', href: '/our-new-office/office-features' },
      { label: 'Technology', href: '/our-new-office/technology' },
      { label: 'Planned Office Hours', href: '/our-new-office/planned-hours' },
      { label: 'Opening FAQ', href: '/our-new-office/opening-faq' },
    ],
  },
  {
    label: 'Patient Resources',
    shortLabel: 'Resources',
    href: '/patient-resources',
    children: [
      { label: 'All Resources', href: '/patient-resources' },
      { label: 'Insurance and Payment', href: '/new-patients/insurance-and-financing' },
      { label: 'Dental Emergency Information', href: '/patient-resources/dental-emergency-information' },
      { label: 'Post-Operative Instructions', href: '/patient-resources/post-operative-instructions' },
      { label: 'Referring Providers', href: '/patient-resources/referring-providers' },
      { label: 'Blog', href: '/blog', enabled: features.enableBlog },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
    children: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Directions and Parking', href: '/contact/directions' },
    ],
  },
]

function prune(items: NavItem[]): NavItem[] {
  return items
    .filter((i) => i.enabled !== false)
    .map((i) => (i.children ? { ...i, children: prune(i.children) } : i))
}

export const primaryNav: NavItem[] = prune(all)

/** The header's standalone CTA button. Not part of the nav list. */
export const navCta = {
  label: isAcceptingAppointments ? 'Request an Appointment' : 'Join the Opening List',
  href: isAcceptingAppointments ? '/request-appointment' : '/opening-list',
}

export const footerNav: { heading: string; links: NavItem[] }[] = [
  {
    heading: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Our Approach', href: '/about/our-approach' },
      { label: 'Our New Office', href: '/our-new-office' },
      { label: 'Construction Updates', href: '/our-new-office/construction-updates' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'General and Preventive', href: '/services/general-and-preventive-dentistry' },
      { label: 'Restorative Dentistry', href: '/services/restorative-dentistry' },
      { label: 'Cosmetic Dentistry', href: '/services/cosmetic-dentistry' },
      { label: 'Dental Implants', href: '/services/dental-implants' },
      { label: 'TMJ and Facial Pain', href: '/services/tmj-and-facial-pain' },
      { label: 'Sleep and Airway Care', href: '/services/sleep-and-airway-care' },
    ],
  },
  {
    heading: 'Patient Resources',
    links: [
      { label: 'New Patient Information', href: '/new-patients' },
      { label: 'What to Expect', href: '/new-patients/what-to-expect' },
      { label: 'Insurance and Financing', href: '/new-patients/insurance-and-financing' },
      { label: 'Frequently Asked Questions', href: '/new-patients/faq' },
      { label: 'Dental Emergency Information', href: '/patient-resources/dental-emergency-information' },
      { label: 'Blog', href: '/blog', enabled: features.enableBlog },
    ].filter((l) => (l as NavItem).enabled !== false),
  },
]

export const legalNav: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Accessibility Statement', href: '/accessibility-statement' },
  { label: 'Website Terms', href: '/website-terms' },
  { label: 'Website Disclaimer', href: '/website-disclaimer' },
  { label: 'Site Map', href: '/site-map' },
  { label: 'Careers', href: '/careers' },
]
