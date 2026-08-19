# Sitemap, User Journeys, and Conversion Strategy

---

## 1. Complete sitemap

`○` built and indexable · `◐` built, deliberately noindex · `✕` intentionally not built yet

```
/                                             ○  Pre-opening home
├── /about                                    ○  About the practice
│   ├── /about/our-approach                   ○  How we intend to work
│   ├── /about/whole-person-care              ○  Oral health and general health, scoped honestly
│   ├── /about/freedom-dental-health          ○  The affiliation, and its limits
│   └── /about/community                      ○  Serving year-round Sussex County
│
├── /services                                 ○  All planned services + tier explainer
│   ├── /services/general-and-preventive-dentistry   ○
│   ├── /services/restorative-dentistry              ○
│   ├── /services/cosmetic-dentistry                 ○
│   ├── /services/dental-implants                    ○
│   ├── /services/emergency-dentistry                ○  (publication-gated)
│   ├── /services/tmj-and-facial-pain                ○  (publication-gated)
│   └── /services/sleep-and-airway-care              ○  (publication-gated)
│
├── /new-patients                             ○  How becoming a patient will work
│   ├── /new-patients/what-to-expect          ○
│   ├── /new-patients/insurance-and-financing ○
│   ├── /new-patients/patient-forms           ○
│   └── /new-patients/faq                     ○
│
├── /team                                     ◐  Holding page. Hidden from nav + sitemap.
│   └── /team/[provider]                      ✕  Built when the roster is confirmed
│
├── /our-new-office                           ○  Construction hub
│   ├── /our-new-office/construction-updates  ○  Dated update feed
│   ├── /our-new-office/office-features       ○
│   ├── /our-new-office/technology            ○
│   ├── /our-new-office/planned-hours         ○
│   └── /our-new-office/opening-faq           ○
│
├── /patient-resources                        ○
│   ├── /patient-resources/dental-emergency-information  ○
│   ├── /patient-resources/post-operative-instructions   ○
│   └── /patient-resources/referring-providers           ○
│
├── /blog                                     ○
│   ├── /blog/a-new-dental-office-is-coming-to-rehoboth-beach  ○
│   ├── /blog/why-we-chose-the-plantations-road-location       ○
│   └── /blog/what-to-expect-from-the-new-office               ○
│
├── /contact                                  ○  Email, address, map, inquiry form
│   └── /contact/directions                   ○  Routes, parking, accessibility
│
├── /opening-list                             ○  PRIMARY CONVERSION
├── /careers                                  ○
├── /site-map                                 ○  HTML site map
│
├── /thank-you/opening-list                   ◐  noindex, excluded from XML sitemap
├── /thank-you/inquiry                        ◐  noindex, excluded from XML sitemap
│
├── /privacy-policy                           ○
├── /website-terms                            ○
├── /accessibility-statement                  ○
├── /website-disclaimer                       ○
└── /404 (not-found)                          ◐  Custom, with recovery links

Machine routes:  /sitemap.xml  /robots.txt  /manifest.webmanifest
API routes:      /api/opening-list  /api/inquiry   (POST only, noindex, disallowed)
```

**42 indexable URLs. 50 routes total. Every page prerendered as static HTML.**

### Not built, on purpose

- **Nearby-community pages** (`/rehoboth-beach-dentist`, `/lewes-dentist`, …). The brief prohibits thin duplicated city pages. Build only when each carries genuinely unique content: real driving directions, access notes, and local questions. Suggested route pattern `/dentist/[community]`.
- **Individual service-detail pages** below the category level (e.g. `/services/dental-implants/full-arch`). Build after services are confirmed and there is enough distinct content to justify a page.

---

## 2. Pre-opening user journeys

### J1 — "Is a new dentist opening near me?" (primary, highest volume)

> Local resident sees construction on Plantations Road, or searches "new dentist Rehoboth Beach".

1. Lands on `/` from search or a Google Business Profile pre-opening listing.
2. Announcement bar answers the question in the first line, above the fold.
3. Hero confirms location and the anticipated window, with the qualifier attached.
4. Quick info bar gives status, window, planned hours, address, affiliation in one scan.
5. Scrolls to Opening FAQ, which answers "can I book yet?" directly.
6. **Converts on the inline opening-list form (§12) without leaving the page.**
7. Lands on `/thank-you/opening-list`, offered construction updates and planned services.

**Designed for:** answering the question before asking for anything. The form
appears after the answers, not before.

### J2 — "I need a new dentist and I'm evaluating this one"

> New resident or someone leaving a current practice.

1. `/` → `/services` to check the practice does what they need.
2. Notices every service is labelled **Planned**, and the tier explainer says why.
3. → `/about/our-approach` for how the practice will actually operate.
4. → `/team`: finds an honest explanation instead of stock photos. *This is a trust event, not a dead end.*
5. → `/new-patients/insurance-and-financing`, sees an honest "not confirmed yet".
6. Converts at `/opening-list`, selecting a service interest.

**Designed for:** a sceptical, design-literate audience. Every unconfirmed thing
is labelled, which is the differentiator against competitors who overstate.

### J3 — "I have a dental emergency right now" (urgent, low volume, high stakes)

1. Searches "emergency dentist Rehoboth Beach", lands on
   `/patient-resources/dental-emergency-information` or `/services/emergency-dentistry`.
2. **First element on the page** is a red-bordered block: we are not open, call
   911 for a life-threatening emergency, contact an established provider or an
   appropriate emergency service.
3. General first-aid guidance, then routes to hospital / urgent care / directories.
4. Secondary, non-urgent: join the list for when emergency care begins.

**Designed for:** getting the visitor to appropriate care fast. Conversion is
explicitly not the goal of this page.

### J4 — "I'm a clinician looking for a job"
`/careers` (or `/team` → Careers) → honest market notes including housing and
seasonality → email with subject "Careers".

### J5 — "I'm a referring provider"
`/patient-resources/referring-providers` → what we will and will not do with a
referral → email introduction.

### J6 — "I'm watching the build"
`/` §7 → `/our-new-office/construction-updates` → dated feed + milestone
timeline → opening list for updates by email.

---

## 3. Post-opening journeys (built, dormant behind flags)

| Journey | Route once `openingStatus: 'open'` |
|---|---|
| Book a first visit | `/` → `/new-patients` → Request an Appointment → scheduling |
| Emergency, same day | Emergency page → click-to-call → triage |
| Existing patient admin | `/patient-resources` → forms / pay online |
| Service research | `/services/[slug]` (now tier `confirmed`, with a booking CTA and `Service` schema) |
| Choose a provider | `/team` → `/team/[provider]` → book with that provider |

The CTA labels, mobile action bar, header phone slot, and structured data all
switch automatically from `src/config/practice.ts`. No page needs rewriting.

---

## 4. Conversion strategy

### Pre-opening priority

| Rank | Action | Where it appears | Event |
|---|---|---|---|
| 1 | **Opening-list submission** | Header CTA (every page), home §12 inline form, `/opening-list`, every page's closing CTA band, sidebar of every prose page, mobile action bar | `opening_list_form_submit` |
| 2 | Email inquiry | Header, footer, contact page form, mobile bar | `general_inquiry_form_submit`, `email_click` |
| 3 | Directions click | Home §10, contact, directions, mobile bar | `directions_click` |
| 4 | Planned-service exploration | Home §6, `/services`, related-service links | `planned_service_click` |
| 5 | Affiliation engagement | Home §9, `/about/freedom-dental-health` | `freedom_dental_health_click` |

### Design rules applied

- **One primary CTA per view.** The opening list is the only primary action. Everything else is visibly secondary.
- **The ask comes after the answer.** The home page places the inline form at §12, after the FAQ has addressed "can I book yet?".
- **Nothing inactive is ever rendered.** No greyed-out booking button, no phone icon without a number, no `href="#"`.
- **Short form.** Two required fields plus one required consent box. Everything else optional.
- **Consent never pre-selected**, and email and SMS permissions are separate.
- **Dedicated thank-you pages**, both noindex, so the conversion is measurable as a pageview as well as an event.
- **No response-time promise** anywhere, because no internal service standard has been confirmed.

### What deliberately reduces short-term conversion

Labelling everything "planned", publishing a "not confirmed yet" insurance page,
and running an empty team page all cost some immediate signups. They are the
correct trade for a practice that has to be believed on the day it opens.
