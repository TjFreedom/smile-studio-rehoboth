/**
 * JSON-LD STRUCTURED DATA
 * =======================
 * Pre-opening omission rules (enforced here, not left to each page):
 *
 *   OMITTED while `isPreOpening` is true, or while the underlying fact is
 *   unconfirmed:
 *     · telephone            — no number has been assigned
 *     · openingHoursSpecification — planned hours are not current hours
 *     · openingDate          — only a window is known, and a range is invalid
 *     · geo                  — coordinates are not yet verified against a GBP pin
 *     · hasMap / potentialAction (Reserve) — no scheduling system exists
 *     · aggregateRating, review, priceRange — nothing to report, and inventing
 *       any of these would be fabricated review data
 *     · employee / Person    — no provider roster confirmed
 *     · makesOffer           — no confirmed service list
 *
 *   INCLUDED because each value is verified:
 *     · name, url, email, address, parentOrganization, logo, areaServed,
 *       description, image
 */

import {
  absoluteUrl,
  address,
  affiliationLabel,
  anticipatedOpening,
  email,
  exactOpeningDate,
  geoIsVerified,
  approximateGeo,
  isPreOpening,
  isAcceptingAppointments,
  parentOrganization,
  parentOrganizationUrl,
  phoneNumberE164,
  plannedHours,
  practiceName,
  practiceNameLegal,
  serviceArea,
  siteUrl,
  externalLinks,
} from '@/config/practice'

type Json = Record<string, unknown>

const ORG_ID = `${siteUrl}/#practice`
const WEBSITE_ID = `${siteUrl}/#website`

/** Social profiles for sameAs. Only real, confirmed URLs are emitted. */
function sameAs(): string[] {
  return [
    parentOrganizationUrl,
    externalLinks.facebook,
    externalLinks.instagram,
    externalLinks.googleBusinessProfile,
  ].filter((v): v is string => typeof v === 'string' && v.length > 0)
}

function postalAddress(): Json {
  return {
    '@type': 'PostalAddress',
    streetAddress: address.line2 ? `${address.line1}, ${address.line2}` : address.line1,
    addressLocality: address.city,
    addressRegion: address.state,
    postalCode: address.postalCode,
    addressCountry: address.country,
  }
}

/**
 * The practice entity. Typed as Dentist, which is a subtype of both
 * MedicalBusiness and LocalBusiness, so a single node satisfies all three.
 */
export function practiceSchema(): Json {
  const node: Json = {
    '@type': ['Dentist', 'MedicalBusiness', 'LocalBusiness'],
    '@id': ORG_ID,
    name: practiceName,
    legalName: practiceNameLegal,
    url: absoluteUrl('/'),
    email,
    description: !isPreOpening
      ? `${practiceName} is a dental practice at ${address.line1} in ${address.city}, ${address.stateName}, providing comprehensive, patient-centered dentistry.`
      : isAcceptingAppointments
        ? `${practiceName} is a new dental practice opening at ${address.line1} in ${address.city}, ${address.stateName}, in ${anticipatedOpening}, and is scheduling appointments now.`
        : `${practiceName} is a dental practice under construction at ${address.line1} in ${address.city}, ${address.stateName}, with an anticipated opening in ${anticipatedOpening}.`,
    address: postalAddress(),
    image: absoluteUrl('/og/default.png'),
    logo: absoluteUrl('/logos/logo-horizontal.svg'),
    parentOrganization: {
      '@type': 'Organization',
      name: parentOrganization,
      url: parentOrganizationUrl,
    },
    areaServed: serviceArea.map((name) => ({
      '@type': 'City',
      name,
      containedInPlace: { '@type': 'State', name: address.stateName },
    })),
    slogan: affiliationLabel,
    sameAs: sameAs(),
  }

  // --- Conditional fields. Each stays absent until the fact is real. ---

  if (phoneNumberE164) node.telephone = phoneNumberE164

  if (geoIsVerified) {
    node.geo = {
      '@type': 'GeoCoordinates',
      latitude: approximateGeo.latitude,
      longitude: approximateGeo.longitude,
    }
  }

  // A date range is not a valid openingDate. Only a confirmed ISO date is emitted.
  if (exactOpeningDate) node.openingDate = exactOpeningDate

  // Planned hours are never represented as current opening hours.
  if (!isPreOpening) {
    node.openingHoursSpecification = plannedHours
      .filter((d) => d.opens && d.closes)
      .map((d) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${d.day}`,
        opens: d.opens,
        closes: d.closes,
      }))
  }

  if (externalLinks.googleMaps) node.hasMap = externalLinks.googleMaps

  return node
}

export function websiteSchema(): Json {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absoluteUrl('/'),
    name: practiceName,
    inLanguage: 'en-US',
    publisher: { '@id': ORG_ID },
  }
}

export function webPageSchema(input: {
  name: string
  description: string
  path: string
}): Json {
  return {
    '@type': 'WebPage',
    '@id': `${absoluteUrl(input.path)}#webpage`,
    url: absoluteUrl(input.path),
    name: input.name,
    description: input.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en-US',
  }
}

export interface Crumb {
  name: string
  path: string
}

export function breadcrumbSchema(crumbs: readonly Crumb[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  }
}

/**
 * FAQPage. Only ever built from Q&A that is visibly rendered on the same page,
 * which is Google's stated requirement.
 */
export function faqSchema(items: readonly { question: string; answer: string }[]): Json {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

/**
 * Service node.
 * `provider` points at the practice only for services confirmed on site.
 * Unconfirmed and network services are NOT emitted as schema at all, so we
 * never advertise a service the practice does not currently provide.
 */
export function serviceSchema(input: {
  name: string
  description: string
  path: string
}): Json {
  return {
    '@type': 'Service',
    '@id': `${absoluteUrl(input.path)}#service`,
    name: input.name,
    description: input.description,
    serviceType: input.name,
    provider: { '@id': ORG_ID },
    areaServed: serviceArea.map((name) => ({ '@type': 'City', name })),
  }
}

export function blogPostingSchema(input: {
  headline: string
  description: string
  path: string
  datePublished: string
  dateModified?: string
  authorName: string
}): Json {
  return {
    '@type': 'BlogPosting',
    '@id': `${absoluteUrl(input.path)}#article`,
    headline: input.headline,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    author: { '@type': 'Organization', name: input.authorName, url: absoluteUrl('/') },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en-US',
  }
}

export function contactPointSchema(): Json {
  return {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email,
    areaServed: 'US',
    availableLanguage: ['English'],
  }
}

/** Wraps nodes in a single @graph so one script tag serves the whole page. */
export function buildGraph(nodes: readonly Json[]): string {
  return JSON.stringify(
    { '@context': 'https://schema.org', '@graph': nodes },
    null,
    process.env.NODE_ENV === 'development' ? 2 : 0,
  )
}
