# Office Opening Transition Checklist

Turning the site from pre-opening mode to an operating practice. The build was
designed so this is mostly configuration, not redesign.

---

## Phase 1 — Confirm the facts (before touching any code)

Nothing below moves until each item is genuinely confirmed. The whole value of
this site's pre-opening posture is that it never claimed anything it could not
support, and that is easiest to lose on opening week.

- [ ] Exact opening date, firm enough to publish
- [ ] Public phone number assigned, active, and answered by a person
- [ ] Final practice name confirmed (currently **Smile Studio of Rehoboth**, per Brand Guide v1.0 p.23)
- [ ] Final suite number
- [ ] Provider roster, credentials verified against the Delaware Board register
- [ ] Provider biographies approved **in writing by each provider**
- [ ] Provider headshots shot to the Brand Guide §5 standard
- [ ] Confirmed service list, signed off by clinical leadership
- [ ] Which specialty services are delivered **on site**, and which are referrals
- [ ] Visiting specialist schedules, if any
- [ ] Office technology actually installed, by manufacturer and model
- [ ] Insurance participation, with executed contracts
- [ ] Financing options and any membership plan
- [ ] Patient forms and the intake system, with a signed Business Associate Agreement
- [ ] Online scheduling workflow and URL
- [ ] Payment portal URL
- [ ] Emergency procedures, hours, after-hours routing, and whether non-patients of record are seen
- [ ] Parking details, verified by walking the site
- [ ] Accessibility details, verified by walking the site
- [ ] Notice of Privacy Practices published
- [ ] Social media profiles created and branded

---

## Phase 2 — Flip the configuration

All in `src/config/practice.ts`. **This is the entire mode switch.**

```ts
export const phoneNumber = '(302) 555-0123'      // display format
export const phoneNumberE164 = '+13025550123'    // schema + tel: links
export const showPhoneNumber = true
export const enableClickToCall = true

export const openingStatus: OpeningStatus = 'open'
export const exactOpeningDate = '2026-12-01'     // confirmed ISO date

export const features = {
  enableOnlineScheduling: true,
  enableAppointmentRequests: true,
  enableOpeningList: false,
  enablePatientForms: true,
  enablePayOnline: true,
  enableEmergencyInstructions: true,
  enableTeamPages: true,
  enableInsuranceList: true,
  enableBlog: true,
  enableSocialLinks: true,
}

export const externalLinks = {
  onlineScheduling: 'https://…',
  patientForms: 'https://…',
  payOnline: 'https://…',
  googleBusinessProfile: 'https://…',
  googleMaps: 'https://…',
  noticeOfPrivacyPractices: 'https://…',
  facebook: 'https://…',
  instagram: 'https://…',
  careers: null,
}

export const geoIsVerified = true   // after the GBP pin is confirmed
```

Also set `address.line2` if a suite number was assigned, and update
`plannedHours` if the confirmed hours differ.

### What happens automatically from those flags

| Change | Driven by |
|---|---|
| "Join the Opening List" → "Request an Appointment" everywhere | `cta.primaryLabel` |
| Mobile bar: Opening Updates / Email / Directions → Call / Schedule / Directions | `cta.mobileBar` |
| Phone appears in the header and footer, click-to-call active | `showPhoneNumber` |
| "Planned Office Hours" → "Office Hours" on every page | `hoursLabel` |
| `telephone` added to structured data | `phoneNumberE164` |
| `openingHoursSpecification` added to structured data | `openingStatus` |
| `openingDate` added | `exactOpeningDate` |
| `geo` added | `geoIsVerified` |
| `hasMap` added | `externalLinks.googleMaps` |
| Social links appear in the footer | `enableSocialLinks` + URLs |
| Announcement bar disappears | `isPreOpening` |
| Meet the Team appears in nav and sitemap, becomes indexable | `enableTeamPages` |
| Blog and sitemap entries update | feature flags |
| Service cards read "Learn more" instead of "View planned services" | `isPreOpening` |

## Phase 3 — Confirm services

In `src/content/services.ts`, change `tier: 'planned'` to `tier: 'confirmed'`
for each confirmed service. That single change:

- removes the "Planned service" badge
- removes the publication-gate warning
- **emits `Service` structured data** (deliberately suppressed while planned)
- changes treatment-list framing from "planned treatments" to offered treatments

**Leave any unconfirmed service as `planned`, or remove it.** Do not confirm a
service to tidy the page up.

## Phase 4 — Content rewrites (genuine editorial work)

These are not flag flips. Each needs writing and review.

| Page | Work |
|---|---|
| `/` | Post-opening variation, see below |
| `/patient-resources/dental-emergency-information` | **Complete rewrite.** Currently redirects visitors elsewhere. Replace with our own procedures. Legal and clinical review required. |
| `/services/emergency-dentistry` | Remove the publication gate, add real policy |
| `/services/tmj-and-facial-pain`, `/services/sleep-and-airway-care` | Remove gates once providers are confirmed; keep the physician-diagnosis boundary language |
| `/our-new-office/*` | Construction section becomes office tour and technology. Rename the section to "Our Office". |
| `/our-new-office/technology` | Replace intentions with the installed inventory, named |
| `/our-new-office/office-features` | Replace with a verified description, plus photography |
| `/contact/directions` | Add verified parking and accessibility detail |
| `/new-patients/insurance-and-financing` | Add the verified plan list |
| `/new-patients/patient-forms` | Link the live forms |
| `/team` | Build `/team/[slug]`, add `Person` schema |
| Every clinical page | Replace the "Clinical review status" notice with a named provider, credentials, and review date |
| `/our-new-office/opening-faq` | Becomes a general FAQ, or redirects to `/new-patients/faq` |

### Post-opening homepage

| Section | Change |
|---|---|
| Announcement bar | Remove, or "Now Open in Rehoboth Beach" |
| H1 | **"Modern Dental Care for Rehoboth Beach"** |
| Supporting copy | **"Complete, patient-centered dentistry in a welcoming new office designed around your comfort, your goals, and your overall health."** |
| Primary CTA | Request an Appointment |
| Secondary CTA | Call, once the number is live |
| Quick info bar | Status → "Now open"; Anticipated opening → confirmed message; Planned Hours → Office Hours |
| §6 Planned care | Confirmed services with booking CTAs |
| §7 Construction | Replace with office tour and technology |
| §11 Opening FAQ | Replace with new patient FAQ |
| §12 Opening list | Replace with appointment request |

## Phase 5 — Notify the opening list first

**Before the site changes**, email the list with the confirmed date, provider
introductions, and early scheduling access. That is the entire promise the list
was built on, and breaking it would waste the whole pre-opening effort.

Give them a real head start, not a token one.

## Phase 6 — Analytics and marketing

- [ ] Register `click_to_call` in GTM (activates automatically from `enableClickToCall`)
- [ ] Register the appointment and scheduling events listed in `docs/ANALYTICS-PLAN.md`
- [ ] Update GA4 key events: `appointment_form_submit` and `click_to_call` become primary; opening-list events retire
- [ ] Google Business Profile: publish, set verified hours, add photography, post the opening announcement
- [ ] Verify NAP consistency across the site, GBP, social, and any directory listing
- [ ] Add the phone number to structured data *(automatic)*
- [ ] Resubmit the sitemap in Search Console
- [ ] Begin review requests **only after** patients have actually been treated

## Phase 7 — Re-verify

- [ ] Structured data validates with the new fields present
- [ ] Every new page has a unique title and description
- [ ] Click-to-call works on a real phone
- [ ] Scheduling link works end to end
- [ ] Re-run the accessibility and performance checks
- [ ] Re-run the redirect checks
- [ ] Confirm no "planned" or "anticipated" language survives where it no longer applies
- [ ] Confirm no `[TO CONFIRM]` placeholder is still rendering

## Phase 8 — Retire the scaffolding

- [ ] Remove `<PlaceholderNote>` blocks that have been satisfied
- [ ] Archive `/our-new-office/construction-updates` or convert it to practice news, with redirects if URLs change
- [ ] Remove the opening-list route, or repoint it to appointment requests, with a 301
- [ ] Update `next.config.mjs` redirects: `/schedule`, `/book`, `/appointments` currently point at `/opening-list` and must point at the real scheduling route
