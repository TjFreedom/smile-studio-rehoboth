import type { Metadata } from 'next'
import { absoluteUrl, practiceName, siteUrl } from '@/config/practice'

/**
 * Indexing gate.
 * Production sets NEXT_PUBLIC_ALLOW_INDEXING=true. Every other environment
 * (preview, staging, local) emits `noindex, nofollow` from both the meta tag
 * and the X-Robots-Tag header in next.config.mjs. Belt and braces, because a
 * staging domain leaking into the index is expensive to undo.
 */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'

interface PageSeoInput {
  title: string
  description: string
  /** Site-relative path, e.g. '/services/dental-implants'. */
  path: string
  /** Set false for utility pages such as thank-you screens. */
  index?: boolean
  ogImage?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
}

/**
 * Builds page metadata with a self-referencing canonical on the www origin.
 *
 * Title format: "<Page Title> | Smile Studio of Rehoboth". The home page
 * overrides this with its own keyword-led title, so no two pages share a title.
 */
export function pageMetadata({
  title,
  description,
  path,
  index = true,
  ogImage = '/og/default.png',
  /** Skip the "| Brand" template. For titles that already name the practice
   *  or that are long enough that the suffix would only be truncated. */
  absolute = false,
  type = 'website',
  publishedTime,
  modifiedTime,
}: PageSeoInput & { absolute?: boolean }): Metadata {
  const url = absoluteUrl(path)
  const shouldIndex = allowIndexing && index

  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
      googleBot: {
        index: shouldIndex,
        follow: shouldIndex,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type,
      url,
      siteName: practiceName,
      title,
      description,
      locale: 'en_US',
      images: [{ url: absoluteUrl(ogImage), width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(ogImage)],
    },
  }
}

/** metadataBase, shared by the root layout so relative asset URLs resolve. */
export const metadataBase = new URL(siteUrl)
