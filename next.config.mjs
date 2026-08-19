/** @type {import('next').NextConfig} */

// Security headers. Applied to every route.
// CSP is intentionally strict: no external script hosts. Analytics loaders are
// added here (not inline) when GTM is enabled, so the policy stays auditable.
const ContentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  // 'unsafe-inline' is required for Next.js streaming/hydration style injection.
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com",
  // Google Maps is loaded only after an explicit user click (see StaticMap).
  "frame-src 'self' https://www.google.com https://maps.google.com",
  // The dev server's HMR socket uses ws:, which 'self' does not cover.
  `connect-src 'self'${process.env.NODE_ENV === 'development' ? ' ws: wss:' : ''}`,
  // React's dev overlay needs eval(). Production never does, so the
  // relaxation is scoped strictly to the dev server.
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
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
      { source: '/appointments', destination: '/opening-list', permanent: true },
      { source: '/book', destination: '/opening-list', permanent: true },
      { source: '/schedule', destination: '/opening-list', permanent: true },
      { source: '/request-appointment', destination: '/opening-list', permanent: true },
      { source: '/meet-the-team', destination: '/team', permanent: true },
      { source: '/location', destination: '/contact/directions', permanent: true },
      { source: '/directions', destination: '/contact/directions', permanent: true },
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/terms', destination: '/website-terms', permanent: true },
      { source: '/accessibility', destination: '/accessibility-statement', permanent: true },
    ]
  },
}

export default nextConfig
