# Pre-Launch Checklist

Everything required to take the pre-opening site live. Items marked **BLOCKER**
must be done before the domain is pointed at the site.

---

## 1. Domain and redirects — **BLOCKER**

Next.js cannot redirect a hostname it never receives. **These must be configured
at the DNS or hosting layer**, not in application code.

> **RESOLVED 2026-08-21.** The domain is live on Netlify and the redirect now
> runs in the documented direction. Measured against the live host:
>
> ```
> http://rehobothsmiles.com/       ->  2 hops  ->  https://www.rehobothsmiles.com/
> https://rehobothsmiles.com/      ->  1 hop   ->  https://www.rehobothsmiles.com/
> http://www.rehobothsmiles.com/   ->  1 hop   ->  https://www.rehobothsmiles.com/
> https://www.rehobothsmiles.com/  ->  200
> ```
>
> `www` is the primary domain on the Netlify site, so the apex redirects to it.
> Every canonical tag, the sitemap, the structured data, the flyer, and the
> Google Business Profile plan all use `https://www.rehobothsmiles.com`, and the
> served canonical now matches the URL that serves it.
>
> The `http` apex takes two hops because Netlify upgrades the scheme before it
> applies the host redirect (`http://apex` -> `https://apex` -> `https://www`).
> That is standard hosting behaviour and needs no fix, but it is why the
> one-hop check below is ticked for three variants and annotated for the fourth.
>
> Note that the site is still `noindex` by deliberate choice: see section 2.
> The domain being live does **not** mean the site is launched.

- [x] `http://rehobothsmiles.com` → `https://www.rehobothsmiles.com` (301) *(verified, 2 hops via scheme upgrade)*
- [x] `http://www.rehobothsmiles.com` → `https://www.rehobothsmiles.com` (301) *(verified)*
- [x] `https://rehobothsmiles.com` → `https://www.rehobothsmiles.com` (301) *(verified)*
- [ ] Valid TLS certificate covering both apex and `www`
- [ ] HSTS confirmed (the app sends `max-age=63072000; includeSubDomains; preload`)
- [x] Verify with `curl -I` on all four variants that each lands on the `www` https origin *(verified; one hop except the `http` apex, which takes two — see above)*
- [ ] The 15 in-app redirects in `next.config.mjs` resolve correctly

## 2. Environment — **BLOCKER**

- [x] `NEXT_PUBLIC_ALLOW_INDEXING=true` on production **only** *(set 2026-09-17 in the Netlify dashboard, production context)*
- [ ] Confirm any preview or staging deploy returns `X-Robots-Tag: noindex` and an empty sitemap
- [x] `NEXT_PUBLIC_SHOW_PLACEHOLDERS` unset (or `false`) on production, so internal notes are hidden *(fixed 2026-08-21: it had been set globally in `netlify.toml` and was rendering an internal note on the live homepage; now scoped to the deploy-preview and branch-deploy contexts only)*
- [ ] `RESEND_API_KEY` set, if the direct email notification is wanted on top of Netlify Forms *(optional since 2026-09-16. It was never set on production, and every live submission returned a 502 until Netlify Forms capture was added)*
- [ ] `MAIL_FROM` on an authenticated sending domain, if Resend is used
- [ ] `MAIL_TO=info@rehobothsmiles.com`, if Resend is used
- [ ] No secret carries a `NEXT_PUBLIC_` prefix
- [ ] `.env` files are not committed

## 3. Lead delivery — **BLOCKER**

Form submissions are the only lead channel that exists. If they silently fail,
the site's single conversion is lost.

**Netlify Forms (system of record)**

- [ ] Both forms (`opening-list`, `inquiry`) are listed under Forms in the Netlify UI after the deploy that added `public/__forms.html`
- [ ] **Email notification** configured on each form, to `info@rehobothsmiles.com`
- [ ] `CRM_WEBHOOK_SECRET` set in the Netlify dashboard (same value as the DCAD site)
- [ ] `CRM_LOCATION_ID` set to Smile Studio of Rehoboth's id in the FDH CRM *(DCAD Wilmington is 12; Rehoboth's id must come from the CRM administrator)*
- [ ] `submission-created` appears under Functions in the Netlify UI after deploy
- [ ] Send a live test through both forms; confirm each appears under Verified submissions, not Spam, that the email notification arrives, and that the lead shows up in the CRM under the right location

**Resend email (optional, additive)**

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

- [ ] Opening-list form submits and appears in Netlify Forms
- [ ] Inquiry form submits and appears in Netlify Forms
- [ ] `/__forms.html` is served by the deploy (form detection needs it) and is disallowed in `robots.txt` *(verified locally)*
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

- [x] Phone number correct and consistent everywhere: **(302) 715-0020** / `+13027150020` *(was "no phone number anywhere" until 2026-10-21; the practice's postcard made it public)*
- [x] No "Now Open". **"Scheduling appointments" is now correct and deliberate**, matching the postcard; the office is still not open for care *(verified)*
- [ ] No invented exact opening date *(verified)*
- [ ] Opening window always described as anticipated, with the qualifier nearby *(verified)*
- [ ] Hours labelled "Planned Office Hours" *(verified)*
- [ ] No Saturday or Sunday hours invented *(verified)*
- [x] All seven categories tiered `confirmed`, because Dr. Cottone provides them. **Check no EIGHTH service creeps in unconfirmed** *(verified 2026-10-21)*
- [x] No insurance plan named. Courtesy billing, payment in full at service, benefits assigned to the patient *(verified)*
- [ ] No technology described as **installed**. The list (including the i-CAT CBCT) is confirmed as what will be in use, and the page says so without implying the machines are in the building yet. Re-check once equipment actually lands.
- [ ] No parking or accessibility claim
- [x] Provider information accurate and sourced: **Dr. Jonathon Cottone, DDS**, from the practice's own Provider Spotlight. **Delaware license number still absent and must stay absent until supplied.**
- [ ] No reviews, ratings, or testimonials *(verified)*
- [ ] No lorem ipsum *(verified)*
- [ ] No `href="#"` *(verified: zero)*
- [x] Placeholder notes hidden in production *(verified on the live domain)*
- [x] **Standardize spelling to US English.** *(done 2026-10-20: organisation, programme, labelled, colour, recognised, behaviour, prioritise, optimised and their variants replaced across src/)*

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
