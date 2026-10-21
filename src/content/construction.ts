/**
 * CONSTRUCTION STORY AND UPDATE SYSTEM
 * ====================================
 * A phase-ordered photo story of the build, plus the milestone timeline.
 *
 * RULES (enforced by review, not by code):
 *   · Only mark a milestone 'complete' when it is actually complete.
 *   · Never invent a completion percentage, a milestone date, or a photograph.
 *   · Photographs are ordered by construction PHASE, not by a date, because
 *     the source images arrived without EXIF timestamps. Do not add a date to
 *     a phase until someone confirms when that work actually happened.
 *
 * All photography below is genuine site photography of 19411 Plantations Road.
 * No stock imagery is used anywhere in this file, and none may be added.
 */

export type MilestoneStatus = 'complete' | 'current' | 'upcoming'

export interface Milestone {
  title: string
  status: MilestoneStatus
  description: string
}

/**
 * [TO CONFIRM] Milestone statuses with the construction manager.
 *
 * Statuses through Interior Build-Out are set from the site photography in this
 * file and nothing else. The October photographs show finished drywall, data
 * cable pulled to the communications closet, mechanical and electrical rough-in
 * overhead, and floor tile being laid, so the concrete is self-evidently down
 * and build-out is underway. Equipment and the opening date remain unverified
 * because no photograph or statement supports them yet.
 *
 * Provider Announcements and Early Scheduling are complete as a matter of
 * record rather than inference: Dr. Cottone is published on /team, and the
 * practice is taking appointments on a published phone number.
 */
export const milestones: Milestone[] = [
  {
    title: 'Shell, Framing, and Roof',
    status: 'complete',
    description:
      'The building envelope is closed in. Windows, exterior doors, and the roof are on.',
  },
  {
    title: 'Underground Plumbing',
    status: 'complete',
    description:
      'Drain lines trenched, set to grade, inspected, and backfilled. Every fixture in the finished practice is now located.',
  },
  {
    title: 'Slab Preparation',
    status: 'complete',
    description:
      'Floor compacted and graded, vapor barrier laid, and screed lines set for the concrete pour.',
  },
  {
    title: 'Concrete Floor',
    status: 'complete',
    description:
      'Poured and finished. The slab that every operatory, chair, and cabinet sits on is now the floor the tile is going down onto.',
  },
  {
    title: 'Interior Build-Out',
    status: 'current',
    description:
      'Underway. Interior walls are up and finished, mechanical, electrical and data are roughed in overhead, and floor tile is being laid. Cabinetry and the operatories come next.',
  },
  {
    title: 'Equipment and Technology',
    status: 'upcoming',
    description: 'Dental equipment installed, commissioned, and tested.',
  },
  {
    title: 'Provider Announcements',
    status: 'complete',
    description:
      'Dr. Jonathon Cottone is introduced on our Meet the Team page. The rest of the clinical team will be announced there as hiring completes.',
  },
  {
    title: 'Early Scheduling Information',
    status: 'complete',
    description:
      'Scheduling is open. You can call the office or request an appointment online, and our team will confirm a time with you.',
  },
  {
    title: 'Confirmed Opening Date',
    status: 'upcoming',
    description: 'The exact opening date, published here and sent to the opening list first.',
  },
]

/* ------------------------------------------------------------------ *
 * PHOTO STORY
 * ------------------------------------------------------------------ */

export interface StoryPhoto {
  /** Base filename in /images/construction, without extension. */
  slug: string
  /** Describes what is actually visible. Never aspirational. */
  alt: string
  caption?: string
  /** Rendered aspect, used to reserve layout space and prevent CLS. */
  w: number
  h: number
  /**
   * Width of the `-800.jpg` variant, when one exists. Omitted for photographs
   * whose source was already small enough that a second, narrower file would
   * be the same size or larger: those ship a single file and no srcset, rather
   * than advertising a resolution the image does not have.
   */
  wSmall?: number
}

export interface StoryChapter {
  id: string
  /**
   * Official stage label, matching the "New Office Construction Progress"
   * graphic used on social and in print. Keeping one vocabulary across the
   * website, the graphic, and any printed update means a patient who sees the
   * post and then visits the site recognizes the same five steps.
   * Null for sections that sit outside the five-stage sequence.
   */
  stage: string | null
  /** Short label for the timeline rail. */
  label: string
  title: string
  /** [TO CONFIRM] Real date of this phase. Null until someone confirms it. */
  date: string | null
  /** Lead paragraph, in the practice voice. */
  intro: string
  body?: string[]
  photos: StoryPhoto[]
  /** One-line "why this matters to you as a patient". */
  whyItMatters?: string
}

const L = { w: 1600, h: 1200, wSmall: 800 } // landscape source
const P = { w: 1600, h: 2134, wSmall: 800 } // portrait source
const P2 = { w: 1600, h: 2133, wSmall: 800 }

/** Phone-sized 3:4 sources. Single file, no narrower variant. */
const PS = { w: 768, h: 1024 }
/** Larger 3:4 sources, big enough to warrant an 800w variant. */
const PL = { w: 1500, h: 2000, wSmall: 800 }

export const storyChapters: StoryChapter[] = [
  {
    id: 'setting-out',
    stage: 'Before Stage 1 · Setting out',
    label: 'Setting out',
    title: 'It Starts With String and a Tape Measure',
    date: null,
    intro:
      'Before anything is dug, the whole practice gets drawn on the ground. Those string lines are the floor plan at full size.',
    body: [
      'Every white pipe you can see marks a fixture that will exist in the finished office. A sink in a treatment room. A floor drain. The plumbing for a sterilization area. Each one has to be within an inch or two of where the cabinetry will eventually sit, because once the concrete goes down, moving it means cutting the floor open.',
      'This is the least photogenic day of the entire build, and it is the one that decides whether everything downstream lines up.',
    ],
    whyItMatters:
      'The room you will sit in one day was measured out, in dirt, before a single pipe went in the ground.',
    photos: [
      {
        slug: '01-layout-string-lines',
        alt: 'Dirt floor marked with taut string lines, a capped white PVC stub-up braced upright on a plywood scrap, with a hammer and shovel resting nearby.',
        caption: 'String lines and a braced stub-up holding one fixture location.',
        ...L,
      },
    ],
  },
  {
    id: 'trenching',
    stage: 'Stage 1 of 5 · Trenching',
    label: 'Trenching',
    title: 'Cutting the Trenches',
    date: null,
    intro:
      'Then the floor gets opened up. Every trench carries a drain line, and every drain line has to fall at a steady, deliberate slope so that gravity does the work for the next several decades.',
    body: [
      'Underground plumbing is one of the few parts of a building you genuinely only get one shot at. It goes in before the slab, it is buried under reinforced concrete, and it is expected to run without attention for the life of the practice.',
      'So it is set slowly, checked against the string lines, and checked again. The trenches look chaotic in a photograph. On the ground they are laid out to within a fraction of an inch.',
    ],
    whyItMatters:
      'Nobody will ever see this work again. It is the part of the office that has to be right precisely because it will be invisible.',
    photos: [
      {
        slug: '02-trenches-wide',
        alt: 'Wide view of open trenches cut across a dirt floor with white PVC drain lines laid in them, string lines stretched overhead, and framed exterior walls with windows behind.',
        caption: 'The trench layout, with string lines still stretched over the top.',
        ...L,
      },
      {
        slug: '03-trench-depth',
        alt: 'A deep trench running toward the camera with a white PVC drain line at the bottom, red steel support column to the left, and a framed wall with windows and an exterior door behind.',
        caption: 'Depth matters. The fall on these lines is set by hand and checked.',
        ...L,
      },
      {
        slug: '04-trench-along-wall',
        alt: 'Trench running parallel to a framed exterior wall with a white PVC drain line in the base, capped stub-ups standing along the wall, and flexible electrical conduit above.',
        ...L,
      },
      {
        slug: '05-trench-to-door',
        alt: 'A long trench with a drain line running toward a glass exterior door, with cartons of pipe fittings stacked in the corner and daylight coming through the doorway.',
        caption: 'Boxes of fittings staged where the line exits the building.',
        ...L,
      },
    ],
  },
  {
    id: 'plumbing-rough-in',
    stage: 'Stage 2 of 5 · Plumbing rough-in',
    label: 'Plumbing rough-in',
    title: 'Every Pipe Has a Name',
    date: null,
    intro:
      'Look closely at the stub-ups and they are all written on. FD is a floor drain. SINK is a sink. C/O is a cleanout. W/C is a water closet.',
    body: [
      'This is how a building keeps track of itself. Months from now, when the concrete is down and the walls are up, somebody will need to know exactly which pipe is which without excavating to find out.',
      'It is also, in a small way, the first time the finished practice becomes legible. You can stand on the dirt, read the labels, and see where the treatment rooms are going to be.',
    ],
    photos: [
      {
        slug: '06-labeled-stubups',
        alt: 'Close-up of three capped PVC stub-ups rising from a dirt floor, hand-labeled in marker, next to a trench with a drain line and a wall filled with spray foam insulation.',
        caption: 'Hand-labeled stub-ups: floor drain, sink, and cleanout.',
        ...L,
      },
    ],
  },
  {
    id: 'backfill',
    stage: 'Stage 3 of 5 · Backfill',
    label: 'Backfill',
    title: 'Buried, Compacted, and Graded',
    date: null,
    intro:
      'Once the underground plumbing passes inspection, the trenches are filled back in and the whole floor is compacted and brought to a level grade.',
    body: [
      'The tracked patterns in the dirt are from the compactor. Loose fill under a concrete slab is how you get a floor that cracks and settles, so the ground gets worked until it stops moving.',
      'Overhead, a second layer of the building is already in place: waste lines, water lines, and the electrical rough-in running above what will become the ceiling.',
    ],
    photos: [
      {
        slug: '07-backfill-long-view',
        alt: 'Long interior view over a backfilled dirt floor dotted with capped stub-ups, with white PVC waste lines and blue water lines running along the ceiling and red steel columns down the middle.',
        caption: 'Underground work buried, overhead rough-in already running.',
        ...L,
      },
      {
        slug: '08-backfill-overhead-rough-in',
        alt: 'Interior with a graded dirt floor and dozens of plumbing stub-ups, looking up at a ceiling carrying white PVC pipe, blue water lines, and bundled electrical cable.',
        ...P,
      },
      {
        slug: '09-graded-compacted',
        alt: 'Compacted dirt floor showing roller and boot tracks, with capped white and grey stub-ups spaced across it and framed walls with windows and an exterior door behind.',
        caption: 'Compactor tracks across the graded floor.',
        ...P,
      },
      {
        slug: '10-graded-room',
        alt: 'A smaller framed room with a graded dirt floor, plumbing and electrical stub-ups along the walls, a red steel column in the centre, and three windows looking onto greenery.',
        caption: 'One of the rooms taking shape at the back of the suite.',
        ...L,
      },
    ],
  },
  {
    id: 'vapor-barrier',
    stage: 'Stages 4 and 5 of 5 · Vapor barrier, ready for concrete',
    label: 'Vapor barrier',
    title: 'Sealed, and Ready for Concrete',
    date: null,
    intro:
      'The black sheeting is a vapor barrier. It sits between the ground and the concrete and stops moisture wicking up through the slab for as long as the building stands.',
    body: [
      'It is the last thing that happens before the pour. The stub-ups are sleeved through it, the joints are lapped, and the timber you can see laid across the floor is a screed line: the reference the concrete crew will pull the wet slab flat against.',
      'This is the point where a building site starts to look like a floor plan. Stand in the middle of it and the rooms are already there, marked out in pipe.',
    ],
    whyItMatters:
      'The next photographs from this room will have a concrete floor in them.',
    photos: [
      {
        slug: '11-vapor-barrier-wide',
        alt: 'Black vapor barrier laid across the full floor with plumbing stub-ups sleeved through it, red steel columns, spray foam insulation on the right-hand wall, and overhead pipework.',
        caption: 'Vapor barrier down across the whole suite.',
        ...P,
      },
      {
        slug: '12-vapor-barrier-screed',
        alt: 'Vapor barrier covering the floor with labeled stub-ups standing through it, a timber screed board laid across the foreground, and windows looking out to parked vehicles.',
        caption: 'A screed board set as the reference for the concrete pour.',
        ...L,
      },
      {
        slug: '13-vapor-barrier-entry',
        alt: 'Interior corner with vapor barrier on the floor, framed walls, a capped stub-up marked SINK, and an open door frame looking out to the parking lot.',
        caption: 'Looking out through what will be a doorway.',
        ...L,
      },
    ],
  },
  {
    id: 'walls-and-rooms',
    // Past the five-stage slab sequence, so no step counter: using one here
    // would imply a sixth stage the progress graphic does not have.
    stage: 'After the concrete',
    label: 'Walls and rooms',
    title: 'The Floor Plan Stands Up',
    date: null,
    intro:
      'The pipes that were marked out in dirt now have rooms around them. This corridor runs the length of the practice, and every opening off it is a treatment room, an office, or a utility space.',
    body: [
      'The ceiling is deliberately still open. Everything the building needs runs through that space: ductwork for heating and cooling, electrical conduit, water lines, and the blue data cable that will carry images from the X-ray sensors to the screen in front of you. It stays open until every one of those has been inspected, because once the ceiling closes, getting back to any of it means taking it down again.',
      'The doorways look narrow from this angle. They are not, and the finished openings are wider than the framing suggests.',
    ],
    whyItMatters:
      'If you have ever been in a dental office where you could hear the room next door, the reason was decided at this stage, in how the walls were built.',
    photos: [
      {
        slug: '16-corridor-rough-in',
        alt: 'Long corridor with drywall hung and taped, framed door openings on both sides, and an open ceiling carrying insulated ductwork, electrical conduit, and bundled blue data cable.',
        caption: 'The main corridor, with the ceiling still open for inspection.',
        ...PS,
      },
      {
        slug: '18-corridor-finished',
        alt: 'The same style of corridor with drywall finished smooth and primed white, door openings cut and trimmed, and services still visible in the open ceiling above.',
        caption: 'Further along: drywall finished, services still accessible overhead.',
        ...PL,
      },
    ],
  },
  {
    id: 'behind-the-walls',
    stage: 'After the concrete',
    label: 'Data and services',
    title: 'The Part You Will Never See',
    date: null,
    intro:
      'This is the communications closet. Every blue cable hanging in it runs to one specific point in the practice, and together they are the nervous system of a modern dental office.',
    body: [
      'Digital X-rays, intraoral cameras, the screens used to show you what we are looking at, the practice management system, and the phones all depend on this one cupboard. Running the cable now, before the walls close, is the difference between a practice that can add a chair later and one that has to open the ceiling to do it.',
      'There is no glamour in a photograph of cables. There is a great deal of difference between a building that was wired generously at this stage and one that was wired to the minimum.',
    ],
    whyItMatters:
      'It is why your X-ray will appear on a screen beside you in a couple of seconds rather than being carried somewhere to be processed.',
    photos: [
      {
        slug: '17-data-closet-cabling',
        alt: 'Framed and drywalled communications closet with a dense bundle of blue network cables hanging from the ceiling to the floor, and a single outlet box low on the back wall.',
        caption: 'Network cable pulled to the communications closet, waiting to be terminated.',
        ...PS,
      },
    ],
  },
  {
    id: 'finishes',
    stage: 'After the concrete',
    label: 'Finishes',
    title: 'Tile, and the First Surface You Will Actually Touch',
    date: null,
    intro:
      'Everything until now has been structure and services. Tile is the first thing going in that you will see, stand on, and judge the place by.',
    body: [
      'The yellow and red clips are leveling spacers. They hold neighboring tiles flush with one another while the adhesive cures, so you do not end up with the slightly proud edge that catches a shoe or a chair castor. They are snapped off and thrown away once the floor has set, which is why no finished floor has ever had them in it.',
      'A dental office floor has to take rolling equipment, be cleaned hard and often, and still look like somewhere you would want to sit. That rules out a lot of flooring, and it is the reason this is tile rather than something softer underfoot.',
    ],
    whyItMatters:
      'Floors in a dental practice get disinfected daily. This one is built to survive that and still look new in five years.',
    photos: [
      {
        slug: '19-floor-tile',
        alt: 'Large-format grey floor tiles laid in a room, with yellow and red leveling clips standing at every joint while the adhesive cures, and a white pipe stub rising at the far wall.',
        caption: 'Leveling clips holding each tile flush until the adhesive sets.',
        ...PL,
      },
    ],
  },
  {
    id: 'outside',
    // Not part of the five-stage sequence, so it gets its own label rather
    // than a step counter that would read oddly beside the stage names.
    stage: 'Outside the building',
    label: 'Outside',
    title: 'Where to Find Us',
    date: null,
    intro:
      'Our sign is up. The building, the parking, and the approach from Plantations Road are already finished and in use by the neighboring suites, and we are in Suite 1.',
    // Suite 1 confirmed 2026-10-21 by the practice's FINAL postcard.
    // [TO CONFIRM] still: which name goes on the exterior directory. See the
    // note on the directory photograph below.
    body: [
      'If you have driven past recently you may already have seen it. The sign at the road carries the practice name, the website, and the phone number, which makes it the first thing most people will meet us through.',
      'The parking sits directly in front of the building, on one level, a short and flat walk from the door. We will publish the confirmed accessibility details, including accessible spaces and step-free entry, once we can describe them from a completed site rather than from a plan.',
    ],
    photos: [
      {
        slug: '20-coming-soon-sign',
        alt: 'A contractor installing the Smile Studio of Rehoboth coming-soon sign beside the road, reading COMING SOON above the lighthouse-and-tooth logo, with the website address and phone number below.',
        caption: 'The sign going in at the road.',
        ...PS,
      },
      {
        slug: '21-building-front',
        alt: 'Front of the grey shingled professional building with white trim, five ground-floor storefront entrances under a covered walkway, and signs for the neighboring suites above.',
        caption: 'The front of the building, from the parking lot.',
        ...PS,
      },
      {
        slug: '14-exterior-parking',
        alt: 'Parking lot in front of the Plantations Professional Park building at golden hour, with marked spaces, wheel stops, a lamp post, and the building directory sign at the left.',
        caption: 'The lot in front of the building, from the entrance drive.',
        ...L,
      },
      {
        slug: '15-suite-directory-sign',
        alt: 'Building directory sign for building 4 at Plantations Professional Park listing three suites, with the grey shingled building behind it.',
        /**
         * The suite number is now confirmed as Suite 1, but the name on this
         * directory is NOT. It currently reads "Freedom Dental" against Suite 1
         * while every patient-facing piece says Smile Studio of Rehoboth. The
         * caption therefore points at the suite, which is true and useful for
         * wayfinding, and makes no claim about the name on the board. Resolve
         * the signage before this becomes the thing a patient sees after
         * following a postcard. See docs/REQUIRED-BEFORE-OPENING.md.
         */
        caption: 'The directory at the entrance to building 4. We are Suite 1.',
        ...P2,
      },
    ],
  },
]

/* ------------------------------------------------------------------ *
 * DATED UPDATE FEED
 * ------------------------------------------------------------------ */

export interface ConstructionUpdate {
  slug: string
  title: string
  /** ISO date. Real dates only. */
  date: string
  summary: string
  body: string[]
  image: null | { src: string; alt: string; caption?: string }
}

export const constructionUpdates: ConstructionUpdate[] = [
  {
    slug: 'underground-plumbing-is-in-and-the-floor-is-ready-for-concrete',
    title: 'The Underground Plumbing Is In, and the Floor Is Ready for Concrete',
    date: '2026-08-19',
    summary:
      'Trenching, drain lines, backfill, and the vapor barrier are complete at 19411 Plantations Road. The next milestone is the concrete floor.',
    body: [
      'The part of the build that nobody will ever see again is finished.',
      'Over the last stretch of work, the floor of the suite was set out with string lines, opened up with trenches, fitted with drain lines set to a deliberate fall, inspected, backfilled, compacted, and graded. The black vapor barrier is now down across the whole space, and the screed lines are set.',
      'That means every fixture in the finished practice, every sink, every floor drain, and the plumbing for sterilization, is now permanently located. It is the least glamorous stage of a dental build and the one with the least room for error, because it all disappears under reinforced concrete.',
      'The next milestone is the concrete floor itself. After that the interior build-out begins and the space starts to look like a dental practice rather than a building site.',
      'The photo story on this page walks through the whole sequence.',
    ],
    image: {
      src: '/images/construction/11-vapor-barrier-wide.jpg',
      alt: 'Black vapor barrier laid across the full floor of the suite with plumbing stub-ups sleeved through it, ready for the concrete pour.',
      caption: 'Vapor barrier down and screed lines set, ready for concrete.',
    },
  },
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

export const sortedUpdates = [...constructionUpdates].sort((a, b) => b.date.localeCompare(a.date))

/**
 * The "New Office Construction Progress" graphic, in the brand's own five-stage
 * framing. Square for on-page and social feed, portrait 4:5 for stories and
 * print, and a 1.91:1 card for og:image.
 */
export const progressGraphic = {
  square: '/images/construction/progress-graphic-square.jpg',
  portrait: '/images/construction/progress-graphic-portrait.jpg',
  og: '/images/construction/progress-og.jpg',
  alt: 'Smile Studio of Rehoboth new office construction progress graphic, showing five stages with site photographs: trenching, plumbing rough-in, backfill, vapor barrier, and ready for concrete.',
  stages: [
    { n: 1, name: 'Trenching', detail: 'Footings and utility trenches excavated and laid out.' },
    { n: 2, name: 'Plumbing rough-in', detail: 'Underground plumbing lines installed.' },
    { n: 3, name: 'Backfill', detail: 'Trenches backfilled and compacted.' },
    { n: 4, name: 'Vapor barrier', detail: 'Vapor barrier installed for slab prep.' },
    { n: 5, name: 'Ready for concrete', detail: 'Site prepared for concrete placement.' },
  ],
} as const

/** Cover image for the story, used in previews. */
export const storyCover = storyChapters[4]?.photos[0] ?? storyChapters[0]?.photos[0]

export const totalStoryPhotos = storyChapters.reduce((n, c) => n + c.photos.length, 0)
