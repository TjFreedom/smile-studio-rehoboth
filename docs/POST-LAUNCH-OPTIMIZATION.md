# Post-Launch Optimization Plan

What to do after the pre-opening site is live, in priority order. Written for a
site whose only conversion is an email list, in a market where the practice does
not yet exist.

---

## Weeks 1 to 2 — Verify, don't optimise

Nothing should be changed until there is data. The job in the first fortnight is
confirming that measurement works at all.

- [ ] Search Console: confirm the sitemap is read and pages are being indexed. Watch for coverage errors.
- [ ] Confirm the four redirect variants still resolve in one hop from a real network
- [ ] Confirm form notifications are arriving and being actioned, not sitting unread
- [ ] Confirm analytics events fire and the thank-you pageviews match the event counts
- [ ] Re-run Lighthouse **on the production CDN** and record the real numbers. The local measurements in `QA-REPORT.md` are not a substitute.
- [ ] Check Core Web Vitals field data once it accumulates. Field data beats lab data.
- [ ] Watch the server error log

## Month 1 — Establish the baseline

- [ ] Record baseline impressions, clicks, and average position for the Tier 1 keywords in `docs/SEO-KEYWORD-MAP.md`
- [ ] Record the opening-list conversion rate by landing page
- [ ] Review the service-interest distribution from form submissions. **Share it with clinical leadership before the service list is locked.** It is free market research on what this catchment actually wants, and it will not be available again.
- [ ] Review ZIP-code distribution against the assumed service area. If Millsboro or Long Neck over-index, that changes the directions page and possibly the ad targeting.
- [ ] Identify which pages get traffic and which get none

## Months 2 to 3 — Content and coverage

- [ ] Publish Phase 1 content on schedule (`docs/CONTENT-CALENDAR.md`)
- [ ] Post a construction update monthly, with real photography once available
- [ ] Use Search Console query data to find terms the site is *nearly* ranking for, and strengthen those pages rather than writing new ones
- [ ] Build the nearby-community pages **only if** query data shows genuine demand from those towns, and only with unique content. The default remains: do not build them.
- [ ] Add internal links from new posts to service and conversion pages
- [ ] Begin local citation building: Delaware State Dental Society, chamber of commerce, local directories. **Every citation must match NAP exactly, and none should carry a phone number until one exists.**

## Testing programme

Only test things with enough traffic to reach significance. On a pre-opening
site that is a short list.

| Priority | Test | Hypothesis |
|---|---|---|
| 1 | Home §12 inline form vs a link to `/opening-list` | Inline converts better; worth confirming |
| 2 | Opening-list form length: current vs first name + email only | Fewer fields lift completion, but cost the service-interest data. Measure what that data is worth first. |
| 3 | Hero CTA wording: "Join the Opening List" vs "Get the Opening Date" | Specificity may outperform |
| 4 | Announcement-bar presence | Does it drive clicks, or just take space |
| 5 | Sidebar CTA card position | |

**Do not test:** anything that would require overstating readiness. No test
justifies claiming the practice is open, or that a service is confirmed.

## Ongoing hygiene

| Cadence | Task |
|---|---|
| Weekly | Check form submissions are being actioned; check for broken links |
| Monthly | Search Console coverage and query review; publish scheduled content; construction update |
| Monthly | **Review every `[TO CONFIRM]` placeholder.** Anything now known should be published. |
| Quarterly | Full accessibility pass, including keyboard and screen reader |
| Quarterly | Lighthouse on production; check Core Web Vitals field data |
| Quarterly | Structured data validation |
| Quarterly | Re-read the copy against Brand Guidelines §7 and §8 |
| Annually | Review legal pages with counsel |

## Technical backlog

Deliberately deferred, in rough value order:

1. **Replace the in-memory rate limiter** with a shared store if the hosting model turns out to be multi-instance. *(Highest risk item on this list.)*
2. **Standardise spelling to US English.** Some drafted copy uses "organised", "labelled", "recognised".
3. **Re-verify LCP on production hardware.** Local measurement was unstable; see the QA report.
4. Add a cookie consent platform, if counsel requires one.
5. Consider an RSS feed for the blog and construction updates.
6. Consider a lightweight image CDN once real photography exists in volume.
7. Add `Person` schema and provider pages at the opening transition.
8. Consider `next/dynamic` for the forms if bundle size becomes a concern once more client code exists.

## Deliberately out of scope until the practice opens

- Paid search. There is nothing to convert on beyond an email list, and clicks would be wasted.
- Review generation. No patients have been treated.
- Conversion-rate optimisation on service pages. They cannot convert while nothing can be booked.
- Aggressive link building. A pre-opening practice has little to link to. The construction story and the "broken tooth at the beach" article are the two genuine link assets, and both come later.

## The metric that actually matters

For the pre-opening period, one number: **opening-list growth rate, segmented by
source.** Everything else is diagnostic.

At opening, the metric that matters is what share of that list books an
appointment in the first eight weeks. That is the only real test of whether the
pre-opening site did its job, and it is worth instrumenting properly **before**
the transition, because it cannot be reconstructed afterwards.
