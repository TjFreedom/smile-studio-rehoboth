# Pre-Launch Checklist

Everything required to take the pre-opening site live. Items marked **BLOCKER**
must be done before the domain is pointed at the site.

---

## 1. Domain and redirects — **BLOCKER**

Next.js cannot redirect a hostname it never receives. **These must be configured
at the DNS or hosting layer**, not in application code.

- [ ] `http://rehobothsmiles.com` → `https://www.rehobothsmiles.com` (301)
- [ ] `http://www.rehobothsmiles.com` → `https://www.rehobothsmiles.com` (301)
- [ ] `https://rehobothsmiles.com` → `https://www.rehobothsmiles.com` (301)
- [ ] Valid TLS certificate covering both apex and `www`
- [ ] HSTS confirmed (the app sends `max-age=63072000; includeSubDomains; preload`)
- [ ] Verify with `curl -I` on all four variants that each lands on the `www` https origin in **one** hop
- [ ] The 15 in-app redirects in `next.config.mjs` resolve correctly

## 2. Environment — **BLOCKER**

- [ ] `NEXT_PUBLIC_ALLOW_INDEXING=true` on production **only**
- [ ] Confirm any preview or staging deploy returns `X-Robots-Tag: noindex` and an empty sitemap
- [ ] `NEXT_PUBLIC_SHOW_PLACEHOLDERS` unset (or `false`) on production, so internal notes are hidden
- [ ] `RESEND_API_KEY` set (**forms fail closed in production without it**)
- [ ] `MAIL_FROM` on an authenticated sending domain
- [ ] `MAIL_TO=info@rehobothsmiles.com`
- [ ] No secret carries a `NEXT_PUBLIC_` prefix
- [ ] `.env` files are not committed

## 3. Email deliverability — **BLOCKER**

Form notifications are the only lead channel that exists. If they silently fail,
the site's single conversion is lost.

- [ ] SPF record published for the sending domain
- [ ] DKIM configured and verified
- [ ] DMARC published (start `p=none`, monitor, then tighten)
- [ ] Sending domain verified with the provider
- [ ] `MAIL_FROM` is our own domain; the visitor's address is only ever `Reply-To`
- [ ] **Send a live test through both forms and confirm arrival in the real inbox, not spam**
- [ ] Confirm someone monitors `info@rehobothsmiles.com` and knows what an opening-list notification looks like
- [ ] Decide who responds, and how fast. **No response-time promise appears on the site because none has been agreed** — agree one, then consider publishing it.

## 4. Rate limiting — decide before launch

`src/lib/rate-limit.ts` is an **in-memory, per-instance** limiter.

- [ ] Confirm the hosting model
- [ ] If serverless or multi-instance: replace with a shared store (Upstash Redis, Vercel KV) or the platform's edge rate limiting. The call signature is designed so only that one file changes.
- [ ] If single-instance: no change needed

## 5. Forms

- [ ] Opening-list form submits and arrives
- [ ] Inquiry form submits and arrives
- [ ] Validation errors display, are announced by a screen reader, and are linked to their fields
- [ ] Consent checkbox is required and **not pre-selected**
- [ ] SMS consent is separate and optional
- [ ] Honeypot returns a generic success and sends nothing *(verified)*
- [ ] Timing trap rejects sub-threshold submissions *(verified)*
- [ ] Rate limit returns 429 with `Retry-After` *(verified)*
- [ ] Thank-you pages render and are `noindex` *(verified)*
- [ ] `GET` on both API routes returns 405 *(verified)*

## 6. Legal — **BLOCKER**

- [ ] Privacy Policy reviewed by counsel
- [ ] Website Terms reviewed by counsel
- [ ] Website Disclaimer reviewed by counsel
- [ ] Accessibility Statement reviewed
- [ ] Delaware Board of Dentistry advertising rules reviewed against all site copy
- [ ] Delaware Personal Data Privacy Act applicability assessed
- [ ] SMS consent language checked against TCPA and CTIA requirements
- [ ] Decide whether a cookie consent banner is legally required (Consent Mode already defaults to denied, so the site is compliant either way)
- [ ] Confirm the correct contracting entity in the Terms (practice or Freedom Dental Health)
- [ ] Trademark status of the name, logo, and lighthouse mark confirmed
- [ ] Freedom Dental Health brand and compliance sign-off

## 7. Content accuracy — **BLOCKER**

- [ ] No phone number anywhere *(verified: zero phone-shaped strings, zero `tel:` links)*
- [ ] No "Now Open" or "Accepting New Patients" *(verified)*
- [ ] No invented exact opening date *(verified)*
- [ ] Opening window always described as anticipated, with the qualifier nearby *(verified)*
- [ ] Hours labelled "Planned Office Hours" *(verified)*
- [ ] No Saturday or Sunday hours invented *(verified)*
- [ ] No unconfirmed service presented as confirmed *(verified: all seven tiered `planned`)*
- [ ] No insurance plan named
- [ ] No technology described as installed
- [ ] No parking or accessibility claim
- [ ] No provider information, real or invented *(verified: `/team` is a holding page)*
- [ ] No reviews, ratings, or testimonials *(verified)*
- [ ] No lorem ipsum *(verified)*
- [ ] No `href="#"` *(verified: zero)*
- [ ] Placeholder notes hidden in production
- [ ] **Standardise spelling to US English.** Some drafted copy uses "organised", "labelled", "recognised", "prioritise". Run a pass before launch.

## 8. Technical SEO

- [ ] Every page has a unique title *(verified: 45 pages, zero duplicates)*
- [ ] Every page has a unique meta description *(verified, all ≤165 chars)*
- [ ] One H1 per page *(verified)*
- [ ] Self-referencing canonicals on the `www` https origin *(verified)*
- [ ] `sitemap.xml` returns 42 URLs in production *(verified)*
- [ ] `robots.txt` allows crawling and references the sitemap *(verified)*
- [ ] Structured data validates in the Rich Results Test and Schema Markup Validator
- [ ] Confirm `telephone`, `openingHours`, `openingDate`, `geo`, and ratings are **absent** *(verified by automated check)*
- [ ] Custom 404 works
- [ ] Google Search Console: verify the `www` property, submit the sitemap
- [ ] Bing Webmaster Tools: same

## 9. Accessibility

- [ ] Lighthouse Accessibility **100** *(achieved)*
- [ ] Keyboard-only pass: nav, dropdowns, mobile drawer, both forms, FAQ, map
- [ ] Skip link works and is the first focusable element *(verified)*
- [ ] Focus visible everywhere *(verified)*
- [ ] Escape closes the mobile drawer and returns focus to the trigger *(verified)*
- [ ] Contrast passes *(verified: zero failures across the sampled pages)*
- [ ] WCAG 2.2 target size on standalone controls *(verified)*
- [ ] Screen reader pass with NVDA or VoiceOver on home, contact, and the opening-list form
- [ ] Test at 200% browser zoom
- [ ] Verify `prefers-reduced-motion` disables animation

## 10. Performance

- [ ] Lighthouse Performance ≥ 90 on the production CDN *(see the QA report for local measurements and the caveat)*
- [ ] CLS < 0.1 *(achieved: 0)*
- [ ] LCP < 2.5s — **re-measure on production hardware**
- [ ] Compression (brotli or gzip) enabled at the CDN
- [ ] Long cache headers on `/_next/static/*`
- [ ] Confirm the fonts are served from our origin, not Google's *(verified: self-hosted)*

## 11. Cross-browser and device

- [ ] Chrome, Safari, Firefox, Edge, latest two versions
- [ ] iOS Safari and Android Chrome
- [ ] 320, 375, 768, 1024, 1440 *(verified: zero horizontal overflow)*
- [ ] Mobile action bar does not cover content *(body padding reserves its height)*
- [ ] Test on an actual older device, not just emulation

## 12. Launch day

- [ ] Take a full backup or tag the release
- [ ] Deploy
- [ ] Re-run all four redirect checks against the live domain
- [ ] Confirm `robots.txt` and `sitemap.xml` on the live domain
- [ ] Submit the sitemap in Search Console
- [ ] Submit a live test through both forms
- [ ] Check the live page source for the correct canonical and `index, follow`
- [ ] Confirm the OG card renders in the Facebook Sharing Debugger and LinkedIn Post Inspector
- [ ] Verify analytics is receiving events, if IDs are configured
- [ ] Monitor the error log for 24 hours

## 13. Do NOT do at launch

- Do not create the Google Business Profile until the practice is within Google's eligibility window
- Do not run paid search before there is something to convert on beyond the opening list
- Do not solicit reviews
- Do not announce on social until the profiles exist and are branded
