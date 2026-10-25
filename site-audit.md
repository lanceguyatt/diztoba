# Website audit: Diz Toba

- **Site:** diztoba.com, audited from a local production build of branch `2026` at `316ad6d` (`dist/`)
- **Date:** 25 October 2026 (re-run after the `seo` commit)
- **Organisation type:** general
- **Overall grade: C (12.5 / 17 points, 74%)**, up from D (11 / 17) earlier today

| Dimension       | Score  | Checks                    |
| --------------- | ------ | ------------------------- |
| Accessibility   | 8 / 10 | 3 pass, 2 partial         |
| Usability       | 6 / 10 | 2 pass, 1 partial, 1 fail |
| SEO             | 8 / 10 | 4 pass, 2 partial         |
| GEO (AI search) | 5 / 10 | 2 partial                 |

The page itself is well built: correct language, labelled sections, a strong title and description, full social cards and AA contrast throughout. The `seo` commit added `robots.txt` and took `/theme/` out of the index. What's left is mostly placeholder data and missing site files, and each one is a small fix. Fixing the six priority items below would raise the score to 15.5 / 17 (A, 91%).

## Fixed since the last run

- **`robots.txt`** now exists and allows all crawlers (checks 13 and 17 move from FAIL to PARTIAL).
- **`/theme/`** now has `noindex, nofollow`, so its duplicate title no longer competes with the homepage (check 14 moves from PARTIAL to PASS).

## Priority fixes

1. **Replace the placeholder show before it goes live.** `src/content/shows.yaml` still publishes "Example Show" on 14 November, and its Tickets button links to a Blood Red Shoes event on Dice. The page shows it and the `MusicEvent` structured data sends it to Google. Search engines and AI assistants could list a gig that doesn't exist.
2. **Fix the double-escaped cover alt text.** `src/components/Release.astro:13` writes `&amp;` inside an attribute that Astro already escapes, so the built HTML contains `Venom &amp;amp; Lemonade`. Screen readers hear "Venom ampersand amp semicolon Lemonade". Change the attribute to `Venom & Lemonade cover: …`.
3. **Add a sitemap.** Add `@astrojs/sitemap` (the `site` setting is already configured) and a `Sitemap: https://diztoba.com/sitemap-index.xml` line to `public/robots.txt`. Exclude `/theme/` from the sitemap with the integration's `filter` option.
4. **Add a contact route.** The page has no booking, press or management contact. Promoters and journalists look for one, and AI assistants are often asked "how do I book …".
5. **Add `llms.txt`.** A short plain-text summary (who Diz Toba is, current release, links) in `public/llms.txt` is a cheap way to help AI search.
6. **Show a message when sign-up fails.** The `catch` in `src/components/signupForm/signup-form.ts:47` only logs to the console, so a failed request looks like nothing happened.

## Checks

### Accessibility

| #   | Check                  | Result  | Notes                                                                                                                                       |
| --- | ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Page language          | PASS    | `lang="en-GB"`                                                                                                                              |
| 2   | Image alternative text | PARTIAL | Descriptive alt text, but double-escaped (fix 2)                                                                                            |
| 3   | Headings and landmarks | PASS    | One `h1`, `main` and `footer`, sections labelled by their headings, a hidden label on the Tickets link                                      |
| 4   | Forms                  | PARTIAL | Visible labels, `autocomplete`, `aria-invalid`, focus moves to the first error. A failed network request gives the user no message (fix 6). |
| 5   | Colour contrast        | PASS    | Calculated from theme tokens. Body and muted text are 5.2:1 or higher, button text 11.3:1, input border 3.8:1, focus rings 4.7:1 or higher  |

### Usability

| #   | Check                 | Result  | Notes                                                                                                                                                                             |
| --- | --------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 6   | Mobile                | PASS    | Viewport set, single-column layout capped at `max-w-xl`                                                                                                                           |
| 7   | Clear calls to action | PASS    | Listen, Tickets and Sign up are all visible on first view                                                                                                                         |
| 8   | Contact information   | FAIL    | None (fix 4)                                                                                                                                                                      |
| 9   | Online services       | PARTIAL | The Tickets link is wrong (fix 1). The single has no Spotify or Apple Music link. Brand names are still written "Soundcloud" and "Youtube" instead of "SoundCloud" and "YouTube". |

### SEO

| #   | Check                      | Result  | Notes                                                                                                                                                  |
| --- | -------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 10  | HTTPS and canonical        | PASS    | Canonical is `https://diztoba.com/`. The live certificate and redirects weren't checked (local build).                                                 |
| 11  | Title and meta description | PASS    | Title is 47 characters, description 139 characters, both name the artist and location                                                                  |
| 12  | H1                         | PARTIAL | The `h1` is the single's title. "Diz Toba" appears only in a small `<p>`. Consider making the artist name the `h1` or putting it inside the `h1`.      |
| 13  | robots.txt and sitemap     | PARTIAL | `robots.txt` allows all crawlers. No sitemap, and `robots.txt` doesn't reference one (fix 3).                                                          |
| 14  | Index hygiene              | PASS    | Homepage is `index, follow`; `/theme/` is `noindex, nofollow`                                                                                          |
| 15  | Social sharing             | PASS    | Full Open Graph and Twitter tags with image alt text. The share image is the logo; the release artwork might share better while the single is current. |

### GEO (AI search readiness)

| #   | Check                          | Result  | Notes                                                                                                                                                                                             |
| --- | ------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 16  | Structured data                | PARTIAL | `WebSite`, `WebPage`, `Person` with `@id` and `sameAs`, and `MusicEvent` are all valid in structure. The event data is a placeholder (fix 1). The single has no `MusicRecording` or `MusicAlbum`. |
| 17  | llms.txt and AI crawler access | PARTIAL | `robots.txt` allows AI crawlers. No `llms.txt` (fix 5).                                                                                                                                           |

## Worth checking

- `sameAs` and the YouTube button use `https://youtube.com/diztoba`. YouTube channel addresses now use `@handle`, so confirm this address resolves.
- `twitter:creator` is `@dtoba` but every other profile uses `diztoba`. Confirm it's the right account.
- The sign-up form relies on Netlify Forms (`data-netlify`). The repo has no `netlify.toml`, so confirm the site is deployed on Netlify; otherwise the POST to `/` will fail and, until fix 6, the user sees nothing.
- `src/pages/index.astro` passes `noindex={false}`, which is already the default. It's harmless and can go.
- Every page ships about 7 KB of inline Partytown loader, but this build loads no third-party scripts because `GA_MEASUREMENT_ID` was unset. If analytics is live in production, that's expected. Otherwise the integration can go.

## Not covered

This audit read the built HTML and CSS. It did not check the live server: TLS, redirects, security headers, caching, real-device performance and form delivery all need a check against https://diztoba.com.

## Method

The plugin used for this audit doesn't include its scoring files or PDF generator, so this report is Markdown and uses these rules: 17 checks, each scored PASS = 1, PARTIAL = 0.5, FAIL = 0. Each dimension score is its share of points out of 10, rounded down. The overall grade uses the total share: A ≥ 90%, B ≥ 80%, C ≥ 70%, D ≥ 60%, F below 60%.
