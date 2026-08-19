# Visual Design Direction and Design Tokens

Derived from Brand Guidelines v1.0 §3, §4, and §6. Implemented in
`src/app/globals.css` (tokens and primitives) and `src/app/components.css`
(components). **No component hard-codes a hex value.**

---

## 1. Direction

The brief asked for coastal Delaware without becoming beach-themed, and the
brand guide is blunt about the risk: *"Avoid nautical kitsch"* and *"the coastal
identity is carried by the design, not by wordplay."*

The approach taken:

- **The palette does the coastal work.** Harbor Navy, Coastal Blue, Beacon Sand, and Sea Glass are literally drawn from water, sand, and sky. No graphic has to say "beach".
- **Whitespace is the primary device.** The brand guide calls it *"the most important device on the list"*, so section padding is generous and scales fluidly from 3.5rem to 7rem.
- **One signature device per composition.** The wave rule appears at the footer edge and the hero waterline. It is deliberately not on every section.
- **6px radius.** Per §6: *"A studio brand reads crisp, not bubbly."*
- **Restraint in elevation.** Shadows are navy-tinted rather than neutral grey, and used sparingly.
- **No tooth graphics, seashells, anchors, palm trees, rope, or driftwood.** The only tooth on the site is the one inside the official logo.

## 2. Colour tokens

| Token | Value | Role | Contrast on white |
|---|---|---|---|
| `--navy` | `#0B2859` | Harbor Navy. Primary. Headings, primary buttons, footer, hero. | 14.4:1 |
| `--blue` | `#175789` | Coastal Blue. Links, icons, accents, button hover. | 7.6:1 |
| `--sand` | `#AD8B6A` | Beacon Sand. Rules and accents only, used sparingly. | 3.1:1 — decorative only |
| `--shoreline` | `#F4F7FA` | Shoreline White. Alternating section background. | — |
| `--charcoal` | `#1F2933` | Body copy. | 14.8:1 |
| `--seaglass` | `#A8C6D8` | Rules, fills, borders, and text **on navy only** (8.0:1). Never text on light. | 1.9:1 |
| `--mist` | `#657384` | Captions, metadata, hints. **Darkened from the guide's `#7A8899`** — see below. | 4.84:1 |
| `--mist-brand` | `#7A8899` | Original Mist Gray, retained for non-text decorative use. | 3.61:1 |

### Deviation from the brand guide, and why

Brand Guide §3 assigns Mist Gray `#7A8899` to captions, metadata, and form
hints. Measured, that is **3.36:1 on Shoreline White**, below the 4.5:1 minimum
the same guide commits to in its own Accessibility section, and the guide
states plainly that legibility for patients over 60 is *"an audience
requirement"*, not a courtesy.

`--mist` was therefore darkened within the same hue to `#657384`, the lightest
value that passes AA on both white and Shoreline White. Inside the footer the
token is re-scoped to `#9BABC0` (6.1:1 on navy), so one token name works on both
light and dark ground without any rule needing to know which it is on.

**Action: raise with the Director of Marketing & Communications for Brand Guide v1.1.**

### Button rules (Brand Guide §3, enforced in CSS)

- Primary: Harbor Navy background, white text.
- Secondary: Coastal Blue background, white text.
- **Beacon Sand: Harbor Navy text only, never white.** Encoded in `.btn--sand` so it cannot be got wrong.
- Reversed variants for navy sections.

### Status colours

All meet 4.5:1 on white: success `#10643F`, error `#A4232B`, warning `#8A5A12`,
info `#175789`. **Status is never communicated by colour alone** — error
messages carry an icon glyph and text, and the construction timeline states
"Complete / In progress / Upcoming" as words.

## 3. Typography

Two families, exactly as the guide specifies. **Only the cuts actually used are
loaded**, because every declared weight becomes a preloaded file on the critical
path.

| Role | Family | Weight | Size (digital) |
|---|---|---|---|
| H1 | Cormorant Garamond | 600 | `clamp(2.25rem, …, 3.375rem)` → 36–54px |
| H2 | Cormorant Garamond | 600 | 28–36px |
| H3 / H4 | **Montserrat** | 600 | 18–21px |
| Body | Montserrat | 400 | 16–17px |
| Small / UI | Montserrat | 400/600 | 14px |
| Caption | Montserrat *italic* | 400 | 13px |
| Eyebrow / label | Montserrat | 600, tracked `0.15em`, uppercase | 12px |
| Button / nav | Montserrat | 600, tracked `0.05em` | 14px |

**Why H3 is not Cormorant:** §4 states Cormorant *"looks thin and uncertain
below about 16pt"* and must never be used for body copy or captions. The
hierarchy switches to Montserrat SemiBold at H3.

**Why eyebrows are 600, not Light 300:** §4 nominates Montserrat Light for
eyebrows but also says Light is *"reserved for display sizes (16pt and above)"*
and *"fails our contrast and legibility standards for older patients"*. Eyebrows
render at 12px, so Light would violate the guide's own rule. SemiBold is used
instead. This also removed an entire font file from the critical path.

**Measure:** 60–80 characters (`max-width: 72ch` on `p`), per §4.
**Line height:** body 1.6, headings 1.14. **Alignment:** left ragged-right; never justified.

## 4. Spacing, layout, and motion

- 4px base scale, `--sp-1` … `--sp-11`.
- Section rhythm `clamp(3.5rem, 2rem + 6vw, 7rem)`.
- Containers: 1200px default, 780px for reading-width pages, 1400px wide.
- Fluid gutter `clamp(1.25rem, …, 2.5rem)`.
- Motion: 120/200/340ms with a single shared easing curve. **All animation and smooth scrolling is disabled under `prefers-reduced-motion`.**

## 5. Component library

| Component | File | Notes |
|---|---|---|
| `Header` | `components/Header.tsx` | Client. Dropdowns, mobile drawer, Escape-to-close, scroll lock, click-outside. Phone slot renders only when a number exists. |
| `AnnouncementBar`, `Footer`, `MobileActionBar` | `components/Chrome.tsx` | Server. Mobile bar swaps its three actions on the opening flag. |
| `Logo` | `components/Logo.tsx` | Enforces the §2 minimum widths (200px horizontal, 130px vertical) so it cannot be rendered too small. |
| `Button`, `SectionHead`, `PageHero`, `Breadcrumbs`, `Callout`, `CheckList`, `WaveRule`, `JsonLd`, `PlaceholderNote` | `components/Ui.tsx` | Server. |
| `FaqList`, `ServiceCard`, `ServiceGrid`, `Timeline`, `StaticMap`, `LocationDetails`, `QuickBar`, `CtaBand`, `MedicalDisclaimer` | `components/Blocks.tsx` | Server. FAQ uses native `<details>` so it works without JS. |
| `OpeningListForm`, `InquiryForm` | `components/Forms.tsx` | Client. Imports only from `lib/form-options` so zod never reaches the browser. |
| `ProsePage` | `components/ProsePage.tsx` | Typed block list → consistent heading order and measure across editorial pages. |
| `Analytics` | `components/Analytics.tsx` | Client. Consent Mode v2 denied by default; delegated `data-event` click tracking. |
| Icons | `components/Icons.tsx` | 24 hand-drawn icons, 1.6px stroke, rounded terminals, per §6. Decorative by default. |

## 6. States

Every interactive element defines default, hover, active, focus-visible,
disabled, error, and success. Focus is a 3px Coastal Blue outline with 2px
offset and is **never removed** — `globals.css` carries a comment saying so, for
the benefit of anyone tempted to add `outline: none`.

## 7. Signature devices (use one per composition)

1. **The wave rule** — the two cresting waves from the logo, as an SVG divider. Footer edge and hero waterline only.
2. **The rule-and-word treatment** — `.eyebrow--ruled`, a short rule either side of a centred label, echoing "of REHOBOTH".
3. **Horizon band** — `.horizon-band`, a navy-to-seaglass edge.
4. **Navy scrim** — `.scrim`, 34–72% navy wash for text over photography. Never a sand wash (§6: *"it muddies skin tones"*).

## 8. Logo assets generated

From the supplied outlined masters:

| File | Use |
|---|---|
| `logo-horizontal.svg` | Default, header. |
| `logo-vertical.svg` | Narrow and square contexts. |
| `logo-horizontal-reversed.svg`, `logo-vertical-reversed.svg` | On navy. Navy → white, Coastal Blue → Sea Glass, tower retains Beacon Sand per §2. |
| `logo-horizontal-navy.svg` | One-colour reproduction. |
| `icon-mark.svg`, `icon-mark-reversed.svg`, `icon-mark-navy.svg` | Restricted use only (favicon, avatar, hero motif) per §2. |
| `icon.svg`, `apple-icon.png` | Browser and device icons. |
| `og/default.png` | 1200×630 social card, set in Georgia Bold and Arial, the guide's own §4 web-safe substitutes. |

The logo is never stretched, recoloured outside the palette, rotated, cropped,
shadowed, or boxed. Clear space is maintained by layout spacing.
