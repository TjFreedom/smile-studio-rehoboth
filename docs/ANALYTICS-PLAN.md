# Analytics, Tracking, and Consent Plan

Implemented in `src/components/Analytics.tsx`. Nothing loads unless
`NEXT_PUBLIC_GTM_ID` or `NEXT_PUBLIC_GA4_ID` is set, so the site runs
tracker-free until Marketing supplies the IDs.

---

## 1. Consent posture

Google Consent Mode v2 initialises **before** GTM, in a denied state:

```js
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500,
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);
```

**No advertising or analytics storage is written until a consent platform calls
`gtag('consent','update', …)`.** Until a CMP is installed, the site collects
cookieless pings only. That is the safe default and it satisfies the brief's
requirement not to fire advertising or analytics scripts before consent.

No CMP banner UI is built. Whether one is legally required is a decision for
counsel (see the launch checklist). Any standard CMP can be dropped in without
touching application code.

## 2. Event implementation

A single delegated `click` listener reads `data-event="…"` from any element.
One listener for the whole document, and no analytics concerns inside
presentational components.

```tsx
<Button href={directionsUrl} event="directions_click">Get Directions</Button>
```

Form events fire from the submission hook: `*_form_start` on first interaction,
`*_form_submit` on a successful response.

## 3. Pre-opening events (live now)

| Event | Fires when | Where |
|---|---|---|
| `opening_list_form_start` | First focus in the opening-list form | Home §12, `/opening-list` |
| `opening_list_form_submit` | Successful submission | Same |
| `general_inquiry_form_start` | First focus in the inquiry form | `/contact` |
| `general_inquiry_form_submit` | Successful submission | Same |
| `email_click` | Any mailto link | Header, footer, mobile bar, contact, CTA bands |
| `directions_click` | Directions or map link | Home §10, contact, directions, mobile bar |
| `planned_service_click` | Service card or related-service link | Home §6, `/services`, service sidebars |
| `construction_update_view` | Construction updates link | Home §7, `/our-new-office` |
| `freedom_dental_health_click` | Outbound link to the parent organisation | Home §9, footer, about |

**`click_to_call` is deliberately not registered.** The handler contains an
explicit guard: if `enableClickToCall` is false the event is dropped even if
something tries to fire it. There is no phone number, so a call event could only
ever be noise.

## 4. Post-opening events (prepared, dormant)

Register these in GTM at the opening transition, not before:

`appointment_form_start`, `appointment_form_submit`, `click_to_call`,
`click_schedule`, `click_patient_forms`, `click_pay_online`, `click_insurance`,
`click_provider_profile`, `emergency_call_click`.

`click_to_call` activates automatically once `enableClickToCall` is true.

## 5. GA4 conversion configuration

Mark as key events **in this order of value**:

1. `opening_list_form_submit` — the primary conversion
2. `general_inquiry_form_submit`
3. `email_click`
4. `directions_click`

Do not mark `planned_service_click` or `construction_update_view` as
conversions. They are engagement signals; treating them as conversions inflates
the numbers and hides whether the list is actually growing.

**Also track the thank-you pageviews** (`/thank-you/opening-list`,
`/thank-you/inquiry`) as a cross-check against the event counts. If the two
disagree, something is wrong with the event layer.

## 6. Platforms to configure

| Platform | Status | Notes |
|---|---|---|
| Google Analytics 4 | Prepared | Set `NEXT_PUBLIC_GA4_ID`, or manage via GTM. |
| Google Tag Manager | Prepared | Set `NEXT_PUBLIC_GTM_ID`. Preferred, so tags are managed without deploys. |
| Google Search Console | **Required at launch** | Verify the `www` property, submit the sitemap. |
| Google Ads | Not yet | No campaigns should run before there is something to convert on. |
| Meta Pixel | Not yet | Requires approval, and a consent decision. |
| Microsoft Clarity | Optional | Useful pre-opening for scroll and rage-click behaviour. Must respect consent. |
| Consent Mode v2 | **Implemented** | Denied by default. |

## 7. UTM conventions

Use consistently so pre-opening spend is attributable:

```
utm_source   = google | facebook | instagram | email | print | signage | partner
utm_medium   = cpc | organic_social | email | qr | referral
utm_campaign = preopening-2026 | opening-announcement | provider-intro | construction-update
utm_content  = <asset identifier, e.g. rack-card-a>
```

**Exterior signage and print should carry a QR code with
`?utm_source=signage&utm_medium=qr&utm_campaign=preopening-2026`.** For a
practice with construction hoarding on a well-travelled road, that is likely to
be a meaningful acquisition channel and it is otherwise invisible.

## 8. What to watch before opening

The single number that matters is **opening-list growth rate**, segmented by
source. Supporting metrics:

- Opening-list conversion rate by landing page (home vs `/opening-list` vs a service page).
- Service-interest distribution from the form. This is genuine market research: it tells clinical leadership what this catchment is actually asking for before the service list is locked.
- ZIP code distribution, to sanity-check the assumed service area.
- `/our-new-office/construction-updates` return visits, as an engagement proxy.
- Emergency-page traffic. High volume before opening is a strong signal that emergency care should be prioritised on day one.

## 9. Privacy

- No personal data in URL parameters or query strings.
- Form submissions post to first-party API routes; nothing is sent to a third party from the browser.
- The mailer logs provider status codes only, never response bodies, because those can echo a visitor's contact details.
- The interactive map loads only on an explicit click, so Google sets no cookies until the visitor asks for it.
- IP addresses are used transiently for rate limiting and are not persisted.
