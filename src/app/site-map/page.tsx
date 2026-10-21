import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, PageHero } from '@/components/Ui'
import { CtaBand } from '@/components/Blocks'
import { webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { footerNav, legalNav, primaryNav } from '@/content/navigation'
import { services } from '@/content/services'
import { sortedPosts } from '@/content/blog'
import { features } from '@/config/practice'

const TITLE = 'Site Map'
const DESCRIPTION = 'Every page on the Smile Studio of Rehoboth website, in one list.'
const PATH = '/site-map'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

/**
 * HTML site map.
 * Built from the same navigation data as the header and footer, so it cannot
 * drift out of date, and so a page that is hidden by a feature flag is hidden
 * here too rather than becoming an orphan link.
 */
export default function Page() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Site Map', path: PATH },
  ]

  const groups = primaryNav
    .filter((i) => i.children?.length)
    .map((i) => ({ heading: i.label, links: i.children ?? [] }))

  return (
    <>
      <JsonLd nodes={[webPageSchema({ name: TITLE, description: DESCRIPTION, path: PATH })]} />

      <PageHero
        eyebrow="Navigation"
        title="Site Map"
        lede="Every page on this website. Pages that depend on the practice being open are not listed, because they do not exist yet."
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container">
          <div className="sitemap-cols">
            <nav aria-labelledby="sm-main">
              <h2 id="sm-main">Main pages</h2>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/opening-list">Join the Opening List</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
              </ul>
            </nav>

            {groups.map((g) => (
              <nav key={g.heading} aria-labelledby={`sm-${g.heading.replace(/\s+/g, '-')}`}>
                <h2 id={`sm-${g.heading.replace(/\s+/g, '-')}`}>{g.heading}</h2>
                <ul>
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <nav aria-labelledby="sm-services">
              <h2 id="sm-services">Service pages</h2>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`}>{s.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            {features.enableBlog ? (
              <nav aria-labelledby="sm-blog">
                <h2 id="sm-blog">Articles</h2>
                <ul>
                  {sortedPosts.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            <nav aria-labelledby="sm-legal">
              <h2 id="sm-legal">Legal and utility</h2>
              <ul>
                {legalNav
                  .filter((l) => l.href !== PATH)
                  .map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
              </ul>
            </nav>

            <nav aria-labelledby="sm-resources">
              <h2 id="sm-resources">Patient resources</h2>
              <ul>
                {footerNav
                  .find((c) => c.heading === 'Patient Resources')
                  ?.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>

          {!features.enableTeamPages ? (
            <p style={{ marginTop: 'var(--sp-8)', fontSize: 'var(--fs-caption)', color: 'var(--mist)' }}>
              Meet the Team is not yet published. Provider introductions will appear once the
              provider roster is confirmed.
            </p>
          ) : null}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
