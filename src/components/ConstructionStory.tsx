import { storyChapters, type StoryChapter, type StoryPhoto } from '@/content/construction'

/**
 * Visual construction story.
 *
 * Server-rendered, no client JavaScript. The whole thing is semantic markup
 * plus CSS: an ordered list of chapters, each a <figure> group, connected by a
 * rail drawn with CSS rather than with images.
 *
 * Photography is genuine site photography. Every image carries descriptive alt
 * text and explicit width/height so the layout reserves its space and the
 * page does not shift as photos load.
 */

function Photo({ photo, priority = false }: { photo: StoryPhoto; priority?: boolean }) {
  const base = `/images/construction/${photo.slug}`
  return (
    <figure className="story-photo">
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-optimized static JPEGs */}
      <img
        src={photo.wSmall ? `${base}-800.jpg` : `${base}.jpg`}
        // Widths come from the data rather than being hardcoded, so a
        // photograph whose source was only 768px wide does not claim to be
        // 1600. Photos without a narrower variant ship one file and no srcset.
        srcSet={
          photo.wSmall
            ? `${base}-800.jpg ${photo.wSmall}w, ${base}.jpg ${photo.w}w`
            : undefined
        }
        sizes={photo.wSmall ? '(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 540px' : undefined}
        width={photo.w}
        height={photo.h}
        alt={photo.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="story-photo__img"
      />
      {photo.caption ? <figcaption>{photo.caption}</figcaption> : null}
    </figure>
  )
}

function Chapter({
  chapter,
  index,
  total,
  priority,
}: {
  chapter: StoryChapter
  index: number
  total: number
  priority: boolean
}) {
  const headingId = `chapter-${chapter.id}`

  return (
    <li className="story-chapter" id={chapter.id}>
      <div className="story-chapter__rail" aria-hidden="true">
        <span className="story-chapter__dot">{index + 1}</span>
      </div>

      <div className="story-chapter__body">
        <div className="story-chapter__head">
          <span className="eyebrow">
            {/* Prefer the official stage name from the progress graphic so the
                site and the social posts use one vocabulary. Falls back to a
                plain counter for sections outside the five-stage sequence. */}
            {chapter.stage ?? `Step ${index + 1} of ${total}`}
            {chapter.date ? ` · ${chapter.date}` : ''}
          </span>
          <h3 id={headingId}>{chapter.title}</h3>
          <p className="lede story-chapter__intro">{chapter.intro}</p>
          {chapter.body?.map((p) => (
            <p key={p.slice(0, 40)} className="story-chapter__para">
              {p}
            </p>
          ))}
        </div>

        <div
          className={`story-gallery story-gallery--${
            chapter.photos.length === 1 ? 'single' : 'grid'
          }`}
        >
          {chapter.photos.map((photo, i) => (
            <Photo key={photo.slug} photo={photo} priority={priority && i === 0} />
          ))}
        </div>

        {chapter.whyItMatters ? (
          <p className="story-chapter__why">{chapter.whyItMatters}</p>
        ) : null}
      </div>
    </li>
  )
}

export function ConstructionStory() {
  return (
    <div className="story">
      <ol className="story__list">
        {storyChapters.map((chapter, i) => (
          <Chapter
            key={chapter.id}
            chapter={chapter}
            index={i}
            total={storyChapters.length}
            priority={i === 0}
          />
        ))}
      </ol>
    </div>
  )
}

/** Compact jump-links to each chapter. Rendered above the story. */
export function StoryNav() {
  return (
    <nav aria-label="Jump to a stage of the build" className="story-nav">
      <ol>
        {storyChapters.map((c, i) => (
          <li key={c.id}>
            <a href={`#${c.id}`}>
              <span aria-hidden="true">{i + 1}</span>
              {c.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
