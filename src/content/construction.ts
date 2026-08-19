/**
 * CONSTRUCTION UPDATE SYSTEM
 * ==========================
 * An editable timeline plus a dated update feed.
 *
 * RULES (enforced by review, not by code):
 *   · Only mark a milestone 'complete' when it is actually complete.
 *   · Never invent a completion percentage, a milestone date, or a photograph.
 *   · Every update needs a real date. If there is nothing to report, publish
 *     nothing. An empty feed is more honest than a padded one.
 *
 * The status values map to visible labels and to the visual state of the
 * timeline. 'complete' renders a filled marker, 'current' an outlined marker
 * with a pulse, 'upcoming' a hollow marker.
 */

export type MilestoneStatus = 'complete' | 'current' | 'upcoming'

export interface Milestone {
  title: string
  status: MilestoneStatus
  description: string
}

/**
 * [TO CONFIRM] Milestone statuses with the construction manager.
 * Only "Office Construction Underway" is set to 'current', because that is the
 * one fact the project brief confirms. Nothing is marked complete.
 */
export const milestones: Milestone[] = [
  {
    title: 'Office Construction Underway',
    status: 'current',
    description:
      'Build-out is in progress at 19411 Plantations Road in Plantations Professional Park.',
  },
  {
    title: 'Team and Technology Preparation',
    status: 'upcoming',
    description:
      'Equipment selection, operatory planning, and hiring for the clinical and front office team.',
  },
  {
    title: 'Provider Announcements',
    status: 'upcoming',
    description:
      'Introductions to the dentists and clinical team who will care for patients in Rehoboth Beach.',
  },
  {
    title: 'Early Scheduling Information',
    status: 'upcoming',
    description:
      'Opening list subscribers receive scheduling details before appointments open to the public.',
  },
  {
    title: 'Confirmed Opening Date',
    status: 'upcoming',
    description:
      'The exact opening date, published here and sent to the opening list first.',
  },
]

export interface ConstructionUpdate {
  slug: string
  title: string
  /** ISO date. Real dates only. */
  date: string
  summary: string
  body: string[]
  /**
   * [PLACEHOLDER] Replace with approved construction photography.
   * Leave null rather than substituting stock imagery: an unrelated photo
   * presented as this office would be a fabrication.
   */
  image: null | { src: string; alt: string; caption?: string }
}

/**
 * Update feed.
 *
 * [PLACEHOLDER CONTENT NOTE]
 * The single entry below states only what the project brief confirms: that the
 * practice is under construction at a known address with an anticipated
 * opening window. It contains no invented milestone, percentage, date, or
 * photograph. Replace and extend it as real progress is documented.
 */
export const constructionUpdates: ConstructionUpdate[] = [
  {
    slug: 'a-new-dental-office-is-coming-to-rehoboth-beach',
    title: 'A New Dental Office Is Coming to Rehoboth Beach',
    date: '2026-08-19',
    summary:
      'Construction is underway on a new dental practice at 19411 Plantations Road, with an anticipated opening in late November or early December 2026.',
    body: [
      'Work has begun on Smile Studio of Rehoboth, a new dental practice taking shape at 19411 Plantations Road in Plantations Professional Park.',
      'The location was chosen for access. Plantations Road sits just off the Coastal Highway and Route 1 corridor, and it is reachable from Route 24 and Route 9 without driving into the summer traffic on Rehoboth Avenue. That matters for year-round residents in Lewes, Long Neck, Harbeson, Milton, and Millsboro as much as it does for anyone staying at the beach.',
      'We anticipate opening in late November or early December 2026. Construction schedules can change, and we would rather tell you that plainly than publish a date we cannot hold. The opening list is where the confirmed date will go first.',
      'Between now and then we will use this page to share what is actually happening: build-out progress, the technology going into the operatories, and introductions to the providers and team who will be caring for patients here.',
    ],
    image: null,
  },
]

export function getUpdate(slug: string): ConstructionUpdate | undefined {
  return constructionUpdates.find((u) => u.slug === slug)
}

export const sortedUpdates = [...constructionUpdates].sort((a, b) =>
  b.date.localeCompare(a.date),
)
