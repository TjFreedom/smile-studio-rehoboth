# Page-to-Keyword Map and Local SEO Strategy

Primary keyword, supporting terms, title, and search intent for every indexable
page. One primary keyword per page. No page competes with another for the same
term.

---

## Strategic position

The brand name contains "Rehoboth", which does real SEO work: the title suffix
`| Smile Studio of Rehoboth` carries local relevance on **every page** without
keyword stuffing the page-specific half. That is why service titles read
"Dental Implants" rather than "Dental Implants in Rehoboth Beach, DE" — the
location is already in the title, and the shorter form stays under the
truncation limit.

The city, state, street, and service area appear in each page's H1 context, meta
description, visible copy, and `areaServed` structured data.

---

## Tier 1 — Pre-opening intent (active now)

These are the terms that can realistically rank before the practice opens.
Search volume is low but intent is extremely high, and there is almost no
competition for "new dentist" phrasing in this market.

| Page | Primary keyword | Supporting terms | Title (chars) | Intent |
|---|---|---|---|---|
| `/` | new dentist coming to Rehoboth Beach | new dental office Rehoboth Beach, dentist opening Rehoboth Beach DE, Rehoboth Smiles, dentist Plantations Road | New Dentist Coming to Rehoboth Beach, DE \| Smile Studio of Rehoboth (67) | Informational → conversion |
| `/opening-list` | Rehoboth Beach dentist opening list | new dentist notify me Rehoboth, Smile Studio of Rehoboth opening | Join the Opening List (47) | Conversion |
| `/our-new-office` | new dental office Rehoboth Beach | dental office Plantations Road, Plantations Professional Park dentist | Our New Rehoboth Beach Office (57) | Informational |
| `/our-new-office/construction-updates` | Smile Studio of Rehoboth construction | new dentist Rehoboth progress | Construction Updates (48) | Informational, returning visitors |
| `/our-new-office/opening-faq` | when does Smile Studio of Rehoboth open | new dentist Rehoboth opening date | Opening Frequently Asked Questions (62) | Informational, FAQ rich result |
| `/our-new-office/planned-hours` | Rehoboth Beach dentist hours | dentist open Monday Friday Rehoboth | Planned Office Hours (48) | Informational |
| `/contact` | contact Smile Studio of Rehoboth | Rehoboth Beach dentist email, dentist 19411 Plantations Road | Contact Us (38) | Navigational |
| `/contact/directions` | directions to Smile Studio of Rehoboth | dentist near Route 1 Rehoboth, dentist Plantations Road directions | Directions and Parking (50) | Navigational |
| `/about` | about Smile Studio of Rehoboth | new dental practice Rehoboth Beach | About Our Practice (46) | Informational, brand |
| `/about/freedom-dental-health` | Freedom Dental Health Rehoboth Beach | Freedom Dental Health practice Delaware | Freedom Dental Health (49) | Brand, affiliation |
| `/careers` | dental jobs Rehoboth Beach DE | dental hygienist jobs Sussex County, dentist jobs Delaware beach | Careers (35) | Recruitment |
| `/blog/*` | long-tail practice news | see individual posts | absolute titles | Informational |

## Tier 2 — Service intent (built, activate on confirmation)

These pages exist and are indexable now, correctly framed as **planned**. They
build topical authority and URL age before opening. **Do not chase rankings on
these terms until the service is confirmed** — ranking for "emergency dentist
Rehoboth Beach" while unable to see emergency patients is an actively bad
outcome.

| Page | Primary keyword | Supporting terms | Activate when |
|---|---|---|---|
| `/services` | dentist services Rehoboth Beach DE | dental services Sussex County | Service list confirmed |
| `/services/general-and-preventive-dentistry` | family dentist Rehoboth Beach | dental cleaning Rehoboth Beach, general dentist Rehoboth Beach DE, teeth cleaning Lewes | Confirmed |
| `/services/restorative-dentistry` | dental crowns Rehoboth Beach | dentures Rehoboth Beach, fillings, root canal Rehoboth Beach | Confirmed |
| `/services/cosmetic-dentistry` | cosmetic dentist Rehoboth Beach | teeth whitening Rehoboth Beach, veneers Rehoboth Beach, clear aligners Sussex County | Confirmed |
| `/services/dental-implants` | dental implants Rehoboth Beach | implant dentist Sussex County, implant-supported dentures Delaware | Confirmed |
| `/services/emergency-dentistry` | emergency dentist Rehoboth Beach | same-day dentist Rehoboth, dental emergency Delaware beach, tooth pain on vacation | **Emergency procedures confirmed AND phone live** |
| `/services/tmj-and-facial-pain` | TMJ treatment Rehoboth Beach | jaw pain dentist Sussex County, TMD Delaware | Provider confirmed |
| `/services/sleep-and-airway-care` | sleep apnea dentist Rehoboth Beach | oral appliance therapy Delaware, snoring treatment Sussex County | Provider confirmed |
| `/new-patients` | new patient dentist Rehoboth Beach | accepting new patients Rehoboth Beach | Scheduling live |
| `/new-patients/what-to-expect` | first dental visit Rehoboth Beach | what to expect dentist | Anytime |
| `/new-patients/insurance-and-financing` | dentist that takes my insurance Rehoboth Beach | dental insurance Rehoboth Beach DE | Plans verified |
| `/patient-resources/dental-emergency-information` | dental emergency Rehoboth Beach | what to do broken tooth, knocked out tooth | Currently redirects elsewhere, by design |

## Tier 3 — Nearby communities (NOT built)

`/dentist/[community]` for Lewes, Dewey Beach, Milton, Harbeson, Long Neck,
Millsboro, Henlopen Acres.

**Build only when each page carries genuinely unique content:** real driving
directions from that community, drive time in and out of season, access notes,
and questions specific to those patients. The brief explicitly prohibits dozens
of thin duplicated city pages, and Google treats them as doorway pages.

Interim approach, already implemented: each community is named naturally in body
copy on `/contact/directions`, `/about/community`, and the home page, and all
eight appear in `areaServed` structured data.

---

## Technical SEO implemented

| Requirement | Implementation |
|---|---|
| One H1 per page | Verified across all 45 pages |
| Unique titles | Verified, zero duplicates |
| Unique meta descriptions | Verified, zero duplicates, all ≤ 165 chars |
| Self-referencing canonicals | `alternates.canonical` on every page, absolute, www, https |
| Logical heading hierarchy | H1 → H2 → H3, no level skipped |
| Clean URLs | Lowercase, hyphenated, no query strings, no file extensions |
| XML sitemap | `src/app/sitemap.ts`, 42 URLs, generated from the same data as the nav |
| robots.txt | `src/app/robots.ts`, disallows `/api/` and `/thank-you/` |
| Open Graph + Twitter | Every page, with a branded 1200×630 card |
| Breadcrumbs | Visible + `BreadcrumbList` schema on every interior page |
| Internal linking | Every page has contextual related links; zero orphans |
| Descriptive alt text | Meaningful images described, decorative images `aria-hidden` |
| Redirects | 15 legacy/convenience paths in `next.config.mjs` |
| Staging protection | `noindex` meta + `X-Robots-Tag` header + empty sitemap unless `NEXT_PUBLIC_ALLOW_INDEXING=true` |
| No keyword stuffing | Prose written for readers; no repeated "beautiful smile" |
| No hidden text | None |
| No doorway pages | Tier 3 deliberately not built |
| Image optimisation | AVIF/WebP via `next/image`, responsive `deviceSizes` |
| Lazy loading | Below-the-fold images lazy by default; map iframe click-to-load |

## Deliberately excluded from structured data pre-opening

`telephone`, `openingHoursSpecification`, `openingDate`, `geo`, `hasMap`,
`aggregateRating`, `review`, `priceRange`, `employee`, `makesOffer`, and
`Service` nodes for unconfirmed services. Enforced in `src/lib/schema.ts`, not
left to individual pages. Verified present-and-absent by automated check.
