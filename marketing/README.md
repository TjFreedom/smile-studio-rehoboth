# Marketing collateral

Standalone pieces that are **not** part of the website build. Nothing in this
folder is served by Next.js.

## coming-soon-flyer.html

Print-ready 8.5 x 11 portrait flyer. Self-contained: the logo and the QR code
are inlined as SVG, so the only external request is Google Fonts.

**To produce a PDF:** open in a browser, Print, then choose Letter, Portrait,
Margins "None", and tick "Background graphics" so the navy field prints. The
on-screen instruction note is hidden by the print stylesheet.

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
