/**
 * PROVIDER ROSTER
 * ===============
 * Source of truth for every person presented to patients as a clinician.
 *
 * SOURCING RULE
 * -------------
 * Everything in `bio`, `education`, and `honors` below is taken from Freedom
 * Dental Health's own Provider Spotlight announcement for Dr. Cottone, supplied
 * by the practice on 2026-10-21. Nothing has been inferred, rounded up, or
 * filled in from what a dentist with this background "probably" also has.
 *
 * That matters more here than on a normal marketing page. Provider credentials
 * are a regulated claim: the Delaware Board of Dentistry's advertising rules
 * govern how training and qualifications may be described, and a credential
 * stated loosely is a compliance problem rather than a typo. Where a fact is
 * missing it is `null` with a [TO CONFIRM] note, and the UI omits the whole
 * element rather than guessing.
 *
 * Specifically NOT claimed, because no source states them:
 *   · a Delaware license number
 *   · a graduation year or any "years of experience" figure
 *   · clinical interests, special training, or languages spoken
 *   · board certifications or specialty status
 * See docs/REQUIRED-BEFORE-OPENING.md.
 */

export interface ProviderEducation {
  /**
   * The qualification, where it is known. Null where the source names the
   * institution but not the award: "pursued his dental education at X" does not
   * tell us whether X granted a DDS or a DMD, and the two are not
   * interchangeable on a page that a dental board may read.
   */
  readonly credential: string | null
  readonly institution: string
  /** Honors or distinctions, exactly as the source states them. */
  readonly detail: string | null
}

export interface ProviderPhoto {
  readonly src: string
  readonly srcSmall: string
  readonly width: number
  readonly height: number
  readonly alt: string
}

export interface Provider {
  readonly slug: string
  /** Name without honorific, for schema.org `name`. */
  readonly name: string
  /** How the person is addressed in running copy. */
  readonly displayName: string
  /**
   * Post-nominal letters. Rendered nowhere while null, so an unconfirmed
   * credential is absent rather than guessed.
   */
  readonly credentials: string | null
  /**
   * Role as presented to patients. [TO CONFIRM] for a formal title: the
   * practice described him as "the main doctor", which is a description, not a
   * job title, so the neutral term is used until a title is ratified.
   */
  readonly role: string
  readonly photo: ProviderPhoto | null
  readonly hometown: string
  readonly education: readonly ProviderEducation[]
  readonly honors: readonly string[]
  /** Patient-facing biography. Paragraphs, rendered in order. */
  readonly bio: readonly string[]
  /** [TO CONFIRM] Delaware license number, for the regulatory footer. */
  readonly licenseNumber: string | null
}

export const providers: readonly Provider[] = [
  {
    slug: 'jonathon-cottone',
    name: 'Jonathon Cottone',
    displayName: 'Dr. Jonathon Cottone',
    credentials: 'DDS',
    role: 'Dentist',
    photo: {
      src: '/images/team/cottone.jpg',
      srcSmall: '/images/team/cottone-500.jpg',
      width: 1000,
      height: 1250,
      alt: 'Dr. Jonathon Cottone, dentist at Smile Studio of Rehoboth, in dark scrubs against a plain background.',
    },
    hometown: 'Bucks County, Pennsylvania',
    education: [
      {
        credential: 'Bachelor of Science, Plant Science and Animal Science',
        institution: 'University of Delaware',
        detail: 'Graduated Cum Laude with a double major',
      },
      {
        // Confirmed by the practice 2026-10-21. The Provider Spotlight named
        // only the school, so this was deliberately left blank until asked.
        credential: 'Doctor of Dental Surgery (DDS)',
        institution: 'University of Maryland School of Dentistry',
        detail: 'Graduated in the top quarter of his class',
      },
    ],
    honors: [
      'Plant Science Student of the Year, University of Delaware',
      'Advanced research at the Delaware Biotechnology Institute',
      'Multiple awards for excellence in general dentistry and oral pathology',
    ],
    bio: [
      'Dr. Jonathon Cottone grew up in Bucks County, Pennsylvania, and has held deep connections to Sussex County since childhood, visiting regularly to spend time with family. Practicing in Rehoboth Beach is a return to a place he has known his whole life, rather than a posting he arrived at by chance.',
      'He earned his Bachelor of Science at the University of Delaware, graduating Cum Laude with a double major in Plant Science and Animal Science. His academic work was recognized with honors including Plant Science Student of the Year, and he took on advanced research at the Delaware Biotechnology Institute.',
      'Dr. Cottone pursued his dental education at the University of Maryland School of Dentistry, where he graduated in the top quarter of his class and received multiple awards for excellence in general dentistry and oral pathology.',
      'He joined Freedom Dental Health at its Peninsula Dental office in Millsboro before taking up his role here in Rehoboth Beach.',
    ],
    licenseNumber: null,
  },
]

export const providerSlugs: readonly string[] = providers.map((p) => p.slug)

export function providerBySlug(slug: string): Provider | undefined {
  return providers.find((p) => p.slug === slug)
}

/** Full name plus post-nominals, when they are known. */
export function providerFullName(p: Provider): string {
  return p.credentials ? `${p.displayName}, ${p.credentials}` : p.displayName
}
