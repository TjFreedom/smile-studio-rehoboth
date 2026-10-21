import { createOpinlyClient } from '@opinly/backend'
import type { FullPost, Post } from '@opinly/backend'
import { siteUrl } from '@/config/practice'

/**
 * OPINLY CONTENT SOURCE
 * =====================
 * The practice publishes articles in Opinly. This module is the only place the
 * site talks to that API.
 *
 * WHY THIS IS NOT A NETLIFY FUNCTION
 * ----------------------------------
 * The sibling site at delawaresedation.com serves Opinly through a Netlify
 * function, because it is a static HTML site: the function has to scrape
 * index.html at request time to borrow the header and footer. This site is
 * Next.js and already has a /blog route with three published, indexed posts, so
 * a function mounted on /blog would shadow that route and take those posts off
 * the site. Fetching server-side inside the existing route reuses the real
 * layout, metadata, and schema helpers, and nothing gets de-indexed.
 *
 * FAILING SOFT IS THE POINT
 * -------------------------
 * Every function here returns empty or null rather than throwing. If the API
 * key is missing, the key is wrong, Opinly is down, or a request times out, the
 * blog still renders with the locally authored posts, which is exactly what it
 * does today. A content integration must never be able to take down a page that
 * worked before it existed.
 *
 * CONFIGURATION (both set in the Netlify dashboard, never in code):
 *   OPINLY_API_KEY        secret. Without it, no Opinly content is fetched.
 *   OPINLY_CDN_NAMESPACE  21-character public namespace for this site's images.
 *                         Not a secret: it is a path segment in an image URL.
 *                         next.config.mjs rewrites /blog-images/* to the CDN
 *                         using it, so images are served same-origin and the
 *                         Content-Security-Policy needs no external image host.
 */

const API_KEY = process.env.OPINLY_API_KEY
const CDN_NAMESPACE = process.env.OPINLY_CDN_NAMESPACE

/** Where Opinly images are proxied from. Must match next.config.mjs. */
export const OPINLY_IMAGES_PATH = '/blog-images'

/**
 * Opinly is only considered configured when BOTH values are present. The key
 * alone cannot build image URLs, and the namespace alone cannot authenticate.
 */
export const opinlyEnabled = Boolean(API_KEY && CDN_NAMESPACE)

/** Requests are given a ceiling so a slow upstream cannot hold a page open. */
const TIMEOUT_MS = 8000

function client() {
  if (!API_KEY) return null
  return createOpinlyClient({
    apiKey: API_KEY,
    // Reported so Opinly can resolve each post's live URL on this domain.
    site: { siteUrl, blogPrefix: '/blog' },
  })
}

async function withTimeout<T>(work: (signal: AbortSignal) => Promise<T>, label: string): Promise<T | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    return await work(controller.signal)
  } catch (err) {
    // Logged, never rethrown. See "failing soft" above.
    console.error(`[opinly] ${label} failed:`, err instanceof Error ? err.message : err)
    return null
  } finally {
    clearTimeout(timer)
  }
}

/** A post summary normalised into the shape the blog index already renders. */
export interface OpinlySummary {
  readonly slug: string
  readonly title: string
  readonly excerpt: string
  readonly date: string
  readonly category: string
  readonly source: 'opinly'
}

const toSummary = (p: Post): OpinlySummary => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.description,
  // ISO timestamp; the blog index only ever renders the date part.
  date: p.firstPublishedAt.slice(0, 10),
  category: p.category?.name ?? 'Article',
  source: 'opinly',
})

/**
 * Published posts, newest first. Returns [] when Opinly is not configured or
 * the request fails, which the index treats as "no Opinly articles yet".
 */
export async function listOpinlyPosts(limit = 50): Promise<OpinlySummary[]> {
  if (!opinlyEnabled) return []
  const api = client()
  if (!api) return []

  const result = await withTimeout(async () => {
    const page = await api.posts({ limit, sort: 'newest' })
    return page.data ?? []
  }, 'posts()')

  return (result ?? []).map(toSummary)
}

/** A single post by slug, or null if absent, unconfigured, or the call fails. */
export async function getOpinlyPost(slug: string): Promise<FullPost | null> {
  if (!opinlyEnabled) return null
  const api = client()
  if (!api) return null
  return withTimeout(() => api.post(slug), `post(${slug})`)
}

/** Slugs of every published post, for the sitemap. [] on any failure. */
export async function opinlyPostSlugs(): Promise<string[]> {
  if (!opinlyEnabled) return []
  const api = client()
  if (!api) return []

  const routes = await withTimeout(() => api.routes(), 'routes()')
  if (!routes) return []
  return routes
    .filter((r) => r.type === 'post' && typeof r.slug === 'string')
    .map((r) => r.slug as string)
}

/**
 * Site-relative URL for an Opinly image, pointing at this origin's rewrite
 * rather than the CDN host. Returns null when there is no file, so callers
 * render no <img> at all instead of a broken one.
 *
 * Deliberately relative. It is used both as an <img src> and as `ogImage` for
 * pageMetadata(), and pageMetadata() runs every ogImage through absoluteUrl().
 * Returning an absolute URL here would be absolutised a second time and produce
 * https://host/https://host/blog-images/...
 */
export function opinlyImagePath(fileKey: string | null | undefined): string | null {
  if (!fileKey || !CDN_NAMESPACE) return null
  return `${OPINLY_IMAGES_PATH}/${fileKey.replace(/^\/+/, '')}`
}
