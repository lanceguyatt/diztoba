# Project Plan

## 1. Problem - What problem are we solving?

Diz Toba is a London-based singer-songwriter, performer and musician. diztoba.com
should be the lasting official home for the artist: one place that always shows
the latest music, upcoming shows and a way to stay in touch, and that grows over
time into a full artist hub (music catalogue, gigs, videos, press kit).

Today the site is a single page built around the Venom & Lemonade release, with a
signup form whose submission backend is unconfirmed. The aim is to turn it into a
maintainable, data-driven hub where adding a release or a gig is a content edit,
not a code change.

It is not a one-off release campaign page that gets thrown away each release.

## 2. Users - Who is this for?

In priority order:

1. **Fans** (primary): listen to the latest release, follow on socials, join the
   mailing list, see upcoming gigs.
2. **Promoters and bookers**: see live presence and upcoming shows, get in touch
   about bookings. (Booking contact and live footage come with later pages.)
3. **Press and blogs**: bio, press photos and release info. (Press kit is later.)

The site maintainer (the developer) is the only content editor.

## 3. Features - What does the MVP need?

The MVP is **Home plus a working mailing-list signup**.

Home shows:

- **Latest release**: artwork, title, listen-on links (Spotify, Apple Music,
  SoundCloud, etc.) and an embed (SoundCloud today). Driven by the most recent
  entry in the releases collection, so a new release needs no Home code change.
- **Short intro / bio line.**
- **Social links** (Instagram, SoundCloud, YouTube; already in `src/constants`).
- **Upcoming gig highlights**: the next few shows (date, venue, city, ticket
  link). When none are upcoming, show: "No shows announced yet. Join the mailing
  list to hear first."
- **Mailing-list signup** (see below).
- **Per-release theme**: Home takes the latest release's theme.
- **SEO and sharing polish**: page metadata, Open Graph / social share image.

Mailing-list signup:

- Fields: first name and email.
- Submitted to Netlify Forms (named form, honeypot spam field).
- Submits in place via the existing Alpine data factory, no page reload, with
  clear success and error states.
- Short consent line under the form stating what people are signing up for (new
  music and shows) and that they can unsubscribe at any time.
- No double opt-in yet; Netlify Forms cannot provide it. It comes with a proper
  mailing-list service later.

Housekeeping in the MVP:

- **No analytics.** Remove or disable the GA4 / Partytown wiring and the
  `GA_MEASUREMENT_ID` env var. Analytics would need a cookie consent decision for
  UK/EU visitors, which is deferred.
- `/theme` (palette preview) is a development tool and must be hidden from
  visitors (not linked, not indexed, ideally not shipped in production).

### Later (not MVP)

- Music / releases page (full catalogue, possibly a page per release)
- Live / gigs page with past-gig archive
- Videos page (YouTube embeds, live footage for bookers)
- About / press kit (bio, downloadable press photos, booking contact)
- News / blog
- Mailing-list service integration (Mailchimp, Buttondown, Kit, Brevo or
  similar) with double opt-in, replacing or feeding from Netlify Forms
- Privacy page (what is collected, why, how to unsubscribe, contact)
- Analytics, with a consent approach decided at that point
- Scheduled Netlify rebuild so past gigs drop off without a manual deploy
- Merch / shop, lyrics

## 4. Data - What are we storing?

No database. All content lives in the repo as Astro content collections, edited
by hand and deployed.

- **releases**: title, release date, artwork image, listen-on links (platform +
  URL), optional embed (e.g. SoundCloud URL), theme identifier. The latest
  release (by date) drives Home.
- **gigs**: date, venue, city, optional ticket URL, optional notes. Upcoming vs
  past is decided by date at build time, so a past gig only disappears from Home
  after the next build.
- **site constants**: name, description, social links (existing
  `src/constants/index.ts`).
- **Signups** (first name, email) are not stored by the site. They are held by
  Netlify Forms and later moved to a mailing-list service. This is personal data,
  so collect only these two fields and state the purpose next to the form.

## 5. Tech - What stack are we using?

Established, no changes planned:

- Astro 7 static site, TypeScript strict
- Tailwind CSS 4 (CSS-first), forms and typography plugins, themes in
  `src/styles/themes/`
- Alpine.js for interactivity, logic in testable data factories
- astro-icon, astro-seo, local fonts
- Vite+ (`vp`) toolchain with pnpm, Node 22, Vitest via `vp test`

Removed in the MVP: Google Analytics via Partytown (`@astrojs/partytown`,
`GA_MEASUREMENT_ID`), unless kept installed but unused is simpler; decide in the
feature spec.

No CMS, no external data APIs, no server runtime.

## 6. Monetize - How will this make money?

The site does not make money directly. It supports the artist's career: building
the mailing list, driving streams and ticket sales, and making bookings and press
easier. Merch is a possible later addition.

## 7. UI/UX - How should this look and feel?

- A stable base layout with a **per-release theme**: each release brings its own
  theme (colours, possibly background imagery) in `src/styles/themes/`, and Home
  applies the latest release's theme. Venom & Lemonade (lemon and riviera
  palettes) is the first.
- Single-column, artwork-led, mobile first; most fans arrive from social links on
  a phone.
- Accessible: real labels on form fields, visible focus states, sufficient
  contrast within each theme, alt text on artwork, screen-reader text for icon
  links (already present).

## 8. Deployment - Where and how will this ship?

- Host: Netlify, static site.
- Build command: `vp run build` (Astro), output directory `dist/`.
- Node 22 (`.node-version`), pnpm.
- Env vars: `SITE` (site URL). `GA_MEASUREMENT_ID` removed with analytics.
- Netlify Forms: the signup form must be detectable at build time (static HTML
  form with `data-netlify` / `netlify` attribute and `form-name` field).
- Domain: diztoba.com.
- No database, workers or cron in the MVP. A scheduled rebuild for gig dates is a
  later option.

## 9. Usage model and constraints (optional)

- Public, internet-facing static site; visitors are anonymous.
- Single editor (the maintainer); no accounts, no auth, no admin UI.
- Personal data is limited to mailing-list signups (first name, email) held by
  Netlify Forms. UK/EU visitors expected, so no non-essential cookies in the MVP.
- Explicit non-requirements: CMS, user accounts, multi-language, e-commerce.

### TODOs and open decisions

- TODO: privacy page (deferred; consent line only in the MVP).
- TODO: choose the mailing-list service and migration path from Netlify Forms.
- TODO: decide analytics and cookie consent when analytics returns.
- Assumption: gigs are entered manually, not pulled from Bandsintown/Songkick.
- Assumption: hosting is Netlify (implied by the Netlify Forms choice).
