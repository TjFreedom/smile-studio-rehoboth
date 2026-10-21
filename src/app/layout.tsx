import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import './globals.css'
import './components.css'
import { Header } from '@/components/Header'
import { AnnouncementBar, Footer, MobileActionBar } from '@/components/Chrome'
import { Analytics } from '@/components/Analytics'
import { ChromeGate } from '@/components/ChromeGate'
import { JsonLd } from '@/components/Ui'
import { practiceSchema, websiteSchema } from '@/lib/schema'
import { metadataBase } from '@/lib/seo'
import { practiceName } from '@/config/practice'

/**
 * Brand typefaces, self-hosted at build time by next/font. Self-hosting removes
 * the render-blocking request to fonts.googleapis.com, keeps a third-party
 * origin out of the CSP, and pairs with adjustFontFallback so the swap causes
 * no layout shift.
 *
 * Only the weights the stylesheet actually uses are declared. Every declared
 * weight becomes a preloaded file competing for bandwidth on the critical
 * path, and the H1 is the Largest Contentful Paint element on most pages.
 *
 * Cormorant Garamond 600 is the only serif cut in use: headings are SemiBold,
 * and Brand Guide §4 forbids synthetic bold or italic on Cormorant, so no
 * other cut is referenced.
 */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600'],
  style: ['normal'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
  fallback: ['EB Garamond', 'Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: true,
})

/** Montserrat Regular for body, SemiBold for emphasis, buttons, and navigation. */
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  fallback: ['Lato', 'Open Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
  adjustFontFallback: true,
})

/**
 * Captions and citations only (Brand Guide §4 reserves italic for these).
 * Declared separately with preload disabled: captions are always below the
 * fold, so this must not compete with the heading font for critical bandwidth.
 */
const montserratItalic = Montserrat({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-montserrat-italic',
  display: 'swap',
  preload: false,
  fallback: ['Lato', 'Open Sans', 'Helvetica Neue', 'Arial', 'sans-serif'],
})

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `New Dentist Coming to Rehoboth Beach, DE | ${practiceName}`,
    // Every interior page supplies its own title; this appends the brand.
    template: `%s | ${practiceName}`,
  },
  description:
    'Smile Studio of Rehoboth is under construction at 19411 Plantations Road in Rehoboth Beach, Delaware, with an anticipated opening in late November or early December 2026. Join the opening list.',
  applicationName: practiceName,
  authors: [{ name: practiceName }],
  creator: practiceName,
  publisher: practiceName,
  formatDetection: {
    // No phone number exists yet. Suppress iOS auto-linking so no device
    // invents a tel: link from a number-like string such as the street address.
    telephone: false,
    address: false,
    email: false,
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B2859',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-US"
      className={`${cormorant.variable} ${montserrat.variable} ${montserratItalic.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        {/* Site chrome is withheld on paid-traffic landing pages, which carry
            their own minimal header and footer. See components/ChromeGate.tsx. */}
        <ChromeGate>
          <AnnouncementBar />
          <Header />
        </ChromeGate>

        <main id="main" tabIndex={-1}>
          {children}
        </main>

        <ChromeGate>
          <Footer />
          <MobileActionBar />
        </ChromeGate>

        {/* Site-wide entity graph. Page-level nodes are added per route. */}
        <JsonLd nodes={[practiceSchema(), websiteSchema()]} />
        <Analytics />
      </body>
    </html>
  )
}
