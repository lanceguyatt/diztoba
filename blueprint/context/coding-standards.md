# Coding Standards

> Conventions for the Diz Toba Astro site. Review and adjust as the project grows.

## TypeScript

- Extends `astro/tsconfigs/strict`, with `noImplicitAny: false` set in `tsconfig.json`
- Avoid `any`; use proper types or `unknown`
- Define interfaces for component props and data shapes
- Use type inference where obvious, explicit types where helpful
- Shared ambient types live in `src/types/` (for example `alpine.d.ts`)

## Astro

- `.astro` components and static output; no server adapter
- Keep components focused - one job per component
- Declare environment variables in the `astro:env` schema in `astro.config.mjs`
  (currently `SITE` and `GA_MEASUREMENT_ID`) and read them through `astro:env`
- Fonts are local, configured in `astro.config.mjs` from `src/fonts/`
- Icons come from astro-icon; add any new Iconify set to the `include` list
- SEO metadata through astro-seo; third-party analytics run through Partytown

## Client Interactivity

- Alpine.js, with plugins and async components registered in `src/scripts/main.ts`
- Put component logic in a default-exported data factory in a `scripts/*.ts` file
  next to the component (see `src/components/signupForm/scripts/`), so it can be
  unit tested; keep `x-` attributes in the markup thin

## File Organization

- Pages: `src/pages/`
- Layouts: `src/layouts/`
- Features: `src/features/<name>/` with an `index.ts` barrel
- Components: `src/components/ComponentName.astro`, or a folder such as
  `src/components/dialog/` for multi-part components (with an `index.ts` barrel
  where it exports several parts)
- Utils: `src/utils/`; constants: `src/constants/`
- Assets: `src/icons/`, `src/fonts/`, `src/images/`
- Import from `src` through the `@/` alias

## Naming

- Components: PascalCase (`SignupForm.astro`)
- Scripts and other TypeScript files: kebab-case (`signup-form.ts`)
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Types/Interfaces: PascalCase (no prefix)

## Styling

- Tailwind CSS 4, CSS-first config in `src/styles/main.css`, no `tailwind.config.js`
- Themes live in `src/styles/themes/` (`*.theme.css`)
- Merge conditional classes with `cn()` from `@/utils`
- Forms and typography plugins are installed
- No inline styles

## Formatting and Linting

- oxfmt and oxlint through Vite+, configured in `vite.config.ts`: single quotes,
  no semicolons, print width 100, sorted imports and Tailwind classes
- Import from `vite-plus` rather than `vite` or `vitest` (enforced by the
  `vite-plus/prefer-vite-plus-imports` lint rule)
- The pre-commit hook runs `vp check --fix` on staged files

## Data and Forms

- No database
- The signup form POSTs urlencoded data to `/`

> TODO: confirm the signup form submission backend and host form handling.

## Testing

The blueprint installs no test runner; testing is opt-in at the project level,
because the overlay can't know your stack. Adding unit testing is an explicit
setup task the AI can do through the normal workflow, either as a build-plan item
or with `/tests`. The setup should choose the stack-native runner, wire the
scripts or commands, add a small example test, and update the Commands section
of `AGENTS.md`.

When `AGENTS.md` declares a `Verify` command, treat it as the umbrella automated
gate. It combines only the checks this project actually has, in this order when
available: typecheck, tests, then build. The command does not enable an absent
test runner or replace focused evidence. It gives local work and optional CI one
exact command to run. `/ci` owns Verify and CI setup. `/tests` adds the real test
command to Verify when it already exists, but never creates CI only because
testing was configured.

**The opt-in switch is one signal: a `test` command in the Commands section of
`AGENTS.md`.** Declare one and **tests become a gate for logic-bearing steps**,
not an optional extra; leave it out and the loop verifies logic with the evidence
it already uses (run it, a screenshot, the build). Adding the runner is itself a
deliberate step, never a silent mid-step install. This is the single definition
of the switch; the skills and `ai-interaction.md` only point back here.

- **What to test (the scope rule):** pure logic where a wrong answer is possible -
  parsers, formatters, validators, id/slug builders, server actions. These have
  assertable inputs and outputs and real edge cases (empty, missing, malformed).
- **What not to test:** UI components and integration-level surfaces (render or
  export routes, anything driving a real browser or external service). Verify those
  with a screenshot and the build, not brittle unit tests.
- **The gate (when a runner is configured):** a build step that adds in-scope logic
  must ship a passing test in the same reviewable diff. The project's test command
  must be green before the step is approved, before any checkpoint commit, and
  before `/complete` merges. UI and integration-only steps are exempt and ride on
  screenshot plus build evidence.
- **When it's named:** the `/feature` spec's Testing section predicts the coverage,
  `/implement` writes the test with the step, and if a step surfaces logic the spec
  didn't foresee, add a focused test then.
- An empty suite should fail, not pass, so "no tests ran" never looks like "passed".
- Test files live next to source files (for example `feature.test.ts`).
- Run them via the project's test command (see Commands in `AGENTS.md`), not a
  hardcoded tool name.

Stack binding: Vitest through Vite+, run with `vp test`. Import test helpers from
`vite-plus/test`, not `vitest`. Tests run in happy-dom, use `vi.stubGlobal()` /
`vi.mock()` for browser and external dependencies (such as `fetch`), and
`vi.useFakeTimers()` for time-dependent logic. Alpine data factories are the main
unit-test target.

## Browser Verification

For UI and integration behavior, prefer real browser evidence over reading the
code and assuming it works.

- Browser automation is separately opt-in through `/tests browser`. That setup
  reuses a compatible runner or prefers Playwright for supported projects, then
  documents the exact command as `Browser tests` in `AGENTS.md`.
- When `Browser tests` is declared, add focused coverage for stable behavioral
  done-whens when it is proportionate, and run the documented command during
  `/check`. Do not assume it proves visual fidelity, real authenticated-profile
  behavior, browser chrome, or another claim the test does not observe.
- If no Browser tests command is declared, do not add a runner silently in the
  middle of an unrelated feature. Use the available dev server, browser
  screenshots, build output, API output, or manual evidence instead.
- Browser tests are not part of the default Verify command or CI unless the user
  separately chooses that slower gate.
- Browser evidence is especially important for flows that click, type, submit,
  navigate, download files, render complex layouts, or depend on client-side
  state.

## Code Quality

- No commented-out code unless specified
- No unused imports or variables
- Keep functions under 50 lines when possible

## Comments

Write code that explains itself; comment only what the code cannot say.
Over-commenting is a common AI tell, so resist it.

- Comment the **why**, not the **what**. Delete any comment that restates the code.
- No banner/header blocks, section dividers, or step-by-step narration of obvious
  code. A file does not need a comment announcing each region.
- A comment earns its place only when it captures something the code can't: a
  non-obvious decision, a gotcha or workaround, why a value is what it is, or a
  link to a spec or issue.
- Prefer self-documenting names and small functions over explanatory comments.
- Keep doc comments minimal: a one-line purpose on an exported type or function is
  plenty; don't write JSDoc that just repeats the signature.
- When in doubt, leave the comment out.

## Writing

- No em dashes (U+2014) in generated content: docs, comments, commit messages,
  READMEs, specs. They read as AI-generated.
- Use a hyphen for `term - description` separators; rephrase prose with commas,
  parentheses, or a colon. Avoid en dashes and the ellipsis character too.
- Use British spelling in docs and content, to match the existing site copy.
