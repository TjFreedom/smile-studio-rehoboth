import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/config/practice'
import { allowIndexing } from '@/lib/seo'

/**
 * robots.txt
 *
 * Production allows crawling of everything except API routes and thank-you
 * pages. Any non-production environment disallows everything, which keeps
 * staging and preview deploys out of the index.
 */
export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    return { rules: [{ userAgent: '*', disallow: '/' }] }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/thank-you/', '/__forms.html'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/').replace(/\/$/, ''),
  }
}
