# Marketing collateral

Standalone pieces that are **not** part of the website build. Nothing in this
folder is served by Next.js.

## coming-soon-flyer.html

Print-ready 8.5 x 11 portrait flyer. Self-contained: the logo and the QR code
are inlined as SVG, so the only external request is Google Fonts.

## Smile-Studio-Rehoboth-Coming-Soon-Flyer.pdf

The print-ready PDF, generated from the HTML. **This is the file to send a
printer or attach to an email.**

Verified: 1 page, exactly 8.5in x 11in (MediaBox 612 x 792pt), all four brand
colours drawn so the navy field actually prints, the logo and QR still vector
(zero raster images, so they stay crisp at any size), and the text selectable
and searchable.

### Regenerating the PDF

```bash
chrome --headless=new --disable-gpu --no-pdf-header-footer   --virtual-time-budget=20000 --run-all-compositor-stages-before-draw   --print-to-pdf="marketing/Smile-Studio-Rehoboth-Coming-Soon-Flyer.pdf"   "file:///<abs-path>/marketing/coming-soon-flyer.html"
```

`--no-pdf-header-footer` matters: without it Chrome stamps the URL, date, and
page number onto the sheet.

### One note for a commercial print run

Chrome's PDF backend writes the type as **Type3 fonts**: the correct Cormorant
and Montserrat glyph shapes, stored as vector outlines rather than as embedded
font programs. It renders and prints identically everywhere, and it stays sharp
at any size, but strict preflight tools (Acrobat Preflight, PitStop, PDF/X
validation) often flag Type3.

Serving the fonts as local TrueType instead of via the Google Fonts API was
tried and made no difference; Skia emits Type3 either way. If a commercial
printer objects, the fix is to open the PDF in Illustrator or InDesign and
re-export, or to rebuild the piece in a print application. For an office
printer, a copy shop, email, or digital sharing, the file as generated is fine.

**To print from the HTML instead:** open it in a browser, Print, then choose
Letter, Portrait, Margins "None", and tick "Background graphics" so the navy
field prints. The on-screen instruction note is hidden by the print stylesheet.

### What it contains
- Vertical reversed lockup, at 2.15in (Brand Guide §2 minimum for vertical is 1.0in print, comfortably clear)
- "Coming Soon", the anticipated opening window, and the required qualifier
- Phone, website, and email, set large on Shoreline White. Never reversed out of colour (Brand Guide §3)
- Address and Plantations Professional Park
- QR to `www.rehobothsmiles.com` tagged `utm_source=flyer&utm_medium=print&utm_campaign=preopening-2026`, so print traffic is attributable (see docs/ANALYTICS-PLAN.md §7)

### Brand compliance
- Only Harbor Navy, Coastal Blue, Beacon Sand, Shoreline White, Charcoal, and Sea Glass
- Beacon Sand appears as type **only** on Harbor Navy (4.57:1 measured), never on white
- Cormorant Garamond for display, Montserrat for everything else
- The wave rule is the single signature device. Nothing else is stacked with it (Brand Guide §6)
- Body copy at 11–12pt for a readership that skews over 60
- Phone set in lining figures, because Cormorant's default oldstyle figures drop 3, 4, 7, and 9 below the baseline

### Before distributing
- [ ] **`www.rehobothsmiles.com` must resolve.** The domain is not yet connected, so the printed URL and the QR code both currently go nowhere.
- [ ] Confirm (302) 715-0020 is answered, and by whom, during the hours a reader would call.
- [ ] Confirm the suite number, and add it to the address block if there is one.
- [ ] Marketing sign-off per Brand Guide §11.

### Regenerating
`flyer-template.html` holds the markup with `__LOGO__` and `__QR__` placeholders.
`logo-inline.svg` and `qr.svg` are the generated assets. To rebuild after an edit
to the template, substitute the two placeholders back in.
