import type { Metadata } from 'next'
import { JsonLd, PageHero, SectionHead } from '@/components/Ui'
import { CtaBand } from '@/components/Blocks'
import { personSchema, webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { anticipatedOpening, practiceName } from '@/config/practice'
import { providers } from '@/content/providers'

const TITLE = 'Meet the Team'
const DESCRIPTION = `Meet the dentist at ${practiceName} in Rehoboth Beach, Delaware, including training, honors, and the ties that brought him to Sussex County.`
const PATH = '/team'

/**
 * Provider introductions.
 *
 * Every fact on this page comes from src/content/providers.ts, which in turn
 * comes from the practice's own Provider Spotlight announcement. Sections are
 * rendered only when the underlying data exists, so a missing credential or
 * license number removes its element rather than printing an empty label or a
 * guess. See the sourcing rule at the top of that file.
 */
export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default function Page() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Meet the Team', path: PATH },
  ]

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
          ...providers.map(personSchema),
        ]}
      />

      <PageHero
        eyebrow="Our team"
        title="Meet Your Dentist"
        lede={`${practiceName} opens in ${anticipatedOpening}. This is the dentist who will be looking after you.`}
        crumbs={crumbs}
      />

      {providers.map((p) => (
        <section className="section" key={p.slug} id={p.slug}>
          <div className="container">
            <div className="split">
              {p.photo ? (
                <div>
                  <img
                    src={p.photo.src}
                    srcSet={`${p.photo.srcSmall} 500w, ${p.photo.src} 1000w`}
                    sizes="(max-width: 700px) 86vw, 420px"
                    width={p.photo.width}
                    height={p.photo.height}
                    alt={p.photo.alt}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      maxWidth: '420px',
                      height: 'auto',
                      borderRadius: 'var(--radius-md, 6px)',
                      display: 'block',
                    }}
                  />
                </div>
              ) : null}

              <div>
                <SectionHead
                  eyebrow={p.role}
                  title={p.credentials ? `${p.displayName}, ${p.credentials}` : p.displayName}
                  as="h2"
                />

                <div style={{ marginTop: 'var(--sp-5)', display: 'grid', gap: 'var(--sp-4)' }}>
                  {p.bio.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </div>

                {p.education.length > 0 ? (
                  <>
                    <h3 style={{ marginTop: 'var(--sp-7)', fontSize: 'var(--fs-h4)' }}>Education</h3>
                    <ul
                      className="list-clean"
                      style={{
                        display: 'grid',
                        gap: 'var(--sp-3)',
                        marginTop: 'var(--sp-3)',
                        fontSize: 'var(--fs-small)',
                      }}
                    >
                      {p.education.map((e) => (
                        <li key={e.institution}>
                          <strong style={{ color: 'var(--navy)', display: 'block' }}>
                            {e.institution}
                          </strong>
                          {[e.credential, e.detail]
                            .filter(Boolean)
                            .map((part) => `${part}.`)
                            .join(' ')}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}

                {p.honors.length > 0 ? (
                  <>
                    <h3 style={{ marginTop: 'var(--sp-6)', fontSize: 'var(--fs-h4)' }}>
                      Honors and recognition
                    </h3>
                    <ul
                      style={{
                        display: 'grid',
                        gap: 'var(--sp-2)',
                        marginTop: 'var(--sp-3)',
                        paddingLeft: '1.35rem',
                        fontSize: 'var(--fs-small)',
                      }}
                    >
                      {p.honors.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section section--soft">
        <div className="container container--narrow">
          <div className="article-body">
            <h2>The rest of the team</h2>
            <p>
              Hygienists, assistants, and front-office staff are being hired now. They will be
              introduced here by name before we open, with the same detail. We are not going to fill
              this space with stock photographs of models in lab coats, or with biographies for
              people who have not been hired.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Appointments"
        title={
          providers.length === 1 && providers[0]
            ? `Book With ${providers[0].displayName}`
            : 'Book With Our Team'
        }
        lede="We are scheduling now for appointments after we open. Call the office, or send a request and our team will call you back to confirm a time."
      />
    </>
  )
}
