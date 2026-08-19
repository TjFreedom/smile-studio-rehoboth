import type { Metadata } from 'next'
import { JsonLd, PageHero, Button, PlaceholderNote, SectionHead } from '@/components/Ui'
import { CtaBand } from '@/components/Blocks'
import { webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { features, practiceName } from '@/config/practice'

const TITLE = 'Meet the Team'
const DESCRIPTION =
  'Provider introductions for Smile Studio of Rehoboth in Rehoboth Beach, DE will be published before the office opens.'
const PATH = '/team'

/**
 * Holding page.
 *
 * `features.enableTeamPages` is false, so this page is excluded from the
 * navigation and the XML sitemap, and it is set to noindex. It exists so that
 * anyone arriving from an old link or a direct URL gets a real explanation
 * rather than a 404, and so the route is ready the moment provider content is
 * approved.
 */
export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  index: features.enableTeamPages,
})

export default function Page() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Meet the Team', path: PATH },
  ]

  return (
    <>
      <JsonLd nodes={[webPageSchema({ name: TITLE, description: DESCRIPTION, path: PATH })]} />

      <PageHero
        eyebrow="Our team"
        title="Provider Introductions Are Coming"
        lede={`${practiceName} is under construction, and the provider team has not been announced. When it is, you will meet every dentist and clinical team member here.`}
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container container--narrow">
          <div className="article-body">
            <h2>Why this page is empty</h2>
            <p>
              A lot of new practice websites fill this space with stock photographs of models in lab
              coats, or with biographies for providers who have not been hired. We are not going to
              do that. Choosing a dentist is a decision about a person, and the page that introduces
              those people should be true from the first day it is published.
            </p>

            <h2>What you will find here before we open</h2>
            <p>For every dentist and clinical team member:</p>
            <ul style={{ display: 'grid', gap: 'var(--sp-2)', paddingLeft: '1.35rem' }}>
              <li>Full name and accurate credentials, stated exactly as they are held</li>
              <li>Dental school and any postgraduate training</li>
              <li>Delaware licensure</li>
              <li>Clinical areas of interest, and what they most enjoy treating</li>
              <li>Professional memberships</li>
              <li>A real photograph, taken at this practice</li>
              <li>Something about who they are outside the office</li>
            </ul>

            <h2>On credentials</h2>
            <p>
              We will state credentials accurately, and we will not imply specialty status where a
              recognized specialty credential is not held. A general dentist with a strong interest
              and substantial training in an area is describable as exactly that, which is honest
              and still worth knowing.
            </p>

            <h2>Hearing first</h2>
            <p>
              Provider announcements go to the opening list before they are published anywhere else.
              If knowing who your dentist will be matters to your decision, and it reasonably might,
              that is the fastest way to find out.
            </p>
          </div>

          <PlaceholderNote label="Required before publication: provider content">
            This page is hidden from navigation and the sitemap and is set to noindex via
            features.enableTeamPages in src/config/practice.ts. Before enabling: confirm the
            provider roster, verify credentials and Delaware licence numbers, obtain approved
            biographies, complete headshots to the Brand Guidelines section 5 standard, obtain
            written sign-off from each provider on their own biography, and add Person schema. Use
            docs/PROVIDER-BIO-TEMPLATE.md. Owner: Director of Marketing and Communications with
            Clinical Lead.
          </PlaceholderNote>

          <div className="btn-row" style={{ justifyContent: 'center', marginTop: 'var(--sp-8)' }}>
            <Button href="/opening-list" size="lg">
              Hear Provider Announcements First
            </Button>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container container--narrow text-center">
          <SectionHead
            eyebrow="Careers"
            title="Are You a Clinician Reading This?"
            center
            lede="We are building a team from scratch, which is a rare thing to be part of. If you are a dentist, hygienist, assistant, or front office professional in coastal Delaware, we would like to hear from you."
          />
          <div className="btn-row" style={{ justifyContent: 'center' }}>
            <Button href="/careers" variant="outline">
              About Working With Us
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
