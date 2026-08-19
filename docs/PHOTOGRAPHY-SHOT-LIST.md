# Photography Shot Lists

Brand Guidelines §5 governs style. The single most important rule for this
build: **no stock photography of a dental office may ever be presented as this
office.** Every placeholder on the site is labelled internally rather than
filled with a stand-in, for exactly this reason.

Style, in one line: bright, calm, coastal, genuinely human. Expose bright,
natural light, clean uncluttered backgrounds, cool-neutral whites, true-to-life
skin tones, no heavy filters, no black-and-white for marketing use.

---

## Technical specification

| Use | Ratio | Minimum width | Format |
|---|---|---|---|
| Desktop hero | 16:9 or 3:2 | 2400px | AVIF/WebP via `next/image` |
| Mobile hero | 4:5 | 1200px | AVIF/WebP |
| Provider portrait | 4:5 | 1200px | AVIF/WebP |
| Service card | 4:3 | 1200px | AVIF/WebP |
| Office gallery | 4:3 and 3:2 | 2000px | AVIF/WebP |
| Construction update | 3:2 | 2000px | AVIF/WebP |
| Social sharing | 1.91:1 | 1200×630 | PNG/JPG |
| Instagram feed | 1:1 | 1080×1080 | JPG |
| Stories / Reels | 9:16 | 1080×1920 | JPG |

Deliver RAW plus edited. Every image needs alt text written at delivery, not
retrofitted. Every person needs a signed release before the shutter (§10).

---

## A. Pre-opening shot list (commission now)

### A1 — Exterior and site *(highest priority)*
1. Building exterior from the road, showing the approach a patient will actually make
2. Building exterior, wider, showing it in the professional park context
3. Entrance to the building
4. The suite entrance
5. Signage location before installation, then after
6. Parking area, showing proximity to the entrance
7. Plantations Professional Park signage and the road approach
8. Golden-hour exterior for hero use

### A2 — Construction progress *(shoot monthly, same angles each time)*
9. Wide interior, pre-drywall, showing the footprint
10. Reception area under construction
11. Operatory framing, one consistent angle repeated across visits
12. Mechanical, plumbing, and electrical rough-in
13. Drywall and paint stages
14. Cabinetry and millwork installation
15. Equipment delivery and installation
16. Flooring installation
17. Final fit-out

> Repeating the same angle every visit produces a genuinely compelling
> before-and-after sequence at opening. It costs nothing extra and cannot be
> recreated later.

### A3 — People and process
18. Provider or leadership site visits, hard hats, real moments
19. Team planning sessions
20. Equipment selection or plan review
21. Contractors at work, respectfully framed

### A4 — Context and community
22. Rehoboth Beach architectural details, restrained and non-touristy
23. Route 1 and Plantations Road context
24. Seasonal coastal imagery, off-season as well as summer

### A5 — Renderings
25. Approved architectural renderings of reception, operatories, and exterior.
    **Must be labelled as renderings wherever they appear.**

---

## B. Completed-office shot list (shoot before opening day)

The brand guide is right that for a practice named "Studio", the space is a
primary marketing asset. Commission this properly, before opening, not after.

### B1 — Arrival
1. Exterior with completed signage, day
2. Exterior, dusk, lit signage
3. Building entrance
4. Parking, including accessible spaces
5. Accessible entrance and route
6. Suite door and wayfinding

### B2 — Interior
7. Reception desk, staffed, warm
8. Waiting area, wide
9. Waiting area, detail: seating, materials, light
10. Hallway toward the operatories
11. Operatory, wide, clean and uncluttered
12. Operatory, detail: chair, light, monitor
13. Consultation area
14. Sterilisation area *(a strong trust signal, rarely photographed)*
15. Restroom, if presentable
16. Any architectural or design feature worth showing

### B3 — Technology
17. Digital scanner in use
18. Intraoral camera in use
19. Digital X-ray review on screen with a patient
20. Any chairside technology, **only if actually installed**

### B4 — People *(releases required)*
21. Individual provider headshots, 4:5, mid-chest to top of head, eyes in the upper third, soft neutral or blurred practice background at f/2.8–f/4
22. Full team group photograph
23. Clinical team candids
24. Front desk welcome
25. Provider explaining a treatment plan to a patient
26. Hygiene appointment in progress
27. Consultation conversation
28. Patient departing at reception

### B5 — Diversity requirement
Across the set, deliberately include patients over 60, a range of ages, races,
and genders, and at least one image reflecting a patient with a mobility aid.
Sussex County skews older and the photography should look like the actual
catchment, not a generic dental stock library.

---

## C. Prohibited

- Any stock photograph of a dental office, presented as this office
- Extreme close-ups of open mouths
- Exaggerated toothpaste-advertisement smiles
- Drills mid-procedure
- Decay, distress, or any fear-based imagery
- Anchors, ship wheels, rope borders, weathered driftwood, or lighthouse stock that is not our lighthouse
- Cluttered backgrounds, visible cords, competitor-branded products
- Any patient without a signed release
- Before-and-after case photography without its own specific clinical-image release

---

## D. Current placeholder inventory

Every location awaiting real photography, with the replacement required. All are
marked in code with `<PlaceholderNote>` and are visible on staging.

| Location | Needed |
|---|---|
| Home hero | Rendering or construction photograph. Currently a branded visual treatment using the icon mark, which is honest: it does not pretend to be a photograph of anything. |
| Home §7, construction progress | Progress photography |
| `/our-new-office` | Renderings and progress photography |
| `/our-new-office/construction-updates` | Per-update images in `src/content/construction.ts` |
| `/our-new-office/office-features` | Completed-office photography |
| `/team` | Provider headshots. Page is hidden until they exist. |
| Service pages | Optional supporting imagery |
| `/about/community` | Community involvement photography |
