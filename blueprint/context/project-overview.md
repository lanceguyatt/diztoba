# Diz Toba - Project Overview

<!-- blueprint:source-hash e3547fae5a248cf88bead1151c4c6119579f5f88b6f0654f4d5d730dee864357 -->

> Lasting official artist hub for Diz Toba, London-based singer-songwriter and performer, at diztoba.com.

## Problem

diztoba.com is currently a single page built around the Venom & Lemonade release,
with a signup form whose backend is unconfirmed. It needs to become a maintainable,
data-driven hub where adding a release or a gig is a content edit, not a code
change, and that grows into a full artist site over time. It is not a throwaway
per-release campaign page.

## Users

All visitors are anonymous; there are no accounts.

1. **Fans** (primary) - listen to the latest release, follow socials, join the
   mailing list, see upcoming gigs.
2. **Promoters and bookers** - see live presence and upcoming shows; booking
   contact and live footage arrive with later pages.
3. **Press and blogs** - bio, photos, release info; press kit is later.

The maintainer (developer) is the only content editor.

## Usage model

- Public, internet-facing static site; anonymous visitors.
- Single editor, no accounts, auth or admin UI.
- Personal data limited to mailing-list signups (first name, email), held by
  Netlify Forms, not the site.
- UK/EU visitors expected: no non-essential cookies in the MVP.
- Non-requirements: CMS, user accounts, multi-language, e-commerce.

## Features

MVP: **Home plus a working mailing-list signup**. Headline feature: the
data-driven Home.

1. **Latest release on Home** - `releases` collection; Home shows the latest
   release's artwork, title, listen-on links, embed and a short intro line.
2. **Per-release theming** - Home applies the latest release's theme; `/theme`
   hidden from visitors in production.
3. **Upcoming gigs on Home** - `gigs` collection; next few shows, with the empty
   state "No shows announced yet. Join the mailing list to hear first."
4. **Mailing-list signup on Netlify Forms** - first name and email, honeypot,
   consent line, in-place success and error states via the Alpine data factory.
5. **Remove analytics** - drop GA4, Partytown and `GA_MEASUREMENT_ID`.
6. **SEO and sharing** - page metadata and Open Graph share image.
7. **Netlify deployment** - build settings, env vars, form detection, diztoba.com.

Later (unscheduled): Music/releases page, Live/gigs page with past archive,
Videos, About/press kit with booking contact, News, mailing-list service with
double opt-in, privacy page, analytics with consent, scheduled rebuild for gig
dates, merch, lyrics.

## Data model

No database. Content is Astro content collections in the repo, edited by hand.

### Release (`releases` collection)

- `id` (string, entry slug) - e.g. `venom-and-lemonade`
- `title` (string)
- `releaseDate` (date) - latest by date drives Home
- `artwork` (image, via Astro `image()`) - with required alt text
- `links` (array of `{ platform: string, url: url }`) - listen-on links
- `embed` (url, optional) - e.g. SoundCloud player URL
- `theme` (string) - identifier of a theme file in `src/styles/themes/`

> Locked by features 1 and 2; the later Music page reuses this shape.

### Gig (`gigs` collection)

- `id` (string, entry slug)
- `date` (date)
- `venue` (string)
- `city` (string)
- `ticketUrl` (url, optional)
- `notes` (string, optional)

Upcoming vs past is computed from `date` at build time; a past gig leaves Home
only after the next build.

> Locked by feature 3; the later Live page reuses this shape.

### Signup submission (Netlify Forms, not stored by the site)

- `form-name` (string) - the named Netlify form
- `firstName` (string, required)
- `email` (email, required)
- honeypot field (string, must be empty)

### Site constants (`src/constants/index.ts`, existing)

- `name`, `description`, `url` (from `SITE`), `image.secure_url`
- `socials` (array of `{ name, url, icon }`) - Instagram, SoundCloud, YouTube

## Tech stack

- **Astro 7** - static site, content collections, `astro:env`, `astro:assets`
- **TypeScript (strict)** - throughout
- **Tailwind CSS 4** - CSS-first styling, per-release themes in `src/styles/themes/`
- **Alpine.js** - client interactivity, logic in testable data factories
- **astro-icon, astro-seo, local fonts** - icons, metadata, typography
- **Netlify Forms** - signup collection
- **Vite+ (`vp`), pnpm, Node 22, Vitest** - toolchain and unit tests

No CMS, external data APIs or server runtime. Partytown/GA are removed in
feature 5.

## Monetization

Not direct. The site supports the artist's career: mailing list growth, streams,
ticket sales, bookings and press. Merch is a possible later addition.

## UI/UX

Stable base layout with a per-release theme (Venom & Lemonade, lemon and riviera
palettes, is first). Single-column, artwork-led, mobile first. Accessible: real
form labels, visible focus, theme contrast, artwork alt text, screen-reader text
on icon links.

- `/` - Home: latest release, intro line, socials, upcoming gigs, signup
- `/theme` - palette preview, development only, hidden from visitors

## Deployment

- Host: Netlify, static site
- Build: `vp run build`, output `dist/`; Node 22, pnpm
- Env vars: `SITE`; `GA_MEASUREMENT_ID` removed with analytics
- Netlify Forms: signup form must be detectable in the static HTML at build time
- Domain: diztoba.com
- No database, workers or cron in the MVP

## Open questions

> - TODO: where the Home intro/bio line lives (site constants or release entry).
> - TODO: how many upcoming gigs Home shows, and the timezone for date cutoff.
> - TODO: how `/theme` is hidden (excluded from the production build or `noindex`).
> - TODO: uninstall `@astrojs/partytown` or only disable it (feature 5 spec).
> - TODO: privacy page (deferred; consent line only in the MVP).
> - TODO: mailing-list service choice and migration from Netlify Forms.
> - TODO: analytics and cookie consent when analytics returns.
> - Assumption: gigs entered manually; hosting is Netlify.
> - Order note: signup (4) and deployment (7) come after content features, so the
>   live list starts growing later. Move them up in `build-plan.md` if preferred.
