/** @type {import('next').NextConfig} */

// Security headers. Applied to every route.
// CSP is intentionally strict: no external script hosts, except Google's tag
// host, which is added only when an analytics ID is configured at build time.
// The loaders themselves live in src/components/Analytics.tsx.
const analyticsEnabled = Boolean(
  process.env.NEXT_PUBLIC_GTM_ID || process.env.NEXT_PUBLIC_GA4_ID || process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
)
const clarityEnabled = Boolean(process.env.NEXT_PUBLIC_CLARITY_ID)
// The Google Ads tag (AW-...) also loads through gtag.js, so it needs the tag
// host too; analyticsEnabled covers that when only the Ads ID is set.
const adsEnabled = Boolean(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID)

// Hosts gtag.js and GTM talk to. Regional collection endpoints are
// subdomains of google-analytics.com and analytics.google.com.
// Microsoft Clarity serves its tag from www.clarity.ms and uploads session
// data to per-region subdomains; c.bing.com is its cookie-sync endpoint.
/**
 * Opinly web analytics pixel. The script is served from static.opinly.ai, and
 * the pixel derives its own API host from its script origin
 * (`new URL(scriptEl.src).origin`), posting events to
 * https://static.opinly.ai/track with fetch(). The SAME host is therefore
 * needed in BOTH script-src and connect-src: with script-src alone the pixel
 * loads, looks installed, and every event it sends is silently blocked.
 *
 * Gated on the key being configured, so the CSP never advertises a host the
 * site does not actually talk to.
 */
const opinlyPixelEnabled = Boolean(process.env.NEXT_PUBLIC_OPINLY_PIXEL_KEY)
const opinlyHost = opinlyPixelEnabled ? ' https://static.opinly.ai' : ''

/**
 * Google Ads conversion endpoints. The URL-based conversion on
 * /visit/thank-you is reported by the Ads tag with fetch() and image beacons
 * to pagead2.googlesyndication.com (and, depending on consent state, to
 * google.com, googleadservices.com, and googleads.g.doubleclick.net). Without
 * these in connect-src and img-src the tag loads, looks installed in Google
 * Ads, and every conversion ping is silently blocked.
 */
const adsScriptHosts = adsEnabled
  ? ' https://www.googleadservices.com https://pagead2.googlesyndication.com'
  : ''
const adsBeaconHosts = adsEnabled
  ? ' https://pagead2.googlesyndication.com https://www.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net'
  : ''
const adsFrameHosts = adsEnabled ? ' https://td.doubleclick.net https://bid.g.doubleclick.net' : ''

const analyticsScriptHosts =
  (analyticsEnabled ? ' https://www.googletagmanager.com' : '') +
  (clarityEnabled ? ' https://www.clarity.ms https://*.clarity.ms' : '') +
  adsScriptHosts +
  opinlyHost
const analyticsConnectHosts =
  (analyticsEnabled
    ? ' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com'
    : '') +
  (clarityEnabled ? ' https://*.clarity.ms https://c.bing.com' : '') +
  adsBeaconHosts +
  opinlyHost
const analyticsImageHosts =
  (analyticsEnabled ? ' https://www.googletagmanager.com https://*.google-analytics.com' : '') +
  (clarityEnabled ? ' https://*.clarity.ms https://c.bing.com' : '') +
  adsBeaconHosts

const ContentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  // 'unsafe-inline' is required for Next.js streaming/hydration style injection.
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  `img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com${analyticsImageHosts}`,
  // Google Maps is loaded only after an explicit user click (see StaticMap).
  `frame-src 'self' https://www.google.com https://maps.google.com${adsFrameHosts}`,
  // The dev server's HMR socket uses ws:, which 'self' does not cover.
  `connect-src 'self'${analyticsConnectHosts}${process.env.NODE_ENV === 'development' ? ' ws: wss:' : ''}`,
  // React's dev overlay needs eval(). Production never does, so the
  // relaxation is scoped strictly to the dev server.
  `script-src 'self' 'unsafe-inline'${analyticsScriptHosts}${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
  "upgrade-insecure-requests",
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
]

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Staging/preview deployments must never be indexed. Vercel/Netlify set
      // these env vars on non-production deploys.
      ...(process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'
        ? []
        : [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }]),
    ]
  },
  async redirects() {
    return [
      // Legacy / convenience paths -> canonical routes.
      { source: '/home', destination: '/', permanent: true },
      { source: '/index', destination: '/', permanent: true },
      { source: '/dentist-rehoboth-beach', destination: '/', permanent: true },
      { source: '/our-services', destination: '/services', permanent: true },
      { source: '/service/:slug', destination: '/services/:slug', permanent: true },
      { source: '/new-patient', destination: '/new-patients', permanent: true },
      // Booking aliases. These point at /request-appointment, which decides for
      // itself whether booking is live and forwards to the opening list if it
      // is not. That keeps `openingStatus` the single source of truth in
      // src/config/practice.ts, rather than duplicating it here where this file
      // (.mjs) cannot import it.
      //
      // Deliberately NOT permanent. The right answer to "I want an appointment"
      // changes as the practice moves from under-construction to scheduling to
      // open. A 301 is cached hard by browsers and by Google, so using one here
      // would pin visitors to whichever answer was true the day they clicked.
      { source: '/appointments', destination: '/request-appointment', permanent: false },
      { source: '/book', destination: '/request-appointment', permanent: false },
      { source: '/schedule', destination: '/request-appointment', permanent: false },
      { source: '/meet-the-team', destination: '/team', permanent: true },
      { source: '/location', destination: '/contact/directions', permanent: true },
      { source: '/directions', destination: '/contact/directions', permanent: true },
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/terms', destination: '/website-terms', permanent: true },
      { source: '/accessibility', destination: '/accessibility-statement', permanent: true },
    ]
  },
}

/* --------------------------------------------------------------------------
   OPINLY IMAGES
   --------------------------------------------------------------------------
   Opinly article images live on cdn.opinly.ai under a 21-character namespace
   unique to this site. Rather than letting the browser fetch them from that
   host, they are rewritten through this origin, which matters for two reasons:
   the Content-Security-Policy above allows images from 'self' and data: only,
   so a direct CDN URL would be blocked outright; and proxying keeps article
   images on the same domain as the rest of the site.

   The rewrite is added ONLY when OPINLY_CDN_NAMESPACE is set. Opinly's own
   withOpinlyConfig() validates the namespace with zod and throws on a missing
   or short value, which would turn "someone forgot an env var" into "the
   production build fails". A content integration should degrade to no content,
   never to no site. src/lib/opinly.ts makes the same check before calling the
   API, so an unconfigured deploy simply shows the locally authored posts.
   -------------------------------------------------------------------------- */

const opinlyNamespace = process.env.OPINLY_CDN_NAMESPACE

if (opinlyNamespace) {
  const existingRewrites = nextConfig.rewrites
  nextConfig.rewrites = async () => {
    const opinly = [
      {
        source: '/blog-images/:path*',
        destination: `https://cdn.opinly.ai/${opinlyNamespace}/:path*`,
      },
    ]
    if (typeof existingRewrites !== 'function') return opinly
    const resolved = await existingRewrites()
    return Array.isArray(resolved) ? [...resolved, ...opinly] : resolved
  }
} else if (process.env.NODE_ENV === 'production') {
  console.warn(
    '[opinly] OPINLY_CDN_NAMESPACE is not set. Article images will not be served and Opinly content is disabled. Set it in the Netlify dashboard alongside OPINLY_API_KEY.',
  )
}

export default nextConfig
