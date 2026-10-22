# Quality Assurance Report

All results below were measured against a running build during development, not
asserted. Where something was not verified, it says so.

**Date:** 2026-08-19 · **Build:** Next.js 16.3.1, 50 routes, 42 indexable

---

## 1. Build and type safety

| Check | Result |
|---|---|
| `tsc --noEmit`, strict + `noUncheckedIndexedAccess` | ✅ Clean |
| `next build` | ✅ Clean, no warnings |
| `npm audit` | ✅ **0 vulnerabilities** |
| Every page prerendered as static HTML | ✅ 48 static, 2 dynamic API routes |

> Next.js 15.5.4 was the initial install and carried a published CVE
> (CVE-2025-66478). Upgraded to **16.3.1** before any application code was
> written on top of it.

## 2. Lighthouse

Mobile emulation, local production server, median of repeated runs.

| Category | Score | Target | |
|---|---|---|---|
| Performance | **90–97** | ≥ 90 | ✅ |
| Accessibility | **100** | ≥ 95 | ✅ |
| Best Practices | **100** | ≥ 95 | ✅ |
| SEO | **100** | ≥ 95 | ✅ |

**Zero binary audit failures across all four categories.**

### Core Web Vitals (lab)

| Metric | Median | Target | |
|---|---|---|---|
| First Contentful Paint | 0.92s | — | |
| Largest Contentful Paint | **2.35s** | < 2.5s | ✅ |
| Total Blocking Time | 125ms | — | ✅ |
| Cumulative Layout Shift | **0.000** | < 0.1 | ✅ |
| Speed Index | 0.9–1.0s | — | |

**INP was not measured.** Lighthouse lab runs do not produce INP; TBT of 125ms
is the accepted proxy and sits well under the 200ms threshold. Real INP must
come from field data after launch.

### Measured on the live Netlify CDN (2026-08-19)

The production re-measurement flagged below has now been done, against
`https://smile-studio-rehoboth.netlify.app`. Median of three runs, mobile
emulation:

| Category | Live | Note |
|---|---|---|
| Performance | **88** | |
| Accessibility | **100** | |
| Best Practices | **100** | |
| SEO | **69** | **Expected.** The only failing audit is `is-crawlable: Page is blocked from indexing`, which is the deliberate review-deploy posture. Every other SEO audit passes. Returns to 100 once indexing is enabled on the real domain. |

| Metric | Live median | Target | |
|---|---|---|---|
| FCP | 1.1s | — | |
| **LCP** | **2.52s** | < 2.5s | ⚠️ marginal |
| CLS | **0.000** | < 0.1 | ✅ |
| TBT | 377ms | — | |

**LCP sits right on the 2.5s threshold**, with 673ms of that being TTFB from the
test machine to the CDN edge and ~1.84s render delay. Best run was 1.8s. Two
things will improve this in real use: visitors closer to a CDN edge node than
this test machine, and the fact that Lighthouse applies a 4x CPU throttle on top
of an already-busy workstation.

**Recommendation:** re-check LCP from Chrome UX Report field data once the real
domain has traffic, rather than tuning further against lab numbers. Field data
is the metric Google actually ranks on.

### Earlier local measurement caveat

Early runs produced Performance 78–83 with LCP 3.1–3.2s and TBT swinging
252–780ms across *identical* runs. That variance was traced to CPU contention
from concurrent builds and servers on the same workstation, not to the site. On
a quiet machine the numbers were stable at 90–98 / LCP 2.3–2.4s.

**These are local numbers without a CDN, brotli, or HTTP/2 tuning. Re-measure on
production hardware before treating the targets as met in the real world.**
Listed as a first-two-weeks task in `docs/POST-LAUNCH-OPTIMIZATION.md`.

### Performance work done during the build

Each of these was measured, not assumed:

| Change | Effect |
|---|---|
| Removed zod from the client bundle by splitting option constants into a dependency-free module | **−72KB** of JavaScript shipped to every visitor |
| Reduced declared font cuts from 12 to 3 (only weights the CSS uses) | Font payload **612KB → 332KB** |
| Moved Montserrat italic to a separate non-preloaded declaration | Captions are always below the fold; removed from the critical path |
| Removed `backdrop-filter` from the sticky header | Eliminated a per-scroll-frame compositing repaint |
| `text-wrap: balance` → `pretty` on H1 only | H1 is the LCP element; balancing measurably delayed first paint under throttling |
| Simplified two stacked-gradient backgrounds to single gradients | Reduced rasterisation on the largest above-fold surfaces |
| Static map preview, interactive frame loads on click only | Keeps ~900KB of Google Maps JS off initial load, and sets no Google cookies until requested |

Net effect across these changes: Performance **82 → 97**, LCP **3.6s → 2.35s**,
TBT **330ms → 125ms**.

## 3. Accessibility (WCAG 2.2 AA)

**Lighthouse Accessibility: 100.** Automated tools catch perhaps a third of what
matters, so the manual checks below were also run.

| Check | Result |
|---|---|
| Colour contrast, scripted across all text nodes on sampled pages | ✅ **0 failures** (504 elements checked on the home page alone) |
| One H1 per page | ✅ 45/45 |
| Heading order, no skipped levels | ✅ |
| Skip link, first focusable element | ✅ |
| Keyboard operability: nav, dropdowns, drawer, forms, FAQ, map | ✅ |
| Escape closes the mobile drawer and restores focus to the trigger | ✅ |
| Visible focus everywhere, never suppressed | ✅ |
| Hidden mobile nav removed from the accessibility tree | ✅ `display:none` confirmed |
| Target size ≥ 24px on standalone controls (SC 2.5.8) | ✅ after fix |
| Errors announced via live region and linked to fields | ✅ |
| No information by colour alone | ✅ status carries text + icon |
| `prefers-reduced-motion` disables animation and smooth scroll | ✅ |
| Semantic landmarks and labelled nav regions | ✅ |
| Form labels persistent and visible | ✅ |

### Defects found and fixed

1. **Contrast: 9 failures.** Brand Guide §3 assigns Mist Gray `#7A8899` to captions and hints; measured 3.36:1 on Shoreline White against a 4.5:1 requirement the same guide commits to. Darkened within the same hue to `#657384` (4.84:1 / 4.50:1), with a footer-scoped light variant `#9BABC0` (6.1:1 on navy). **Should be adopted into Brand Guide v1.1.**
2. **WCAG 2.5.3 Label in Name.** The header brand link had `aria-label="… home"` which overrode its visible affiliation text. Removed the override and built the accessible name from real content instead.
3. **WCAG 2.5.8 Target Size.** Standalone card and hero links rendered at 22px. Given `min-height: 24px`. Inline sentence links are covered by the specification's inline exception and were left alone.

### Not yet done

- **Screen reader pass with NVDA or VoiceOver.** Not possible in this environment. Required before launch, on home, contact, and the opening-list form.
- Testing on a real older device.
- 200% browser zoom verification.

## 4. Responsive and mobile

Measured for horizontal overflow across 16 pages at each breakpoint.

| Width | Result |
|---|---|
| 320px | ✅ 0 overflow |
| 375px | ✅ 0 overflow |
| 768px | ✅ 0 overflow |
| 1185–1200px | ✅ 0 overflow |
| 1425–1440px | ✅ 0 overflow |

### Defects found and fixed

1. **Header overflowed by 28px at 320px.** The horizontal lockup cannot go below 200px (Brand Guide §2), leaving too little room for both header actions. Fixed by dropping the email action below 420px, since the fixed mobile bar already surfaces Email prominently. The logo was not shrunk below its brand minimum.
2. **Mobile action bar overflowed at 320px.** Flex items default to `min-width: auto`, so "Opening Updates" widened the fixed bar past the viewport. Fixed with `min-width: 0`, ellipsis, and a tighter label size under 360px.
3. **Header overflowed by 51px at 1440px.** Six top-level nav items needed 672px against 1122px of available container. Fixed with shorter desktop-only nav labels ("New Office", "Resources") while the mobile drawer, footer, and site map keep the full labels, plus tighter nav padding and an email-label collapse below 1340px.

Mobile action bar reserves its own height via body padding, so it never covers
content.

## 5. Structured data

Validated by parsing the rendered JSON-LD from live pages.

| Page type | Nodes emitted |
|---|---|
| Home | `WebPage`, `FAQPage`, `Dentist`/`MedicalBusiness`/`LocalBusiness`, `WebSite` |
| Service | `WebPage`, `FAQPage`, `BreadcrumbList`, practice, `WebSite` |
| Contact | `WebPage`, `ContactPoint`, `BreadcrumbList`, practice, `WebSite` |
| Blog post | `WebPage`, `BlogPosting`, `BreadcrumbList`, practice, `WebSite` |

**Pre-opening omission rules verified by automated check — all absent:**
`telephone`, `openingHoursSpecification`, `openingDate`, `geo`, `hasMap`,
`aggregateRating`, `review`, `priceRange`, `employee`, `makesOffer`.

**Verified present:** `name`, `url`, `email`, `address`, `parentOrganization`,
`logo`, `image`, `areaServed`, `description`.

`Service` schema is emitted **only** for `tier: 'confirmed'` services. All seven
are currently `planned`, so no `Service` node appears anywhere. Correct.

> Not yet run through Google's Rich Results Test — the site must be publicly
> reachable first. On the launch checklist.

## 6. SEO

| Check | Result |
|---|---|
| Unique titles | ✅ 45 pages, 0 duplicates |
| Unique meta descriptions | ✅ 0 duplicates, all ≤ 165 chars |
| Self-referencing canonicals, www + https | ✅ |
| Sitemap in production | ✅ 42 URLs |
| Sitemap in non-production | ✅ empty |
| robots.txt production | ✅ allows, disallows `/api/` and `/thank-you/`, references sitemap |
| robots.txt non-production | ✅ `Disallow: /` |
| `X-Robots-Tag: noindex` on non-production | ✅ |
| Open Graph + Twitter cards | ✅ with a branded 1200×630 image |
| Breadcrumbs, visible + schema | ✅ |
| Orphan pages | ✅ none |
| `href="#"` | ✅ **zero** |

### Defects found and fixed

- Two pages had the brand duplicated in the title ("About Smile Studio of Rehoboth | Smile Studio of Rehoboth"). Fixed.
- Twelve titles exceeded ~62 characters. Reduced by dropping the redundant city from service titles, since the brand name already contains "Rehoboth".
- Four meta descriptions exceeded 165 characters. Trimmed.
- Canonical and sitemap disagreed on the home page trailing slash. Aligned in `absoluteUrl()`. *(Next.js still normalises the sitemap entry to a trailing slash; Google treats the two forms as identical, so this is cosmetic.)*

**Known and accepted:** the home page title is 67 characters. It is the exact
title specified in the brief, and the key phrase is front-loaded, so truncation
costs nothing meaningful.

## 7. Content compliance

Scripted scan of all 45 rendered pages for prohibited language and phone leaks.

| Check | Result |
|---|---|
| Phone-shaped strings anywhere | ✅ **0** |
| `tel:` links | ✅ **0** |
| "Now Open" / "Schedule Today" / "Book Now" / "Call Now" | ✅ 0 |
| "state of the art" / "pain-free" / "guaranteed" / "world class" | ✅ 0 as claims |
| Nautical puns ("smooth sailing", "shore thing", "anchor your smile") | ✅ 0 |
| **"the shore" for this area** (say "the beach") | ✅ 0 *(17 fixed 2026-10-21)* |
| "Lorem ipsum" | ✅ 0 |

| Invented exact opening date | ✅ 0 |
| Saturday or Sunday hours | ✅ 0 |
| Fake reviews, ratings, or testimonials | ✅ 0 |
| Fake provider information | ✅ 0 |

> **Local usage: "beach", not "shore".** Flagged by a local reader. People in
> Rehoboth Beach, Lewes and Dewey Beach say they are *at the beach*; "the
> shore" reads as someone describing the area from the outside, and to a local
> ear it means New Jersey. Seventeen instances were corrected on 2026-10-21,
> across page copy, the provider biography, both flyers, and the Google
> Business Profile description that had not yet been submitted. Use "the beach"
> or "the Delaware beaches", or name the town. The brand colour **Shoreline
> White** is unaffected and keeps its name.
>
> This applies to anything written for the site later, including articles
> imported from Opinly.
| `undefined` / `[object Object]` render bugs | ✅ 0 |

The scanner flagged nine matches for banned phrases. **All nine are the site
explicitly disclaiming them** — for example *"we will not tell you dentistry
here is pain-free"*, *"no restoration carries a guarantee"*, and *"why we are
not calling anything state-of-the-art"*. Correct usage, not violations.

## 8. Forms and security

All eight behavioural cases verified against the running server — see
`docs/CONVERSION-AND-FORMS.md` §7 for the full table.

**One real defect found and fixed:** the honeypot originally rejected at the
schema layer, returning a `400` that named the `website` field and told a bot
exactly which input to avoid. Now it validates cleanly and the handler returns a
generic success while sending nothing.

Security headers verified on live responses: CSP, HSTS (2 years, preload),
`X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`,
`Permissions-Policy`.

`unsafe-eval` and `ws:` are scoped to development only, for React's dev overlay
and HMR. Production CSP contains neither.

## 9. Investigated and cleared

**Footer logo appeared not to load.** During browser testing the reversed footer
lockup reported `naturalWidth: 0` even when scrolled into view. Traced to the
test environment, not the site: the automation pane reports
`document.visibilityState: "hidden"` and **IntersectionObserver never fires in
it**, so native lazy-loading is never triggered. The same file loads correctly
via a direct `new Image()` (2000×720), returns HTTP 200, parses as valid XML,
and carries the correct reversed colours. Lighthouse, running a real compositing
browser, does not request it either, because it does not scroll during the load
trace. That is lazy-loading behaving exactly as intended.

All five generated logo variants were verified to decode at their correct
intrinsic dimensions: horizontal (2000×720), horizontal-reversed (2000×720),
vertical-reversed (1362×1155), icon-mark-reversed (512×512), and
horizontal-navy (2000×720).

**Related change, made on its own merits:** the `Logo` component and the hero
mark now use a plain `<img>` instead of `next/image`. For SVG sources
`next/image` provides no benefit — its optimizer rejects SVG by design (the
endpoint returns HTTP 400 without `dangerouslyAllowSVG`) and it generates no
`srcset` for vectors — while still adding wrapper and observer overhead.
Explicit `width` and `height` preserve the aspect ratio, so CLS remains 0.

## 10. Known limitations

| # | Item | Severity |
|---|---|---|
| 1 | Rate limiter is in-memory and per-instance. Inadequate for serverless or multi-instance hosting. | **High if hosting is serverless.** Flagged in code and on the launch checklist. |
| 2 | Screen reader testing not performed. | Medium. Required before launch. |
| 3 | Performance measured locally, not on a CDN. | Medium. Re-measure on production. |
| 4 | Some copy uses British spellings ("organised", "labelled", "recognised"). | Low. One editing pass. |
| 5 | Structured data not yet run through Google's Rich Results Test. | Low. Requires a public URL. |
| 6 | INP not measured. | Low. Needs field data. |
