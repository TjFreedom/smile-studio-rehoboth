import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, PageHero, SectionHead, PlaceholderNote, Button } from '@/components/Ui'
import { CtaBand, LocationDetails, StaticMap, Timeline } from '@/components/Blocks'
import { webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { sortedUpdates } from '@/content/construction'
import { formatDate } from '@/content/blog'
import {
  address,
  anticipatedOpening,
  hoursLabel,
  openingQualifier,
  practiceName,
} from '@/config/practice'

const TITLE = 'Our New Rehoboth Beach Office'
const DESCRIPTION =
  'Our new dental office is under construction at 19411 Plantations Road in Plantations Professional Park, Rehoboth Beach, DE. See the progress.'
const PATH = '/our-new-office'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

const subpages = [
  {
    h: 'Construction Updates',
    p: 'Progress from the build-out, posted as it actually happens.',
    href: '/our-new-office/construction-updates',
  },
  {
    h: 'Office Features',
    p: 'What we are designing into the space, and what has not been finalised.',
    href: '/our-new-office/office-features',
  },
  {
    h: 'Technology',
    p: 'What we intend to install, described honestly as a plan rather than an inventory.',
    href: '/our-new-office/technology',
  },
  {
    h: 'Planned Office Hours',
    p: 'Monday through Friday, 8:00 a.m. to 5:00 p.m., and why weekends are still open.',
    href: '/our-new-office/planned-hours',
  },
  {
    h: 'Opening FAQ',
    p: 'Everything we are being asked about the opening, answered.',
    href: '/our-new-office/opening-faq',
  },
]

export default function Page() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Our New Office', path: PATH },
  ]
  const latest = sortedUpdates[0]

  return (
    <>
      <JsonLd nodes={[webPageSchema({ name: TITLE, description: DESCRIPTION, path: PATH })]} />

      <PageHero
        eyebrow="Under construction"
        title="Our New Rehoboth Beach Office"
        lede={`${practiceName} is being built at ${address.line1} in ${address.complex}. We anticipate opening in ${anticipatedOpening}.`}
        crumbs={crumbs}
      >
        <div className="btn-row" style={{ marginTop: 'var(--sp-6)' }}>
          <Button href="/opening-list">Join the Opening List</Button>
          <Button href="/our-new-office/construction-updates" variant="outline">
            See Construction Updates
          </Button>
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <SectionHead eyebrow="Progress" title="Where Things Stand" as="h2" />
              <Timeline />
              <p style={{ marginTop: 'var(--sp-6)', fontSize: 'var(--fs-caption)', color: 'var(--mist)' }}>
                Only completed milestones are marked complete. We are not going to publish a
                percentage or a milestone date we have not been given. {openingQualifier}
              </p>

              <PlaceholderNote label="Placeholder: construction photography and renderings">
                No approved renderings or construction photographs exist yet. See
                docs/PHOTOGRAPHY-SHOT-LIST.md for the pre-opening shot list, including exterior,
                entrance, reception build-out, operatory framing, cabinetry installation, and
                signage. Add approved images to src/content/construction.ts.
              </PlaceholderNote>
            </div>

            <aside className="split__aside">
              {latest ? (
                <article className="card">
                  <span className="eyebrow" style={{ marginBottom: 'var(--sp-2)' }}>
                    Latest update
                  </span>
                  <h3>{latest.title}</h3>
                  <p style={{ fontSize: 'var(--fs-caption)', color: 'var(--mist)', marginTop: '0.35rem' }}>
                    {formatDate(latest.date)}
                  </p>
                  <p style={{ fontSize: 'var(--fs-small)', marginTop: 'var(--sp-3)' }}>
                    {latest.summary}
                  </p>
                  <Link
                    href="/our-new-office/construction-updates"
                    className="link-arrow"
                    style={{ marginTop: 'var(--sp-4)' }}
                    data-event="construction_update_view"
                  >
                    Read all updates
                  </Link>
                </article>
              ) : null}

              <div className="card card--soft">
                <h3>{hoursLabel}</h3>
                <p style={{ fontSize: 'var(--fs-small)', marginTop: 'var(--sp-2)' }}>
                  Monday through Friday, 8:00 a.m. to 5:00 p.m. Weekend hours have not been set.
                </p>
                <Link href="/our-new-office/planned-hours" className="link-arrow" style={{ marginTop: 'var(--sp-3)' }}>
                  About the planned hours
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <SectionHead eyebrow="Explore" title="More About the New Office" center ruled />
          <div className="grid grid-3">
            {subpages.map((s) => (
              <article key={s.href} className="card card--link">
                <h3>{s.h}</h3>
                <p style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-small)' }}>{s.p}</p>
                <Link href={s.href} className="link-arrow" style={{ marginTop: 'var(--sp-4)' }}>
                  Read more
                  <span className="sr-only"> about {s.h}</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Location"
            title="Plantations Professional Park"
            lede="Just off the Coastal Highway and Route 1 corridor, with access from the Route 24 and Route 9 corridors."
          />
          <div className="split">
            <StaticMap />
            <aside className="split__aside">
              <LocationDetails />
            </aside>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
