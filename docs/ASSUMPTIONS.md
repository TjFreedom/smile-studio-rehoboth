# Project Assumptions and Decisions

Every judgement call made during the build, and the reasoning behind it. Anything
here that turns out to be wrong should be corrected before launch.

---

## 1. Decisions that departed from the brief

### 1.1 Practice name: "Smile Studio of Rehoboth", not "Rehoboth Smile Studio"

**The conflict.** The build brief specified the working name *Rehoboth Smile
Studio*. Brand Guidelines v1.0 page 23 (Style Quick Reference) states the
practice name is **"Smile Studio of Rehoboth"** and adds, verbatim: *Never
"Rehoboth Smile Studio."* The finalised logo lockups read
`SMILE STUDIO of REHOBOTH DENTISTRY`.

**Resolution.** Raised with the requester on 2026-08-19 and confirmed:
use **Smile Studio of Rehoboth**.

**Why it mattered enough to ask.** Using the brief's name would have produced a
header where the logo artwork and the adjacent headline disagreed, on every page.

**How it is implemented.** `practiceName` in `src/config/practice.ts`. Changing
that one value renames the practice across every page, title tag, meta
description, JSON-LD node, and email template. No copy hard-codes the name.

### 1.2 Parent organisation attribution

The brief specified "Freedom Dental Health" and "A Freedom Dental Health
Practice". The brand guide's boilerplate uses "Freedom Dental Health System" and
marks the exact attribution wording as `[TO CONFIRM]`. Because the guide leaves
it open and the brief states it as confirmed, the brief wins. Confirmed with the
requester. Set in `parentOrganization` and `affiliationLabel`.

### 1.3 Domain

The brand guide references `smilestudiorehoboth.com` and marks the final domain
`[TO CONFIRM]`. The brief states `https://www.rehobothsmiles.com` as confirmed,
so that is the canonical domain throughout. **If the domain decision is
reopened, note that the brand guide's own boilerplate and page footers currently
print a different address.** Worth reconciling before any print collateral runs.

### 1.4 Mist Gray darkened for body-adjacent text

Brand Guide §3 assigns Mist Gray `#7A8899` to captions, metadata, and form
hints. Measured against Shoreline White it is **3.36:1**, below the 4.5:1
minimum the same guide commits to in its Accessibility section, and the guide
notes a large share of patients will be over 60.

The token was darkened within the same hue to `#657384` (4.84:1 on white,
4.50:1 on Shoreline White). The original value is retained as `--mist-brand`
for non-text decorative use. **Raise with the Director of Marketing &
Communications for Brand Guide v1.1.**

---

## 2. Content assumptions

| # | Assumption | Basis | Risk if wrong |
|---|---|---|---|
| 2.1 | No service is confirmed. Every service is tier `planned`. | No clinical sign-off exists. | None. Confirming a service is a one-word change. |
| 2.2 | No provider information exists, so Meet the Team is hidden and no content carries a provider byline. | No roster confirmed. | None. |
| 2.3 | The practice cannot see emergency patients today. | Office under construction. | None. Emergency page redirects to other care. |
| 2.4 | No insurance plan is accepted until a contract is verified. | Brand Guide §10 requires substantiation. | None. |
| 2.5 | No technology is installed. | Build-out in progress. | None. |
| 2.6 | Parking and accessibility are undescribed. | Cannot be verified on an unfinished site. | None, and publishing a guess would be the real risk. |
| 2.7 | Weekend hours do not exist. Saturday and Sunday show "Not yet determined". | Only Mon–Fri was confirmed. | None. |
| 2.8 | No testimonials, reviews, ratings, or case photography anywhere. | No patients treated. | None. |

## 3. Technical assumptions

| # | Assumption | Action if wrong |
|---|---|---|
| 3.1 | Hosting is a single Node instance or a platform with its own edge rate limiting. | The in-memory limiter in `src/lib/rate-limit.ts` is per instance. On serverless or multi-instance hosting, swap for a shared store. Flagged in the file and in the launch checklist. |
| 3.2 | Transactional mail goes through Resend. | Replace `send()` in `src/lib/mailer.ts`. Nothing else changes. |
| 3.3 | `www` is the canonical host and the three redirect variants are configured at the DNS/host layer. | Next.js cannot redirect a host it never receives. Must be done at the platform. See launch checklist. |
| 3.4 | `NEXT_PUBLIC_ALLOW_INDEXING` is set to `true` **only** on production. | If unset anywhere else, that deploy is noindex plus an empty sitemap, which is the safe failure direction. |
| 3.5 | A cookie consent platform will call `gtag('consent','update',…)`. | Until it does, Consent Mode stays denied and no analytics storage is written. Correct but conservative. |
| 3.6 | Geo coordinates are approximate and therefore excluded from structured data. | Add verified coordinates and set `geoIsVerified` after the Google Business Profile pin is confirmed. |

## 4. Copy and voice conventions applied

Drawn from Brand Guidelines §7 and §8 and applied throughout:

- **No em dashes.** Commas, colons, or a new sentence instead (§7 Style Quick Reference).
- **Oxford comma** always.
- **No nautical puns or beach kitsch.** The coastal identity is carried by design, not wordplay.
- **No superlatives without proof.** "State of the art", "best", "world class", and "award winning" appear only where the site explicitly disclaims them.
- **No guarantee language.** No promise of a pain-free experience, a treatment duration, a lifetime result, or an insurance outcome.
- **"Planned" labelling** on everything unconfirmed.
- Plain language first, technical terms defined on first use.
- British-influenced spellings ("organised", "labelled", "recognised") appear in a few places from drafting. **Standardise to US spelling before launch** — see the launch checklist.

## 5. Things deliberately NOT built

| Not built | Why |
|---|---|
| Appointment calendar or booking widget | No scheduling system exists. A non-functional booking UI is worse than none. |
| Click-to-call anywhere | No phone number assigned. |
| Countdown timer to opening | No exact date, and the brief prohibits it. |
| Nearby-community landing pages (Lewes, Milton, etc.) | The brief prohibits thin duplicated city pages. These should be built only when each carries genuinely unique content. Route pattern is documented in the SEO map. |
| Cookie consent banner UI | Whether one is legally required is a decision for counsel. Consent Mode defaults to denied so the site is compliant either way, and a CMP can be dropped in. |
| Live chat, patient portal, payment portal | No operational system behind any of them. |
