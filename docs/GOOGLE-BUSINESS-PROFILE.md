# Google Business Profile Readiness

For a local dental practice, the Business Profile is usually a larger source of
patient contact than the website itself. This is the pre-opening plan and the
copy to use.

---

## 1. Eligibility, and the honest position

Google requires a business to be **open, or opening within 90 days**, to create
a profile, and staffed and able to receive customers at the address.

Anticipated opening is late November or early December 2026. **Do not create the
profile before roughly late August or early September 2026**, and only once the
opening window is firm enough to survive verification. Verification typically
involves postcard, phone, video, or email, and a postcard needs someone able to
receive mail at the address.

Creating it too early risks a suspension, and a suspended profile is materially
harder to recover than a late one. **Final publication must follow Google's
current eligibility rules at the time of submission.**

## 2. NAP consistency

The single most important technical detail. These must match **character for
character** everywhere: website, JSON-LD, Business Profile, social profiles,
directories, and any future scheduling platform.

> ### STOP — the street name is not settled
>
> The practice's FINAL postcard prints **19411 Plantation Road** (singular).
> The original brief, this website, and 44 other places in the codebase use
> **19411 Plantations Road** (plural). One of them is wrong.
>
> **Do not submit to Google, Apple, Bing, Yelp, or any aggregator until this is
> verified** against the lease, the USPS address database, or the county parcel
> record. This is not pedantry: the address you first submit propagates to the
> data aggregators (Data Axle, Foursquare, Neustar) that feed hundreds of
> downstream directories. Correcting it afterwards means re-submitting to each
> one and waiting out their refresh cycles, and in the meantime Google sees two
> competing addresses for the same practice and trusts neither.
>
> Settle it once, then use the exact string below everywhere.

```
Name:     Smile Studio of Rehoboth
Street:   19411 Plantations Road, Suite 1     [VERIFY "Plantations" vs "Plantation"]
City:     Rehoboth Beach
State:    DE
ZIP:      19971
Website:  https://www.rehobothsmiles.com
Email:    info@rehobothsmiles.com
Phone:    (302) 715-0020
```

**Phone confirmed 2026-10-21** from the practice's own FINAL postcard and
coming-soon sign, and now live on the website. Use this exact number and this
exact formatting everywhere.

**Suite 1 confirmed 2026-10-21** from the same postcard.

**Do not enter a personal mobile, a construction-office line, or a Freedom
Dental Health central number instead.** A phone number in the profile becomes a
citation that propagates across data aggregators, and changing it later degrades
local ranking.

**One further warning specific to this practice.** The exterior building
directory photographed on site reads **"Freedom Dental"** under Suite 1, while
every piece of marketing says **Smile Studio of Rehoboth**. Google's reviewers
compare the name you submit against photographic and street-level evidence, and
a mismatch is a common cause of verification failure and suspension. Decide
which name goes on the door *before* submitting, not after.

## 3. Categories

**Primary:** `Dentist`

**Secondary (only once the corresponding service is confirmed):**
`Cosmetic Dentist` · `Emergency Dental Service` · `Dental Implants Periodontist`
(only if implants are placed on site) · `Teeth Whitening Service` ·
`Denture Care Center`

Do **not** add `Orthodontist`, `Endodontist`, `Periodontist`, `Oral Surgeon`, or
`Pediatric Dentist` unless a provider holding that recognised specialty
credential practises at this location. Brand Guide §10 and Delaware advertising
rules both prohibit implying specialty status that is not held.

## 4. Business description (750 char limit)

**Use verbatim once opening is within 90 days.** 712 characters:

> Smile Studio of Rehoboth is a new dental practice in Rehoboth Beach, Delaware,
> at 19411 Plantations Road in Plantations Professional Park. We provide
> comprehensive, patient-centered dentistry for families, year-round residents,
> and visitors to the Delaware shore, serving Rehoboth Beach, Lewes, Dewey
> Beach, Milton, Harbeson, Long Neck, and Millsboro. Our approach is
> straightforward: unhurried appointments, findings explained in plain language,
> and written costs before any treatment is scheduled. The office is
> conveniently located just off the Coastal Highway and Route 1 corridor, with
> access from Route 24 and Route 9. Smile Studio of Rehoboth is a Freedom Dental
> Health Practice.

**Short description / social bio:**
> Modern, comfortable dentistry at the Delaware shore. Families, residents, and visitors welcome. Rehoboth Beach, DE.

## 5. Services to list

Only services confirmed by clinical leadership. Until then, list none.
When confirmed, add with short descriptions drawn from the matching
`/services/[slug]` page so the wording is consistent everywhere.

## 6. Hours

- Before opening: use Google's **"Opening soon"** state with the opening date, only once the date is confirmed. Do not enter the planned hours as operating hours.
- At opening: enter verified hours, including any lunch closure. Weekend hours only if actually offered.
- Set holiday hours in advance. Missing holiday hours is one of the most common causes of a bad first review.

## 7. Photography at launch

Ordered by impact. See `docs/PHOTOGRAPHY-SHOT-LIST.md`.

1. **Exterior with signage**, so patients recognise the building from the road.
2. **Building entrance**, ideally showing the accessible route.
3. **Parking**, which is a genuine differentiator in a resort town.
4. **Reception and waiting area.**
5. **A treatment room**, clean and uncluttered.
6. **Provider and team photographs**, with signed releases.
7. **Logo** — vertical lockup as the profile image, per Brand Guide §6.
8. **Cover** — exterior or reception.

No stock photography, ever. Patients recognise it and trust drops.

## 8. Posts

**Before opening:** an opening announcement, construction progress, provider
introductions, a "what to expect" post, and an opening-list invitation.

**At opening:** now open, first-week welcome, services now available, meet the
team, insurance information.

Every post should link to the matching page with UTM parameters so Business
Profile traffic is attributable.

## 9. Q&A

Seed the Q&A section with real questions and post the answers from the practice
account. Draw them from `/our-new-office/opening-faq` so the answers match the
website exactly:

- When are you opening?
- Where exactly are you located?
- Are you accepting new patients?
- What insurance do you accept?
- Do you see children?
- Do you handle dental emergencies?
- Is there parking?

## 10. Reviews

**Do not solicit any review before the practice has treated patients.** Review
gating and incentivised reviews violate Google's policies and, for a healthcare
practice, create a regulatory problem as well.

When review requests begin, note the Brand Guide §10 rule that is most often
broken: **never confirm or deny that a reviewer is a patient in a public
response.** That is the most common HIPAA exposure in local dental marketing.
All responses are drafted or approved by the Director of Marketing &
Communications.

## 11. Before publishing the profile, confirm

- [ ] Opening is within Google's eligibility window and the date is firm
- [x] Public phone number assigned — **(302) 715-0020**. Still confirm it is active and answered during the hours the profile advertises, before the profile goes live.
- [ ] **Street name verified** ("Plantations" vs "Plantation") against the lease or USPS
- [ ] **Name on the exterior signage reconciled** with the name being submitted
- [ ] Suite number confirmed
- [ ] Someone can receive verification at the address
- [ ] Name, address, and website match the site character for character
- [ ] Categories reflect only confirmed, credentialed services
- [ ] At least eight approved photographs, none of them stock
- [ ] Description approved by Marketing
- [ ] Hours verified
- [ ] `externalLinks.googleBusinessProfile` and `googleMaps` set in `src/config/practice.ts` (this also populates `sameAs` and `hasMap` in structured data)
- [ ] `geoIsVerified` set to true once the map pin is confirmed, which enables `geo` in structured data
