# Provider Biography Template and Team Page Activation

The Meet the Team section is built but **hidden**: excluded from navigation and
the XML sitemap, and set to `noindex`, via `features.enableTeamPages` in
`src/config/practice.ts`. `/team` serves an honest holding page rather than a
404, so an old link or a direct URL still lands somewhere useful.

---

## 1. Why nothing is published yet

No provider roster has been confirmed. Publishing placeholder biographies or
stock headshots would be a fabrication about the people who will treat patients,
which is the single most consequential thing a dental website says. The holding
page states this plainly, and that honesty is itself a trust signal for a
sceptical, design-literate audience.

## 2. Data model to implement

Create `src/content/providers.ts`:

```ts
export interface Provider {
  slug: string                 // 'jane-doe'
  name: string                 // 'Jane Doe'
  credentials: string          // 'DMD' — exactly as held, never inflated
  role: string                 // 'General Dentist'
  /** Delaware licence number. Verified against the state board register. */
  licenceNumber: string
  /** [VERIFY] against the Delaware Board of Dentistry before publication. */
  licenceVerifiedOn: string    // ISO date
  dentalSchool: string
  postgraduateTraining?: string[]
  yearsInPractice?: number
  clinicalInterests: string[]
  memberships: string[]
  languages?: string[]
  /** Short intro, 2 to 3 sentences, first person or third, consistently. */
  bio: string[]
  /** One human paragraph. Required: the guide's voice is warm, not clinical. */
  personal?: string
  headshot: { src: string; alt: string }
  /** Set true only after the provider has read and approved their own page. */
  approvedByProvider: boolean
  approvedOn: string
}
```

## 3. Biography structure

1. **Name and credentials**, exactly as held
2. **Role** at this practice
3. **Where they trained**, dental school and any postgraduate programme
4. **Delaware licensure**
5. **Clinical interests**, and what they most enjoy treating
6. **Professional memberships**
7. **Approach**, two to three sentences in the practice voice
8. **Something human**, where they live, what they do at the beach
9. **Languages**, where relevant
10. **Headshot**, shot to the Brand Guide §5 standard

### Sample, showing tone and length

> **Jane Doe, DMD** — General Dentist
>
> Dr. Doe earned her DMD at [school] and completed a general practice residency
> at [hospital]. She has practised in Delaware since [year] and is licensed by
> the Delaware Board of Dentistry.
>
> Her clinical interests are restorative dentistry and caring for patients who
> have been away from the dentist for a while. She is the person on our team
> most likely to spend the first appointment simply talking, because she thinks
> the plan matters more than the speed of getting to it.
>
> Dr. Doe is a member of the American Dental Association and the Delaware State
> Dental Society.
>
> She lives in [town] with her family and spends most of her free time on the
> water, badly.

**Word count:** 150 to 250. Long enough to be a person, short enough to read.

## 4. Credential rules (Brand Guide §10, Delaware advertising rules)

- State credentials **exactly** as held. `DDS` and `DMD` are equivalent degrees; use whichever the provider actually holds.
- **Never imply specialty status without the recognised credential.** In Delaware, "specialist", "orthodontist", "periodontist", "endodontist", "prosthodontist", "oral surgeon", and "pediatric dentist" are regulated designations.
- A general dentist with substantial training in an area is described as exactly that: *"a general dentist with advanced training in implant restoration"*, not *"an implant specialist"*.
- Fellowships and diplomate status may be stated **only** if current, and the awarding body must be named.
- Do not use "Dr." for non-dentist team members holding non-doctoral qualifications.
- **[VERIFY]** every licence number against the Delaware Board of Dentistry register before publication, and record the verification date.

## 5. Headshot standard (Brand Guide §5)

- Framing: mid-chest to top of head, eyes in the upper third
- Slight head tilt for warmth, direct eye contact
- Wardrobe: solid professional colours. Navy, white, and soft blue read best against the palette. Clinical staff in branded scrubs or clean lab coats. No busy patterns, no non-brand logos.
- Background: soft neutral, or an environmental practice setting blurred at f/2.8 to f/4. **Consistent across every member of a given shoot.**
- Lighting: even, soft, diffused. No hard chin or eye shadows.
- Retouching: blemish removal only. Never alter facial features or age the subject.
- Delivery: 4:5, minimum 1200px wide, AVIF/WebP
- Refresh every 18 to 24 months

## 6. Activation checklist

Work top to bottom. Do not skip step 8.

- [ ] Roster confirmed by clinical leadership
- [ ] Credentials verified against the Delaware Board register, with dates recorded
- [ ] Biographies drafted in the practice voice
- [ ] Headshots shot to the §5 standard and approved
- [ ] **Each provider has read and approved their own page in writing** (`approvedByProvider: true`)
- [ ] Marketing has reviewed for advertising compliance
- [ ] `src/content/providers.ts` populated
- [ ] `/team/[slug]` route built with `Person` schema, linked to the practice via `worksFor`
- [ ] `employee` added to the practice schema node in `src/lib/schema.ts`
- [ ] Provider reviewer attribution added to every clinical page and blog post, replacing the current "Clinical review status" notice
- [ ] `features.enableTeamPages` set to `true` — this alone restores navigation, the sitemap entry, and indexing
- [ ] `/team` added to the XML sitemap (automatic, driven by the same flag)
- [ ] Provider introduction sent to the opening list **before** the pages go public

## 7. Content this unblocks

Twelve pages currently carry a "Clinical review status" notice explaining that no
provider has reviewed them. Once providers exist, each needs a named reviewer,
credentials, review date, and a link to their biography. That converts the whole
clinical library from unattributed to properly credentialed, which is the single
largest E-E-A-T improvement available to this site.

Affected: all seven service pages, `/about/whole-person-care`,
`/new-patients/what-to-expect`, `/patient-resources/post-operative-instructions`,
`/patient-resources/dental-emergency-information`, and every clinical blog post.
