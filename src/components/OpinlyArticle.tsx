import type { FullPost } from '@opinly/backend'
import { renderToHtml, uriLooksSafe } from '@opinly/shared'
import type { MarkRenderer, OpinlyConfig } from '@opinly/shared'
import { JsonLd, PageHero, Button } from '@/components/Ui'
import { CtaBand, MedicalDisclaimer } from '@/components/Blocks'
import { blogPostingSchema, faqSchema, webPageSchema } from '@/lib/schema'
import { cta, practiceName, siteUrl } from '@/config/practice'
import { OPINLY_IMAGES_PATH, opinlyImagePath } from '@/lib/opinly'
import { formatDate } from '@/content/blog'

/**
 * Renders an article authored in Opinly using this site's own chrome, so an
 * imported article is indistinguishable from a locally written one: same hero,
 * same aside, same medical disclaimer, same structured data helpers.
 *
 * ON dangerouslySetInnerHTML
 * --------------------------
 * Opinly delivers article bodies as a structured content tree, and
 * `renderToHtml` from @opinly/shared turns that tree into HTML. It is not a
 * pass-through of arbitrary markup: it walks typed nodes, escapes text, and
 * drops link hrefs that fail `uriLooksSafe`. The same renderer is already
 * serving production traffic on the sibling site. The content itself is
 * first-party, written by the practice in their own CMS, not user submissions.
 *
 * The alternative is building a React element factory for every node type,
 * which would add a translation layer that has to be kept in step with
 * Opinly's schema for no security gain.
 */

const SITE_HOST = new URL(siteUrl).hostname.replace(/^www\./, '')

const RENDER_CONFIG: OpinlyConfig = {
  // Relative, so images resolve through this origin's rewrite to the CDN.
  imagesPrefix: OPINLY_IMAGES_PATH,
  siteUrl,
  blogPrefix: '/blog',
  siteName: practiceName,
}

/**
 * Link renderer. Opinly's default marks every link rel="nofollow", which would
 * tell search engines to ignore links back into our own pages. Internal links
 * stay plain; external links get noopener and open in a new tab.
 */
const renderLink: MarkRenderer<string> = ({ mark, factory, child, key }) => {
  const href = String(mark.attrs?.href ?? '')
  if (!href || !uriLooksSafe(href)) return child

  let external = false
  try {
    external = /^https?:/i.test(href) && new URL(href).hostname.replace(/^www\./, '') !== SITE_HOST
  } catch {
    return child
  }

  const props = external ? { href, rel: 'noopener', target: '_blank' } : { href }
  return factory.element('a', props, [child], key)
}

export function OpinlyArticle({ post }: { post: FullPost }) {
  const path = `/blog/${post.slug}`
  const heroImage = opinlyImagePath(post.titleFile?.fileKey)
  const faqs = (post.faqs ?? []).filter((f) => f.question && f.answer)

  const published = post.firstPublishedAt.slice(0, 10)
  const modified = post.modifiedAt.slice(0, 10)

  const html = renderToHtml(post.content, {
    config: RENDER_CONFIG,
    marks: { link: renderLink },
    // Unknown node types are skipped rather than crashing the page, so a new
    // block type in Opinly degrades to missing content, not a 500.
    onUnknown: () => {},
  })

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path },
  ]

  const description = post.metaDescription || post.description

  return (
    <>
      <JsonLd
        nodes={[
          webPageSchema({ name: post.title, description, path }),
          blogPostingSchema({
            headline: post.title,
            description,
            path,
            datePublished: published,
            dateModified: modified,
            // Opinly carries an author; fall back to the practice rather than
            // inventing a byline.
            authorName: post.author?.name ?? practiceName,
          }),
          ...(faqs.length ? [faqSchema(faqs)] : []),
        ]}
      />

      <PageHero eyebrow={post.category?.name ?? 'Article'} title={post.title} crumbs={crumbs}>
        <p style={{ marginTop: 'var(--sp-4)', fontSize: 'var(--fs-caption)', color: 'var(--mist)' }}>
          <time dateTime={published}>Published {formatDate(published)}</time>
          {modified !== published ? <> · Updated {formatDate(modified)}</> : null}
          {post.author?.name ? <> · By {post.author.name}</> : null}
        </p>
      </PageHero>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              {heroImage ? (
                <figure style={{ margin: '0 0 var(--sp-6)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- proxied through this origin's rewrite, not a known-size local asset */}
                  <img
                    src={heroImage}
                    alt={post.titleFile?.altText || post.title}
                    loading="eager"
                    decoding="async"
                    style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)', display: 'block' }}
                  />
                  {post.titleFile?.caption ? (
                    <figcaption
                      style={{ marginTop: 'var(--sp-2)', fontSize: 'var(--fs-caption)', color: 'var(--mist)' }}
                    >
                      {post.titleFile.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}

              <article
                className="article-body opinly-article"
                dangerouslySetInnerHTML={{ __html: html }}
              />

              {faqs.length ? (
                <section style={{ marginTop: 'var(--sp-8)' }}>
                  <h2>Frequently asked questions</h2>
                  <div style={{ display: 'grid', gap: 'var(--sp-3)', marginTop: 'var(--sp-4)' }}>
                    {faqs.map((f) => (
                      <details key={f.question} className="faq-item">
                        <summary>{f.question}</summary>
                        <p>{f.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}

              <div className="med-disclaimer">
                <strong>Clinical review status</strong>
                This article is general education rather than advice for your own situation, and it
                has not been reviewed by a named provider. Treatment decisions depend on an
                examination.
              </div>

              <MedicalDisclaimer />
            </div>

            <aside className="split__aside">
              <div className="card card--soft">
                <h2 style={{ fontSize: 'var(--fs-h3)', fontFamily: 'var(--font-sans)' }}>
                  Ready when you are
                </h2>
                <p style={{ fontSize: 'var(--fs-small)', marginTop: 'var(--sp-2)' }}>
                  {practiceName} is scheduling appointments now. Call the office or send a request
                  and our team will confirm a time with you.
                </p>
                <div style={{ marginTop: 'var(--sp-4)' }}>
                  <Button href={cta.primaryHref} full>
                    {cta.primaryLabel}
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
