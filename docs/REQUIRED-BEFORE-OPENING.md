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
| 1 | **Public phone number** | Operations | Header and footer phone, click-to-call, mobile Call action, `telephone` in schema, call tracking, emergency contact. One config value. |
| 2 | **Exact opening date** | Construction + Operations | "Now Open" mode, `openingDate` schema, Google Business Profile eligibility, opening-list announcement |
| 3 | **Provider roster and credentials** | Clinical Lead | Meet the Team, `Person` schema, provider review attribution on 12 clinical pages |
| 4 | **Confirmed service list** | Clinical Lead | Service tier `confirmed`, `Service` schema, booking CTAs, GBP service categories |
| 5 | **Emergency procedures** | Clinical Lead + Compliance | Rewrite of the emergency page, `emergency-dentist` keyword activation |
| 6 | **Scheduling workflow and URL** | Operations | Request an Appointment, online booking, scheduling attribution |
| 7 | **Legal review of all four policy pages** | Marketing + counsel | Launch |

## Priority 2 — Needed at opening

| # | Item | Owner | Notes |
|---|---|---|---|
| 8 | **Suite number, and the name on the exterior signage** | Operations + Marketing | The building directory photographed on site lists **Suite 1** under the name **"Freedom Dental"**, while this website is branded **Smile Studio of Rehoboth**. Two things to settle: (a) confirm the suite number so it can be set in `address.line2`, and (b) decide which name goes on the exterior sign and the directory. A patient who searches for Smile Studio of Rehoboth and arrives at a sign reading Freedom Dental will think they are in the wrong place. Affects NAP consistency, Google Business Profile, and wayfinding. |
| 9 | Insurance participation, executed contracts only | Operations | Never publish a plan name before the contract is signed |
| 10 | Financing options and any membership plan | Operations | |
| 11 | Patient forms + intake system with a signed BAA | Operations + Compliance | |
| 12 | Notice of Privacy Practices | Compliance | Linked from the footer and privacy policy |
| 13 | Payment portal URL | Operations | |
| 14 | Office technology, installed, by make and model | Clinical Lead | Only name what is physically installed |
| 15 | Parking details | Operations, by site walk | Space count, accessible spaces, distance to door |
| 16 | Accessibility details | Operations, by site walk | Step-free entry, door widths, restroom, operatory access |
| 17 | Confirmed office hours, including any lunch closure | Operations | Weekend hours only if actually offered |
| 18 | Completed-office photography | Marketing | See `docs/PHOTOGRAPHY-SHOT-LIST.md` §B. Construction photography through slab prep is now published. **Next priority: photograph the concrete pour, and repeat the vapor-barrier wide shot from the same position afterwards for a before-and-after pair.** |
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
