import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd, PageHero, Button } from '@/components/Ui'
import { CtaBand, MedicalDisclaimer } from '@/components/Blocks'
import { blogPostingSchema, webPageSchema } from '@/lib/schema'
import { pageMetadata } from '@/lib/seo'
import { formatDate, getPost, posts } from '@/content/blog'
import { cta, practiceName } from '@/config/practice'
import { getOpinlyPost, opinlyImagePath } from '@/lib/opinly'
import { OpinlyArticle } from '@/components/OpinlyArticle'

export function generateStaticParams() {
  // Only the locally authored posts are prerendered. Opinly slugs are resolved
  // on demand, so publishing an article there does not require a redeploy.
  return posts.map((p) => ({ slug: p.slug }))
}

/**
 * Was `false`, which 404'd every slug outside the three local posts. Opinly
 * articles need it true. Unknown slugs still 404, via notFound() below, after
 * both sources have been checked.
 */
export const dynamicParams = true

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (post) {
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

  const remote = await getOpinlyPost(slug)
  if (!remote) return {}

  return pageMetadata({
    title: remote.metaTitle || remote.title,
    description: remote.metaDescription || remote.description,
    path: `/blog/${remote.slug}`,
    absolute: true,
    type: 'article',
    publishedTime: remote.firstPublishedAt,
    modifiedTime: remote.modifiedAt,
    ogImage: opinlyImagePath(remote.titleFile?.fileKey) ?? undefined,
  })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)

  // Locally authored posts keep their existing rendering untouched. Only a
  // slug that is not one of those is looked up in Opinly.
  if (!post) {
    const remote = await getOpinlyPost(slug)
    if (!remote) notFound()
    return <OpinlyArticle post={remote} />
  }

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
                  reviewed by a named provider. Treatment-specific articles will not be published
                  until Dr. Cottone has reviewed them, and each will carry his name, credentials,
                  and review date.
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
