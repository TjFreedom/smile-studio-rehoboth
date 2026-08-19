# Smile Studio of Rehoboth — Website

Production website for **Smile Studio of Rehoboth Dentistry**, a dental practice
under construction at 19411 Plantations Road, Rehoboth Beach, Delaware.
A Freedom Dental Health Practice.

The site runs in **pre-opening mode**. The physical office is under
construction; the website is complete, polished, and publicly presentable.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # fill in what you need
npm run dev                    # http://localhost:3000
```

```bash
npm run build                  # production build
npm run start                  # serve the production build
npm run typecheck              # tsc --noEmit
npm run lint
```

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React 19, Turbopack) |
| Language | TypeScript, `strict` + `noUncheckedIndexedAccess` |
| Styling | Plain CSS with design tokens. No utility framework, no page builder. |
| Fonts | Cormorant Garamond + Montserrat, self-hosted via `next/font` |
| Validation | zod, **server-side only** |
| Mail | Resend, behind a swappable adapter |
| Rendering | Every page prerendered as static HTML. Two dynamic API routes. |

50 routes, 42 indexable. Zero runtime dependencies beyond React, Next, and zod.

---

## The one file that matters

**`src/config/practice.ts`** is the single source of truth for every practice
fact: name, address, email, phone, opening status, hours, feature flags, and CTA
labels. Nothing is duplicated in a component or a page.

Changing `openingStatus` from `'under-construction'` to `'open'` switches the
entire site: CTA labels, the mobile action bar, the header phone slot, hours
labelling, and structured data all follow. See
`docs/OPENING-TRANSITION-CHECKLIST.md`.

**If you find yourself typing the address, the email, or the opening window into
a component, import it from there instead.**

## Project structure

```
src/
├── config/practice.ts        ← single source of truth
├── content/                  ← editable content, no CMS required
│   ├── navigation.ts         nav, footer, legal links
│   ├── services.ts           7 categories, three-tier confirmation model
│   ├── faqs.ts               opening, new patient, affiliation
│   ├── construction.ts       milestone timeline + dated update feed
│   └── blog.ts               posts
├── lib/
│   ├── seo.ts                metadata + indexing gate
│   ├── schema.ts             JSON-LD, with pre-opening omission rules
│   ├── forms.ts              zod schemas (server only)
│   ├── form-options.ts       option lists (safe for the client)
│   ├── mailer.ts             Resend adapter
│   └── rate-limit.ts         in-memory limiter — see the launch checklist
├── components/               Ui, Blocks, Chrome, Header, Forms, ProsePage, Icons, Logo, Analytics
└── app/                      routes, globals.css, components.css
docs/                         all strategy and operational documentation
public/logos/                 all approved logo variants
```

## Content editing without a CMS

Content lives in typed modules under `src/content/`. TypeScript catches a
malformed entry at build time rather than at runtime, which is a meaningful
safety property for a healthcare site.

| To change | Edit |
|---|---|
| Any practice fact | `src/config/practice.ts` |
| A service, or confirm one | `src/content/services.ts` (`tier: 'planned'` → `'confirmed'`) |
| Add a construction update | `src/content/construction.ts` |
| Add a blog post | `src/content/blog.ts` |
| An FAQ | `src/content/faqs.ts` |
| Navigation | `src/content/navigation.ts` |

To move to a hosted CMS later, replace these modules with a fetch layer that
returns the same types. Nothing else changes.

## Pre-opening guarantees enforced in code

These are not editorial conventions; they are structural.

- **No phone number renders anywhere** while `phoneNumber` is null. No number, no phone icon, no `tel:` link, no empty slot where one would sit, and `telephone` is omitted from structured data.
- **Planned hours are never emitted as `openingHours`** in structured data.
- **A date range is never emitted as `openingDate`.** Only a confirmed ISO date is.
- **`Service` schema is emitted only for `confirmed` services**, so the site never tells Google it provides something clinical leadership has not signed off.
- **Unverified coordinates are not emitted as `geo`.**
- **No aggregate rating, review, or price** appears in schema or on the page.
- **Null external links render nothing**, rather than an `href="#"`.
- **`click_to_call` cannot fire** while `enableClickToCall` is false — the analytics handler drops it.
- **Staging cannot be indexed**: without `NEXT_PUBLIC_ALLOW_INDEXING=true` the site sends `noindex` in both the meta tag and the `X-Robots-Tag` header, and serves an empty sitemap.

## Security

- Strict CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`
- No external script or font origins in production
- Server-side validation on every submission; the client's validation is a convenience only
- Honeypot + timing trap, both returning a generic success so bots learn nothing
- Per-IP rate limiting
- Secrets are server-only; nothing sensitive carries `NEXT_PUBLIC_`
- The mailer logs status codes, never response bodies, because those can echo a visitor's contact details

## Documentation

| Document | |
|---|---|
| `docs/ASSUMPTIONS.md` | Every judgement call, including where the build departed from the brief |
| `docs/REQUIRED-BEFORE-OPENING.md` | Master outstanding-information list |
| `docs/SITEMAP-AND-JOURNEYS.md` | Sitemap, user journeys, conversion strategy |
| `docs/SEO-KEYWORD-MAP.md` | Page-to-keyword map, technical SEO |
| `docs/DESIGN-SYSTEM.md` | Visual direction, tokens, components |
| `docs/ANALYTICS-PLAN.md` | Events, consent, UTM conventions |
| `docs/GOOGLE-BUSINESS-PROFILE.md` | GBP readiness and copy |
| `docs/PHOTOGRAPHY-SHOT-LIST.md` | Pre-opening and completed-office shot lists |
| `docs/CONTENT-CALENDAR.md` | 12-month editorial plan |
| `docs/PROVIDER-BIO-TEMPLATE.md` | Team page activation |
| `docs/QA-REPORT.md` | Accessibility, performance, and mobile review results |
| `docs/LAUNCH-CHECKLIST.md` | Pre-launch checklist |
| `docs/OPENING-TRANSITION-CHECKLIST.md` | Pre-opening → open |
| `docs/POST-LAUNCH-OPTIMIZATION.md` | What to do after launch |

## Brand

Built to **Smile Studio of Rehoboth Brand Guidelines v1.0**. Two documented
deviations, both with reasoning, in `docs/ASSUMPTIONS.md`:

1. Mist Gray darkened for text use, because the guide's own value fails the contrast minimum the guide itself commits to.
2. Eyebrow labels set in SemiBold rather than Light, because the guide forbids Light below 16pt and eyebrows render at 12px.

Both should be reconciled into Brand Guide v1.1.

## Before you deploy

Read `docs/LAUNCH-CHECKLIST.md`. The blockers are: the four domain redirects
(which must be configured at the host, not here), `NEXT_PUBLIC_ALLOW_INDEXING`,
SPF/DKIM/DMARC for form delivery, and legal review of the four policy pages.
