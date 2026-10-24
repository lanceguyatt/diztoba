# Build Plan

Features in build order, high level. Details come later in `/feature`.

Run `/feature` to spec the next unchecked item, or `/feature 2` to pick one.
Keep completed items checked and append new features as the project grows.
Do not renumber completed features; their archived specs refer to those IDs.

## MVP: Home and mailing list

- [ ] 1. **Latest release on Home** - releases content collection; Home shows the latest release's artwork, listen-on links, embed and a short intro line
- [ ] 2. **Per-release theming** - Home applies the latest release's theme; `/theme` hidden from visitors in production
- [ ] 3. **Upcoming gigs on Home** - gigs content collection; Home lists the next few shows, with an empty state that points to the mailing list
- [ ] 4. **Mailing-list signup on Netlify Forms** - first name and email, honeypot, consent line, in-place success and error states
- [ ] 5. **Remove analytics** - drop GA4, Partytown and `GA_MEASUREMENT_ID`
- [ ] 6. **SEO and sharing** - page metadata and Open Graph share image
- [ ] 7. **Netlify deployment** - build settings, env vars, form detection and the diztoba.com domain

## Later

Not scheduled. Promote to numbered items when ready.

- Music / releases page
- Live / gigs page with past-gig archive
- Videos page
- About / press kit with booking contact
- News
- Mailing-list service with double opt-in
- Privacy page
- Analytics with a consent approach
- Scheduled rebuild for gig dates
- Merch, lyrics
