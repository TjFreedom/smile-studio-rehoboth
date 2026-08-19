import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, PageHero, SectionHead, Callout } from '@/components/Ui'
import { CtaBand } from '@/components/Blocks'
import { webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { externalLinks, features } from '@/config/practice'

const TITLE = 'Patient Resources'
const DESCRIPTION =
  'Patient resources from Smile Studio of Rehoboth in Rehoboth Beach, DE, including emergency information, insurance guidance, and educational articles.'
const PATH = '/patient-resources'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

/**
 * Resource tiles.
 * `available: false` renders the tile in a clearly disabled state with a reason,
 * rather than linking to a page that does not work yet or a dead "#" href.
 */
const resources = [
  {
    h: 'Dental Emergency Information',
    p: 'What to do about a dental emergency while the office is under construction, and what we will offer once we open.',
    href: '/patient-resources/dental-emergency-information',
    available: true,
  },
  {
    h: 'Insurance and Payment Options',
    p: 'How we will handle costs and estimates, and what is still being confirmed.',
    href: '/new-patients/insurance-and-financing',
    available: true,
  },
  {
    h: 'Post-Operative Instructions',
    p: 'Aftercare guidance following treatment.',
    href: '/patient-resources/post-operative-instructions',
    available: true,
  },
  {
    h: 'Referring Provider Information',
    p: 'For dentists and physicians considering a referral to our practice.',
    href: '/patient-resources/referring-providers',
    available: true,
  },
  {
    h: 'Blog and Educational Resources',
    p: 'Articles about the practice, the new office, and dental care.',
    href: '/blog',
    available: features.enableBlog,
  },
  {
    h: 'Patient Forms',
    p: 'Intake paperwork. Not available until the practice opens.',
    href: '/new-patients/patient-forms',
    available: true,
  },
]

export default function Page() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Patient Resources', path: PATH },
  ]

  return (
    <>
      <JsonLd nodes={[webPageSchema({ name: TITLE, description: DESCRIPTION, path: PATH })]} />

      <PageHero
        eyebrow="Resources"
        title="Patient Resources"
        lede="Useful information for future patients. Resources that depend on the practice being open are marked as such rather than hidden behind a link that does not work."
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {resources
              .filter((r) => r.available)
              .map((r) => (
                <article key={r.href} className="card card--link">
                  <h2 style={{ fontSize: 'var(--fs-h3)', fontFamily: 'var(--font-sans)' }}>{r.h}</h2>
                  <p style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-small)' }}>{r.p}</p>
                  <Link href={r.href} className="link-arrow" style={{ marginTop: 'var(--sp-4)' }}>
                    Open
                    <span className="sr-only"> {r.h}</span>
                  </Link>
                </article>
              ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead
            eyebrow="Not yet available"
            title="Resources That Open With the Practice"
            lede="These require systems that do not exist yet. Rather than publishing links that go nowhere, here is what each will be and when it arrives."
          />

          <div className="grid grid-3">
            {[
              {
                h: 'Online Scheduling',
                p: 'Book an appointment directly. Requires the scheduling system to be live, which will happen at opening.',
                enabled: Boolean(externalLinks.onlineScheduling),
              },
              {
                h: 'Pay Online',
                p: 'Settle a balance from home. Requires the payment portal, which is set up once the practice is operating.',
                enabled: Boolean(externalLinks.payOnline),
              },
              {
                h: 'Notice of Privacy Practices',
                p: 'The formal notice describing how your health information is used and protected. Published before we accept our first patient.',
                enabled: Boolean(externalLinks.noticeOfPrivacyPractices),
              },
            ].map((r) => (
              <div key={r.h} className="card" style={{ opacity: 0.85 }}>
                <span className="tier-badge">Not yet available</span>
                <h3 style={{ marginTop: 'var(--sp-3)' }}>{r.h}</h3>
                <p style={{ marginTop: 'var(--sp-2)', fontSize: 'var(--fs-small)' }}>{r.p}</p>
              </div>
            ))}
          </div>

          <Callout className="mt-0" variant="info">
            <p style={{ fontSize: 'var(--fs-small)' }}>
              Opening list subscribers hear when each of these goes live, along with the confirmed
              opening date and early scheduling information.
            </p>
          </Callout>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
