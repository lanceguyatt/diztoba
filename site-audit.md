# Website audit: Diz Toba

- **Site:** diztoba.com, audited from a local production build of branch `2026` at `77ad841` plus uncommitted changes (`dist/`)
- **Date:** 26 October 2026 (fourth run)
- **Organisation type:** general
- **Overall grade: B (15 / 17 points, 88%)**, up from 14, 12.5 and 11 on earlier runs

| Dimension       | Score  | Checks            |
| --------------- | ------ | ----------------- |
| Accessibility   | 9 / 10 | 4 pass, 1 partial |
| Usability       | 8 / 10 | 3 pass, 1 partial |
| SEO             | 9 / 10 | 5 pass, 1 partial |
| GEO (AI search) | 7 / 10 | 1 pass, 1 partial |

Every fix from the earlier runs that touched site files, data or config is now done. The four remaining partial results are content or small code changes. Fixing items 1 and 2 would raise the score to 16 / 17 (A, 94%); all four would give 17 / 17.

## Fixed since the last run

- **Show date** is now 16 March 2027, so the Walter gig at The Garage is listed and published as a valid `MusicEvent`. `addressCountry` replaces `postalCountry`.
- **Contact link** is underlined (check 8 moves to PASS).
- **Sitemap** is referenced from `robots.txt` and no longer lists `/theme/` (checks 13 and 14 pass in full).
- **YouTube** now uses the `@diztoba` handle. `public/llms.txt` was updated to match during this run.
- **`netlify.toml`** added with the build command, `dist` and `SITE`.
- **`noindex={false}`** removed from `src/pages/index.astro`.

## Priority fixes

1. **Show a message when sign-up fails.** The `catch` in `src/components/signupForm/signup-form.ts:47` only logs to the console, so a failed request looks like nothing happened (check 4).
2. **Add streaming links and fix brand names.** The single has no Spotify or Apple Music link, and the buttons still say "Soundcloud" and "Youtube" instead of "SoundCloud" and "YouTube" (`src/constants/index.ts`; check 9).
3. **Put "Diz Toba" in the `h1`.** The `h1` is the single's title; the artist name appears only in a small `<p>` (check 12).
4. **Add `MusicRecording` structured data for the single** so search engines and AI assistants can connect "Venom & Lemonade" to Diz Toba (check 16).

## Checks

### Accessibility

| #   | Check                  | Result  | Notes                                                                                                                                       |
| --- | ---------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Page language          | PASS    | `lang="en-GB"`                                                                                                                              |
| 2   | Image alternative text | PASS    | Descriptive, correctly escaped                                                                                                              |
| 3   | Headings and landmarks | PASS    | One `h1`, `main` and `footer`, sections labelled by their headings                                                                          |
| 4   | Forms                  | PARTIAL | Visible labels, `autocomplete`, `aria-invalid`, focus moves to the first error. A failed network request gives the user no message (fix 1). |
| 5   | Colour contrast        | PASS    | Calculated from theme tokens. Body and muted text are 5.2:1 or higher, button text 11.3:1, input border 3.8:1, focus rings 4.7:1 or higher  |

### Usability

| #   | Check                 | Result  | Notes                                                                          |
| --- | --------------------- | ------- | ------------------------------------------------------------------------------ |
| 6   | Mobile                | PASS    | Viewport set, single-column layout capped at `max-w-xl`                        |
| 7   | Clear calls to action | PASS    | Listen, the upcoming show and Sign up are visible on first view                |
| 8   | Contact information   | PASS    | Underlined `mailto:` link in the footer                                        |
| 9   | Online services       | PARTIAL | No Spotify or Apple Music link; "Soundcloud" and "Youtube" brand names (fix 2) |

### SEO

| #   | Check                      | Result  | Notes                                                                                                                                                  |
| --- | -------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 10  | HTTPS and canonical        | PASS    | Canonical is `https://diztoba.com/`. The live certificate and redirects weren't checked (local build).                                                 |
| 11  | Title and meta description | PASS    | Title is 47 characters, description 139 characters, both name the artist and location                                                                  |
| 12  | H1                         | PARTIAL | The `h1` is the single's title, not the artist name (fix 3)                                                                                            |
| 13  | robots.txt and sitemap     | PASS    | `robots.txt` allows all crawlers and references `sitemap-index.xml`                                                                                    |
| 14  | Index hygiene              | PASS    | Homepage is indexable and the only URL in the sitemap; `/theme/` is `noindex, nofollow`                                                                |
| 15  | Social sharing             | PASS    | Full Open Graph and Twitter tags with image alt text. The share image is the logo; the release artwork might share better while the single is current. |

### GEO (AI search readiness)

| #   | Check                          | Result  | Notes                                                                                                                                                    |
| --- | ------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 16  | Structured data                | PARTIAL | `WebSite`, `WebPage`, `Person` with `@id` and `sameAs`, and a complete `MusicEvent` with full address and free-entry offer. No `MusicRecording` (fix 4). |
| 17  | llms.txt and AI crawler access | PASS    | `llms.txt` present; `robots.txt` allows all crawlers                                                                                                     |

## Worth checking

- `twitter:creator` is `@dtoba` but every other profile uses `diztoba`. Confirm it's the right account.
- Netlify only captures the sign-up form if form detection is enabled for the site in the Netlify dashboard. Submit the live form once after deploying and confirm the entry arrives.
- Google recommends an `image` on events for rich results. The Walter `MusicEvent` has none; the show schema already accepts one.
- `public/llms.txt` names "Venom & Lemonade" as the latest release. Update it with the next release.
- Every page ships an inline Partytown loader, but this build loads no third-party scripts because `GA_MEASUREMENT_ID` was unset. If analytics is live in production, that's expected. Otherwise the integration can go.

## Not covered

This audit read the built HTML and CSS. It did not check the live server: TLS, redirects, security headers, caching, real-device performance and form delivery all need a check against https://diztoba.com.

## Method

The plugin used for this audit doesn't include its scoring files or PDF generator, so this report is Markdown and uses these rules: 17 checks, each scored PASS = 1, PARTIAL = 0.5, FAIL = 0. Each dimension score is its share of points out of 10, rounded down. The overall grade uses the total share: A ≥ 90%, B ≥ 80%, C ≥ 70%, D ≥ 60%, F below 60%.
