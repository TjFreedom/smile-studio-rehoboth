import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, PageHero } from '@/components/Ui'
import { CtaBand } from '@/components/Blocks'
import { webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { formatDate, sortedPosts } from '@/content/blog'
import { listOpinlyPosts } from '@/lib/opinly'

const TITLE = 'Blog and Educational Resources'
const DESCRIPTION =
  'News, construction updates, and educational articles from Smile Studio of Rehoboth, a new dental practice opening in Rehoboth Beach, Delaware.'
const PATH = '/blog'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: PATH })

/**
 * Revalidate hourly. Articles published in Opinly appear without a redeploy,
 * and a burst of traffic does not become a burst of API calls.
 */
export const revalidate = 3600

/** The shape the card markup below needs, from either source. */
interface Card {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  readingTime: string | null
}

export default async function Page() {
  // Fails soft: an empty array here just means the locally authored posts are
  // the whole list, which is what this page showed before Opinly existed.
  const opinly = await listOpinlyPosts()

  const local: Card[] = sortedPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    category: p.category,
    readingTime: p.readingTime,
  }))

  const remote: Card[] = opinly.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
    category: p.category,
    // Opinly's list endpoint does not carry reading time; the full post does,
    // and fetching every post here to get it is not worth the request.
    readingTime: null,
  }))

  // A locally authored slug wins over a remote one with the same slug, so the
  // three existing posts can never be displaced by an import.
  const localSlugs = new Set(local.map((p) => p.slug))
  const all = [...local, ...remote.filter((p) => !localSlugs.has(p.slug))].sort((a, b) =>
    b.date.localeCompare(a.date),
  )
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: PATH },
  ]

  return (
    <>
      <JsonLd nodes={[webPageSchema({ name: TITLE, description: DESCRIPTION, path: PATH })]} />

      <PageHero
        eyebrow="Blog"
        title="News and Educational Resources"
        lede="Updates about the practice and the new office. Treatment-specific articles will follow once services and providers are confirmed, and each will carry the name of the provider who reviewed it."
        crumbs={crumbs}
      />

      <section className="section">
        <div className="container">
          <ul className="post-list grid grid-2" style={{ display: 'grid' }}>
            {all.map((p) => (
              <li key={p.slug}>
                <article className="card card--link post-card" style={{ height: '100%' }}>
                  <div className="post-card__meta">
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                    <span>{p.category}</span>
                    {p.readingTime ? <span>{p.readingTime}</span> : null}
                  </div>
                  <h2 style={{ fontSize: 'var(--fs-h3)', fontFamily: 'var(--font-sans)' }}>
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </h2>
                  <p style={{ marginTop: 'var(--sp-3)', fontSize: 'var(--fs-small)' }}>{p.excerpt}</p>
                  <Link href={`/blog/${p.slug}`} className="link-arrow" style={{ marginTop: 'var(--sp-4)' }}>
                    Read the article
                    <span className="sr-only">: {p.title}</span>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
