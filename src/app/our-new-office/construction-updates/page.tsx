import type { Metadata } from 'next'
import { JsonLd, PageHero, SectionHead, PlaceholderNote, Button } from '@/components/Ui'
import { CtaBand, Timeline } from '@/components/Blocks'
import { webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { sortedUpdates } from '@/content/construction'
import { formatDate } from '@/content/blog'
import { openingQualifier } from '@/config/practice'

const TITLE = 'Construction Updates'
const DESCRIPTION =
  'Construction progress at Smile Studio of Rehoboth, 19411 Plantations Road, Rehoboth Beach, DE. Updates posted as the build-out moves forward.'
const PATH = '/our-new-office/construction-updates'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

export default function Page() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Our New Office', path: '/our-new-office' },
    { name: 'Construction Updates', path: PATH },
  ]

  return (
    <>
      <JsonLd nodes={[webPageSchema({ name: TITLE, description: DESCRIPTION, path: PATH })]} />

      <PageHero
        eyebrow="Progress"
        title="Construction Updates"
        lede="Real progress, posted as it happens. When there is nothing to report, we would rather post nothing than pad the page."
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <SectionHead eyebrow="Updates" title="Latest from the Build-Out" as="h2" />

              {sortedUpdates.length === 0 ? (
                <p className="lede">
                  No updates have been posted yet. Join the opening list and we will send them to you
                  as they are published.
                </p>
              ) : (
                <ul className="post-list">
                  {sortedUpdates.map((u) => (
                    <li key={u.slug}>
                      <article className="card post-card">
                        <div className="post-card__meta">
                          <time dateTime={u.date}>{formatDate(u.date)}</time>
                          <span>Construction update</span>
                        </div>
                        <h3 style={{ fontSize: 'var(--fs-h3)' }}>{u.title}</h3>
                        <div className="article-body" style={{ marginTop: 'var(--sp-4)' }}>
                          {u.body.map((p) => (
                            <p key={p.slice(0, 40)} style={{ fontSize: 'var(--fs-body)' }}>
                              {p}
                            </p>
                          ))}
                        </div>

                        {u.image ? (
                          <figure style={{ marginTop: 'var(--sp-5)' }}>
                            {/* Approved construction photography only. */}
                            <img src={u.image.src} alt={u.image.alt} loading="lazy" />
                            {u.image.caption ? <figcaption>{u.image.caption}</figcaption> : null}
                          </figure>
                        ) : null}
                      </article>
                    </li>
                  ))}
                </ul>
              )}

              <PlaceholderNote label="Placeholder: construction photography">
                Updates are currently text only. No approved construction photography exists. Add
                images to src/content/construction.ts as they are captured and approved. Required
                per update: 3:2 landscape at 2000px minimum, descriptive alt text naming what the
                photograph actually shows, and a caption with the capture date. Do not substitute
                stock imagery of an unrelated construction site or dental office.
              </PlaceholderNote>
            </div>

            <aside className="split__aside">
              <div className="card card--soft">
                <h3>Milestones</h3>
                <div style={{ marginTop: 'var(--sp-5)' }}>
                  <Timeline />
                </div>
              </div>

              <div className="card">
                <h3>Get updates by email</h3>
                <p style={{ fontSize: 'var(--fs-small)', marginTop: 'var(--sp-2)' }}>
                  Construction progress, provider introductions, and the confirmed opening date go
                  to the opening list first.
                </p>
                <div style={{ marginTop: 'var(--sp-4)' }}>
                  <Button href="/opening-list" full>
                    Join the Opening List
                  </Button>
                </div>
              </div>
            </aside>
          </div>

          <p
            style={{
              marginTop: 'var(--sp-8)',
              fontSize: 'var(--fs-caption)',
              color: 'var(--mist)',
              maxWidth: '76ch',
            }}
          >
            {openingQualifier}
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
