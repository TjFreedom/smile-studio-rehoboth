import type { MetadataRoute } from 'next'
import { absoluteUrl, features, isAcceptingAppointments } from '@/config/practice'
import { serviceSlugs } from '@/content/services'
import { postSlugs } from '@/content/blog'
import { allowIndexing } from '@/lib/seo'

/**
 * XML sitemap.
 *
 * Only indexable pages appear. Thank-you screens, API routes, and any page
 * whose feature flag is off are excluded, so the sitemap never advertises a
 * URL that returns noindex or does not exist.
 *
 * On non-production deploys the sitemap is empty, matching the noindex posture
 * of the rest of the site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!allowIndexing) return []

  const now = new Date()

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'monthly',
  ) => ({ url: absoluteUrl(path), lastModified: now, changeFrequency, priority })

  const core: MetadataRoute.Sitemap = [
    entry('/', 1.0, 'weekly'),
    entry('/opening-list', 0.9, 'monthly'),
    ...(isAcceptingAppointments ? [entry('/request-appointment', 0.95, 'monthly')] : []),
    entry('/our-new-office', 0.8, 'weekly'),
    entry('/our-new-office/construction-updates', 0.8, 'weekly'),
    entry('/our-new-office/office-features', 0.6),
    entry('/our-new-office/technology', 0.6),
    entry('/our-new-office/planned-hours', 0.6),
    entry('/our-new-office/opening-faq', 0.7),
    entry('/contact', 0.8),
    entry('/contact/directions', 0.7),
    entry('/about', 0.8),
    entry('/about/our-approach', 0.6),
    entry('/about/whole-person-care', 0.6),
    entry('/about/freedom-dental-health', 0.6),
    entry('/about/community', 0.5),
    entry('/services', 0.9, 'monthly'),
    entry('/new-patients', 0.8),
    entry('/new-patients/what-to-expect', 0.6),
    entry('/new-patients/insurance-and-financing', 0.6),
    entry('/new-patients/patient-forms', 0.5),
    entry('/new-patients/faq', 0.7),
    entry('/patient-resources', 0.6),
    entry('/patient-resources/dental-emergency-information', 0.6),
    entry('/patient-resources/post-operative-instructions', 0.4),
    entry('/patient-resources/referring-providers', 0.4),
    entry('/careers', 0.4),
    entry('/site-map', 0.3, 'yearly'),
    entry('/privacy-policy', 0.2, 'yearly'),
    entry('/website-terms', 0.2, 'yearly'),
    entry('/accessibility-statement', 0.2, 'yearly'),
    entry('/website-disclaimer', 0.2, 'yearly'),
  ]

  const serviceEntries = serviceSlugs.map((slug) => entry(`/services/${slug}`, 0.7))

  const blogEntries = features.enableBlog
    ? [entry('/blog', 0.6, 'weekly'), ...postSlugs.map((slug) => entry(`/blog/${slug}`, 0.5))]
    : []

  // Team pages stay out of the sitemap until real provider content exists.
  const teamEntries = features.enableTeamPages ? [entry('/team', 0.7)] : []

  return [...core, ...serviceEntries, ...blogEntries, ...teamEntries]
}
