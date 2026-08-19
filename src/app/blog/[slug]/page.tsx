import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd, PageHero, Button } from '@/components/Ui'
import { CtaBand, MedicalDisclaimer } from '@/components/Blocks'
import { blogPostingSchema, webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { formatDate, getPost, posts } from '@/content/blog'
import { cta, practiceName } from '@/config/practice'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    absolute: true,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
  })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const related = post.related
    .map((r) => getPost(r))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  const path = `/blog/${post.slug}`
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path },
  ]

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({ name: post.title, description: post.description, path }),
          blogPostingSchema({
            headline: post.title,
            description: post.description,
            path,
            datePublished: post.date,
            dateModified: post.updated ?? post.date,
            // Attributed to the practice, not to an invented author.
            authorName: practiceName,
          }),
        ]}
      />

      <PageHero eyebrow={post.category} title={post.title} crumbs={crumbs}>
        <p style={{ marginTop: 'var(--sp-4)', fontSize: 'var(--fs-caption)', color: 'var(--mist)' }}>
          <time dateTime={post.date}>Published {formatDate(post.date)}</time>
          {post.updated ? <> · Updated {formatDate(post.updated)}</> : null}
          {' · '}
          {post.readingTime}
        </p>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <article className="article-body">
                {post.body.map((b, i) => {
                  if (b.type === 'h2') return <h2 key={i}>{b.text}</h2>
                  if (b.type === 'ul')
                    return (
                      <ul key={i} style={{ display: 'grid', gap: 'var(--sp-2)', paddingLeft: '1.35rem' }}>
                        {b.items?.map((li) => <li key={li}>{li}</li>)}
                      </ul>
                    )
                  return <p key={i}>{b.text}</p>
                })}
              </article>

              {/* Provider review attribution. Rendered only when a real
                  provider has reviewed the article. */}
              {post.reviewedBy ? (
                <div className="med-disclaimer">
                  <strong>Clinically reviewed</strong>
                  Reviewed by{' '}
                  <Link href={post.reviewedBy.profilePath}>
                    {post.reviewedBy.name}, {post.reviewedBy.credentials}
                  </Link>{' '}
                  on {formatDate(post.reviewedBy.reviewedOn)}.
                </div>
              ) : (
                <div className="med-disclaimer">
                  <strong>Clinical review status</strong>
                  This article is practice news rather than clinical guidance, and it has not been
                  reviewed by a named provider because the provider team has not been confirmed.
                  Treatment-specific articles will not be published until a named provider has
                  reviewed them, and each will carry that provider&rsquo;s name, credentials, and
                  review date.
                </div>
              )}

              <MedicalDisclaimer />
            </div>

            <aside className="split__aside">
              <div className="card card--soft">
                <h2 style={{ fontSize: 'var(--fs-h3)', fontFamily: 'var(--font-sans)' }}>
                  Follow the opening
                </h2>
                <p style={{ fontSize: 'var(--fs-small)', marginTop: 'var(--sp-2)' }}>
                  The confirmed opening date, provider introductions, and early scheduling
                  information go to the opening list first.
                </p>
                <div style={{ marginTop: 'var(--sp-4)' }}>
                  <Button href={cta.primaryHref} full>
                    {cta.primaryLabel}
                  </Button>
                </div>
              </div>

              {related.length ? (
                <div className="card">
                  <h2 style={{ fontSize: 'var(--fs-h3)', fontFamily: 'var(--font-sans)' }}>
                    Related reading
                  </h2>
                  <ul
                    className="list-clean"
                    style={{ display: 'grid', gap: '0.75rem', marginTop: 'var(--sp-4)', fontSize: 'var(--fs-small)' }}
                  >
                    {related.map((r) => (
                      <li key={r.slug}>
                        <Link href={`/blog/${r.slug}`}>{r.title}</Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/blog">All articles</Link>
                    </li>
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
