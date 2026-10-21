# Forms, Lead Handling, and Conversion Mechanics

Implementation reference for the two forms, their validation, their anti-spam
measures, and their delivery path.

---

## 1. Opening-list form — the primary conversion

**Where:** home page §12 (inline), `/opening-list` (full page)
**Endpoint:** `POST /api/opening-list`
**Success:** `303`-style client redirect to `/thank-you/opening-list` (noindex)

| Field | Required | Notes |
|---|---|---|
| First name | ✅ | Rejects values containing URLs or angle brackets |
| Last name | ✅ | Same |
| Email | ✅ | Format validated server-side |
| Mobile phone | — | Only needed for text updates |
| Preferred contact method | — | Email / Text message / Phone call. Defaults to Email. |
| Service interest | — | Nine options. **Labelled as interest only, not a request for treatment, and not a confirmation the service will be offered.** |
| ZIP code | — | 5 digit or ZIP+4 |
| Email consent | ✅ | **Not pre-selected.** Required, because the list is delivered by email. |
| SMS consent | — | **Separate, optional, not pre-selected.** Carries rate and frequency disclosure and STOP instructions. |

The two consents are deliberately distinct. Bundling them, or pre-ticking
either, is the most common compliance failure on dental practice forms.

## 2. General inquiry form

**Where:** `/contact`
**Endpoint:** `POST /api/inquiry`
**Success:** redirect to `/thank-you/inquiry` (noindex)

Fields: first name, last name, email, phone (optional), category (eight
options), message (10 to 3,000 characters).

Carries a persistent, programmatically-associated notice:

> Please do not include private medical, dental, insurance, or financial
> information in this form.

## 2b. Appointment request form (paid-traffic landing page)

**Where:** `/visit` only. Not linked from the site, not indexed, not in the sitemap.
**Endpoint:** `POST /api/appointment-request`
**Success:** redirect to `/visit/thank-you` (noindex). A pageview there, or the
`appointment_request_form_submit` event, is the conversion to point Google Ads at.

| Field | Required | Notes |
|---|---|---|
| First name, last name | yes | Same rules as the other forms |
| Mobile phone | **yes** | The follow-up is a call, so phone is required here |
| Email | no | Optional; lowers friction on paid traffic |
| What brings you in | no | Six options, defaults to a new patient exam |
| Best time to call | no | Morning / Afternoon / Either |
| Note | no | Up to 1,000 characters |
| Contact consent | **yes** | Not pre-selected. Phone, text, or email about scheduling, with STOP language |
| `utm_*`, `gclid`, `landingPage` | hidden | Read from the landing URL at submit time and passed through to the CRM |

The page itself is `src/app/visit/page.tsx`. It renders without the site chrome
(`components/ChromeGate.tsx` withholds the announcement bar, header, footer, and
mobile action bar on `/visit*`) and carries its own minimal header, footer, and a
phone-only sticky CTA. Brief: new office, come check us out, experienced
providers, appointments available. Insurance is not a selling point on the page
and is answered once, plainly, in the FAQ.

## 3. Anti-spam

Three layers, none of which inconvenience a real visitor:

1. **Honeypot** — a `website` field, positioned off-screen and `aria-hidden`, so neither sighted users nor screen readers encounter it.
2. **Timing trap** — submissions faster than 2.5s (opening list) or 3s (inquiry) are treated as automated.
3. **Rate limiting** — 5 per 10 minutes per IP for the opening list, 4 for inquiries. Returns `429` with `Retry-After`.

**A tripped honeypot or timing trap returns a generic `{ok: true}` and sends
nothing.** This was a deliberate fix during the build: an earlier version
rejected the honeypot at the schema layer, which returned a `400` naming the
`website` field and told a bot exactly which input to leave alone next time.

## 4. Validation

The same zod schema runs in both places, but **the server is the authority**.
Client validation exists only for immediate feedback.

Errors are returned as a field-keyed map, rendered next to the offending input,
linked with `aria-describedby`, marked `aria-invalid`, and announced through a
polite `role="status"` live region. Each error message carries an icon glyph as
well as colour, so no error is communicated by colour alone.

`lib/form-options.ts` holds the option arrays with **no zod import**, so the
client component can render its selects without pulling 72KB of validation
library into the browser.

## 5. Delivery

```
Browser → POST /api/{route} → rate limit → parse → zod → spam traps
    ├→ captureSubmission() → Netlify Forms → email notification (Netlify UI)      (forms: opening-list, inquiry, appointment-request)
    │                                      └→ submission-created function → FDH CRM
    └→ sendNotification()  → Resend → info@rehobothsmiles.com (only when RESEND_API_KEY is set)
```

**Netlify Forms is the system of record.** Netlify only registers forms it finds
in static HTML at deploy time, and these forms are React components, so
`public/__forms.html` declares each form and its field names (the documented
workaround for Next.js). `src/lib/netlify-forms.ts` posts the validated
submission back to the receiving host as `form-name=opening-list` or
`form-name=inquiry`. A field not declared in that file is silently dropped, so
the two must stay in step.

Forwarding from the server rather than the browser keeps the route handler as
the single gate: nothing is stored until rate limiting, validation, the
honeypot, and the timing trap have passed.

Submissions appear at https://app.netlify.com/projects/smile-studio-rehoboth/forms.
Per form, **Form notifications** in the Netlify UI configure the email
notification to `info@rehobothsmiles.com` (and anyone else who should see
leads), and Slack if the team wants it.

**CRM hand-off.** `netlify/functions/submission-created.ts` is a Netlify
event-triggered function: Netlify invokes it for every verified submission,
after spam filtering. It maps each form to the CRM's lead shape
(`first_name`, `last_name`, `phone`, `email`, `interest`, `location_id`) and
posts it to `https://fdhscrm.azurewebsites.net/api/leads/webhook` with the
`x-webhook-secret` header. This is the same endpoint, header, and payload the
DCAD site uses, so both practices arrive in the CRM identically.

- Opening-list signups carry the service interest, preferred contact method,
  ZIP, and both consent answers in `interest`.
- Inquiries carry the category and the message in `interest`.
- Appointment requests carry the reason, preferred call time, and note in
  `interest`, and pass `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`,
  `utm_content`, and `gclid` through unchanged so the CRM can attribute the lead.
- Submissions tagged with a non-production `deployContext` are skipped, so a
  reviewer's test on a deploy preview never becomes a CRM lead.
- If `CRM_WEBHOOK_SECRET` or `CRM_LOCATION_ID` is missing, the function logs
  and skips. The lead is still in Netlify Forms and still emailed; it just has
  to be entered in the CRM by hand.

The hidden `subject` field sets the subject line of Netlify's own notification
email. `deployContext` records whether a submission came from production or a
deploy preview, so reviewer tests are distinguishable from real leads.

The Resend path is optional and additive. **The visitor only sees an error if
both channels fail.**

- `FROM` is always our own authenticated domain. **The visitor's address goes in `Reply-To`, never in `From`.** Spoofing the visitor is the fastest route to a spam folder and a DMARC failure.
- HTML and plain-text bodies are both sent, set in Arial per Brand Guide §4 (which advises against serif headlines in email).
- All interpolated values are HTML-escaped.
- Failures log a **status code only**, never the response body, because provider errors can echo a visitor's contact details.
- A send failure returns a `502` and a message telling the visitor to email directly, rather than silently losing the lead.

**Required before launch:** at least one Netlify form notification configured
per form, and a live test through both forms confirmed in the Netlify Forms UI.
If the Resend path is used, it also needs SPF, DKIM, DMARC, and a verified
sending domain. Without `RESEND_API_KEY`, production logs a warning and relies
on Netlify Forms; development logs both channels to the console.

## 6. Thank-you pages

Both are `noindex, nofollow` and excluded from the XML sitemap, but are real
pages so the conversion is measurable as a pageview as well as an event.

**Neither promises a response time.** No internal service standard has been
agreed, and a promise the practice cannot keep is worse than none. Agree one,
then consider publishing it — it is item 23 in
`docs/REQUIRED-BEFORE-OPENING.md`.

The inquiry thank-you repeats that the form is not monitored for emergencies.

## 7. Verified behaviour

Tested against the running server during the build:

| Case | Expected | Result |
|---|---|---|
| Valid opening-list submission | `200 {ok:true}`, notification sent | ✅ |
| Missing consent checkbox | `400`, field error on `consentEmail` | ✅ |
| Invalid email + empty first name | `400`, both field errors | ✅ |
| Honeypot filled | `200 {ok:true}`, **nothing sent, no field named** | ✅ |
| Submitted under the time threshold | `200 {ok:true}`, nothing sent | ✅ |
| Message under 10 characters | `400`, field error on `message` | ✅ |
| `GET` on either endpoint | `405` | ✅ |
| Exceeding the rate limit | `429` with `Retry-After` | ✅ |

## 8. Accessibility

- Every field has a persistent visible `<label>` (no placeholder-as-label)
- Required fields marked visually **and** with screen-reader-only "(required)"
- Optional fields explicitly marked "(optional)"
- Hints associated via `aria-describedby`
- Errors linked to their field and announced politely
- Consent checkboxes 22px with a 44px minimum row height
- Inputs 48px minimum height
- Fieldset and legend group the consent block
- `noValidate` on the form so our own accessible messages are used rather than inconsistent native bubbles
- Submit button shows a busy state and is disabled during submission
