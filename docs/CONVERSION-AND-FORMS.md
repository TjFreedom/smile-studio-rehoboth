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
Browser → POST /api/{route} → rate limit → parse → zod → spam traps → sendNotification() → Resend → info@rehobothsmiles.com
```

- `FROM` is always our own authenticated domain. **The visitor's address goes in `Reply-To`, never in `From`.** Spoofing the visitor is the fastest route to a spam folder and a DMARC failure.
- HTML and plain-text bodies are both sent, set in Arial per Brand Guide §4 (which advises against serif headlines in email).
- All interpolated values are HTML-escaped.
- Failures log a **status code only**, never the response body, because provider errors can echo a visitor's contact details.
- A send failure returns a `502` and a message telling the visitor to email directly, rather than silently losing the lead.

**Required before launch:** SPF, DKIM, DMARC, and a verified sending domain.
Without `RESEND_API_KEY`, production fails closed and logs an error; development
logs the notification to the console instead.

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
