# Required Before Opening

Every fact the website is currently missing, who owns it, and what unblocks when
it arrives. This is the master outstanding-information list.

Each item is marked in code with a `[TO CONFIRM]` comment or a
`<PlaceholderNote>` block, so nothing here can be quietly forgotten. Placeholder
notes are visible on staging (`NEXT_PUBLIC_SHOW_PLACEHOLDERS=true`) and hidden
in production.

---

## Priority 1 — Blocks the practice from opening

| # | Item | Owner | Unblocks |
|---|---|---|---|
| 1 | ~~**Public phone number**~~ **RESOLVED 2026-10-21** | Operations | **(302) 715-0020**, confirmed by the practice's own FINAL postcard and coming-soon sign. Now live in `practice.ts`: header, footer, click-to-call, mobile Call action, and `telephone` in structured data. |
| 2 | **Exact opening date** | Construction + Operations | "Now Open" mode, `openingDate` schema, Google Business Profile eligibility, opening-list announcement |
| 3 | **Provider roster** PARTLY RESOLVED 2026-10-21 | Clinical Lead | **Dr. Jonathon Cottone** confirmed as the practice's dentist, with biography sourced from Freedom Dental Health's own Provider Spotlight. `/team` is live with `Person` schema. **Still needed:** (a) the degree designation Maryland awarded, DDS or DMD, which is deliberately NOT stated anywhere on the site until confirmed; (b) his Delaware license number; (c) hygienists, assistants and front-office staff, who are described as being hired but not named. |
| 4 | ~~**Confirmed service list**~~ **RESOLVED 2026-10-21** | Clinical Lead | Dr. Cottone provides all seven categories. All tiers flipped to `confirmed`, `Service` schema now emits on every category page, and booking CTAs are live. Specialty referrals remain separate, with periodontics now next door rather than a referral out. |
| 5 | **Emergency procedures** | Clinical Lead + Compliance | Rewrite of the emergency page, `emergency-dentist` keyword activation |
| 6 | **Scheduling workflow and URL** | Operations | **Partly resolved 2026-10-21.** The postcard advertises "CURRENTLY SCHEDULING APPOINTMENTS" by phone, so `openingStatus` is now `'scheduling'` and `/request-appointment` is live (phone first, request form second, team calls back to confirm). Still outstanding: a real online-booking URL for `externalLinks.onlineScheduling`, and who owns callbacks and how fast. |
| 7 | **Legal review of all four policy pages** | Marketing + counsel | Launch |

## Priority 2 — Needed at opening

| # | Item | Owner | Notes |
|---|---|---|---|
| 8 | **Suite number** RESOLVED; **exterior signage name** still open | Operations + Marketing | **Suite 1 confirmed 2026-10-21** by the FINAL postcard and set in `address.line2`. The signage conflict remains: the building directory photographed on site lists Suite 1 under the name **"Freedom Dental"**, while this website and the postcard are branded **Smile Studio of Rehoboth**. Two things to settle: (a) confirm the suite number so it can be set in `address.line2`, and (b) decide which name goes on the exterior sign and the directory. A patient who searches for Smile Studio of Rehoboth and arrives at a sign reading Freedom Dental will think they are in the wrong place. Affects NAP consistency, Google Business Profile, and wayfinding. |
| 9 | ~~**Insurance**~~ **RESOLVED 2026-10-21** | Operations | Out of network, courtesy billing, **payment collected in full at time of service**, and **assignment of benefits turned over to the patient** so the insurer reimburses them directly. Published on the insurance page and in the FAQs. Still open: accepted payment methods, third-party financing, and any membership plan. Never publish a plan name before a contract is signed. |
| 10 | Financing options and any membership plan | Operations | |
| 11 | Patient forms + intake system with a signed BAA | Operations + Compliance | |
| 12 | Notice of Privacy Practices | Compliance | Linked from the footer and privacy policy |
| 13 | Payment portal URL | Operations | |
| 14 | ~~**Office technology**~~ **RESOLVED 2026-10-21** | Clinical Lead | Confirmed: digital X-rays, intraoral photography, digital scanning, and an **i-CAT CBCT**. The page now presents these as the committed equipment list rather than aspirations, while being explicit that nothing is installed yet because the office is still a building site. Name each system by manufacturer and model as it is commissioned. |
| 15 | Parking details | Operations, by site walk | Space count, accessible spaces, distance to door |
| 16 | Accessibility details | Operations, by site walk | Step-free entry, door widths, restroom, operatory access |
| 17 | Confirmed office hours, including any lunch closure | Operations | Weekend hours only if actually offered |
| 18 | **Completed-office photography** | Marketing | See `docs/PHOTOGRAPHY-SHOT-LIST.md` §B. Construction photography now runs through drywall, data rough-in, floor tile, and the roadside sign. The concrete pour was never photographed and that opportunity has passed: the slab is down and tiled over. **Next priority: the operatories as cabinetry and chairs go in, shot from a repeatable position so the same frame can be taken again once the room is finished.** Then the full §B set when the office is complete. |
| 19 | Provider headshots | Marketing | Brand Guide §5 standard |
| 20 | Google Business Profile | Marketing | Only within Google's eligibility window |
| 21 | Verified Google Maps pin | Marketing | Enables `geo` and `hasMap` in schema |
| 22 | Social media profiles | Marketing | Enables `sameAs` and footer links |

## Priority 3 — Should be settled, not blocking

| # | Item | Owner |
|---|---|---|
| 23 | Response-time standard for `info@rehobothsmiles.com` | Operations. **No promise appears on the site because none has been agreed.** |
| 24 | Whether visiting specialists will hold sessions at Rehoboth | Clinical Lead |
| 25 | Whether a cookie consent banner is legally required | Counsel |
| 26 | Rate-limiter strategy, once the hosting model is fixed | Engineering |
| 27 | Trademark filing status for the name and mark | Legal |
| 28 | Careers: named roles, compensation bands, ATS link | HR |
| 29 | Community sponsorships and partnerships | Marketing |
| 30 | Pantone matches for print | Marketing. Brand Guide flags these as pending. |

---

## Neighboring practice

**Periodontal Associates of Delaware** is opening in **Suite 4** at Plantations
Professional Park, in the same building as us. The services page now presents
periodontics as "next door" rather than as a coordinated referral out, because
those are materially different promises to a patient.

[TO CONFIRM] whether that practice has its own opening date, website, and phone
number to link to, and whether the relationship should be described anywhere
beyond the services page.

## Provider credentials — do not fill these in from assumption

| Item | Detail |
|---|---|
| ~~**Degree designation**~~ **RESOLVED 2026-10-21** | **DDS**, confirmed by the practice. The site now renders "Dr. Jonathon Cottone, DDS" and emits `honorificSuffix` in Person schema. The Provider Spotlight never named the award, which is why it was left blank until asked. |
| **Delaware license number** | Not supplied. `licenseNumber` is `null`. Needed if the site is to carry a regulatory footer. |
| **Years in practice** | No graduation year was supplied, so no "X years of experience" claim appears anywhere. Do not add one without a date to support it. |

## Local listings — the address is settled

**CONFIRMED 2026-10-21: `19411 Plantations Road` (plural), Suite 1.**

Submit this string character for character to Google Business Profile, Apple
Business Connect, Bing Places, and the data aggregators:

```
Smile Studio of Rehoboth
19411 Plantations Road, Suite 1
Rehoboth Beach, DE 19971
(302) 715-0020
https://www.rehobothsmiles.com
```

> **The FINAL postcard has a typo.** It prints "19411 Plantation Road",
> singular. That is a misprint in the printed piece, not an alternate spelling,
> and the postcard is already in circulation. Two actions: correct it on the
> next print run, and make sure nobody submitting directory listings works from
> the card rather than from this document. An address that disagrees across
> Google, Apple, Bing and the aggregators is slow and expensive to unwind, and
> the whole point of fixing it here is that it never gets syndicated.

Still outstanding before submission: the exterior directory reads **"Freedom
Dental"** against Suite 1 while every patient-facing piece says Smile Studio of
Rehoboth. Google compares the submitted name against street-level and
photographic evidence, and a mismatch is a common cause of verification failure
or suspension. Settle the signage before submitting, not after.

## Brand-level items to reconcile

These are genuine inconsistencies between the source documents, not build gaps.

| Item | Detail | Action |
|---|---|---|
| **Domain** | Brand Guide v1.0 prints `www.smilestudiorehoboth.com` in its own page footers and boilerplate, and marks the final domain `[TO CONFIRM]`. The build uses `www.rehobothsmiles.com` per the brief. | Confirm which is correct. If the brand guide's domain wins, it is one config value here, but the guide's own collateral and any printed material must change too. |
| **Practice name** | Resolved for the website: **Smile Studio of Rehoboth**, per Brand Guide p.23 which explicitly prohibits "Rehoboth Smile Studio". Chosen over the brief's "Rehoboth Smile Studio" on the basis of the brand guide and the final logo artwork, but **not yet ratified by the practice**. **However, the exterior building directory at the site reads "Freedom Dental".** | Reconcile the physical signage with the website branding, or vice versa. This is now a live inconsistency a patient can see, not a theoretical one. |
| **Parent org attribution** | Site uses "A Freedom Dental Health Practice" per the brief. Brand Guide boilerplate uses "Freedom Dental Health System" and marks the attribution `[TO CONFIRM]`. | Ratify one form and apply it everywhere. |
| **Mist Gray accessibility** | `#7A8899` fails the 4.5:1 minimum the guide itself commits to. Site uses `#657384`. | Adopt into Brand Guide v1.1. |
| **Eyebrow weight** | Guide nominates Montserrat Light 300 for eyebrows, but also forbids Light below 16pt. Eyebrows render at 12px. Site uses SemiBold. | Clarify in v1.1. |
| **Tagline** | None approved. None invented. | Decide whether one will exist. |

---

## Placeholder inventory in code

Searchable with `grep -rn "TO CONFIRM\|PlaceholderNote" src/`.

| Location | Awaiting |
|---|---|
| `config/practice.ts` | Phone, suite, exact date, geo verification, all `externalLinks` |
| `content/services.ts` | Tier confirmation on all seven categories |
| `content/construction.ts` | Milestone statuses, update photography |
| `content/blog.ts` | Provider reviewers on all posts |
| Home hero | Rendering or construction photograph |
| Home §7, `/our-new-office` | Construction photography |
| `/our-new-office/office-features` | Verified office description |
| `/our-new-office/technology` | Installed equipment inventory |
| `/our-new-office/planned-hours` | Confirmed hours |
| `/contact/directions` | Parking and accessibility |
| `/new-patients/insurance-and-financing` | Verified plan list |
| `/new-patients/patient-forms` | Live forms URL and BAA confirmation |
| `/patient-resources/dental-emergency-information` | Emergency procedures |
| `/patient-resources/post-operative-instructions` | Provider-reviewed instruction sets |
| `/patient-resources/referring-providers` | Referral process |
| `/team` | Entire provider roster |
| `/careers` | Named roles |
| `/about` | Provider announcement |
| `/about/community` | Confirmed community commitments |
| `/privacy-policy`, `/website-terms` | Legal review |

**Never invent any of these.** The site's entire pre-opening credibility rests
on the fact that it does not.
