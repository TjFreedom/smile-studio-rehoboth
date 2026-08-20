import type { Metadata } from 'next'
import { JsonLd, PageHero, SectionHead, PlaceholderNote, Button } from '@/components/Ui'
import { CtaBand, Timeline } from '@/components/Blocks'
import { ConstructionStory, StoryNav } from '@/components/ConstructionStory'
import { webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { sortedUpdates, totalStoryPhotos } from '@/content/construction'
import { formatDate } from '@/content/blog'
import { openingQualifier } from '@/config/practice'

const TITLE = 'Construction Updates'
const DESCRIPTION =
  'Follow the build of Smile Studio of Rehoboth at 19411 Plantations Road, Rehoboth Beach, DE, from trenching the underground plumbing to the concrete floor.'
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
        eyebrow="Building your practice"
        title="Watch Your Dental Office Being Built"
        lede="Most people meet a dental practice on the day it opens. You get to see it from the dirt up. This is the real build at 19411 Plantations Road, photographed on site."
        crumbs={crumbs}
      >
        <div className="btn-row" style={{ marginTop: 'var(--sp-6)' }}>
          <Button href="/opening-list">Get Updates by Email</Button>
          <Button href="#story" variant="outline">
            Start the Story
          </Button>
        </div>
      </PageHero>

      {/* ---------------------------------------------------------------- *
       * THE PHOTO STORY
       * ---------------------------------------------------------------- */}
      <section className="section" id="story">
        <div className="container">
          <SectionHead
            eyebrow={`${totalStoryPhotos} photographs from site`}
            title="From String Lines to a Floor Ready for Concrete"
            lede="Underground plumbing is the stage of a dental build with the least room for error, because all of it disappears under the slab. Here is how it went in."
          />

          <StoryNav />
          <ConstructionStory />
        </div>
      </section>

      {/* ---------------------------------------------------------------- *
       * MILESTONES + WRITTEN UPDATES
       * ---------------------------------------------------------------- */}
      <section className="section section--soft">
        <div className="container">
          <div className="split">
            <div>
              <SectionHead eyebrow="Written updates" title="Progress Reports" as="h2" />

              <ul className="post-list">
                {sortedUpdates.map((u) => (
                  <li key={u.slug}>
                    <article className="card post-card">
                      <div className="post-card__meta">
                        <time dateTime={u.date}>{formatDate(u.date)}</time>
                        <span>Construction update</span>
                      </div>
                      <h3 style={{ fontSize: 'var(--fs-h3)' }}>{u.title}</h3>

                      {u.image ? (
                        <figure style={{ margin: 'var(--sp-4) 0 0' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimised static JPEG */}
                          <img
                            src={u.image.src}
                            alt={u.image.alt}
                            loading="lazy"
                            decoding="async"
                            width={1600}
                            height={2134}
                            style={{
                              width: '100%',
                              height: 'auto',
                              maxHeight: '420px',
                              objectFit: 'cover',
                              objectPosition: 'center 60%',
                              borderRadius: 'var(--radius)',
                              border: '1px solid var(--line)',
                              filter: 'saturate(0.94)',
                            }}
                          />
                          {u.image.caption ? <figcaption>{u.image.caption}</figcaption> : null}
                        </figure>
                      ) : null}

                      <div className="article-body" style={{ marginTop: 'var(--sp-4)' }}>
                        {u.body.map((p) => (
                          <p key={p.slice(0, 40)} style={{ fontSize: 'var(--fs-body)' }}>
                            {p}
                          </p>
                        ))}
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="split__aside">
              <div className="card card--soft">
                <h3>Where we are</h3>
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

              <PlaceholderNote label="Needed: dates for the photo story">
                The site photography arrived without EXIF timestamps, so the story is ordered by
                construction phase rather than by date, and no dates have been invented. Ask the
                construction manager to confirm when each phase happened, then set the `date` field
                on each chapter in src/content/construction.ts.
              </PlaceholderNote>
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

      <CtaBand
        eyebrow="Follow along"
        title="See the Concrete Go Down"
        lede="The next update from this room will have a floor in it. Opening list subscribers get progress photos, provider introductions, and the confirmed opening date first."
      />
    </>
  )
}
