# agile-7.com

Ahmed Avais's site for Agile 7. It used to be a WordPress blog and services site; this is the rebuild.
The site has Home, Work, About and Writing; `docs/plan.md` tracks what's left.

## Purpose

agile-7.com shows engineering leaders what Ahmed has done and can do: build healthy teams, make change stick and lead well in complex systems. People who hear about him can see the proof, whether they're weighing a consulting engagement, a talk, 1:1 leadership development or hiring him into a leadership role. The site doesn't announce a job search.

- Proof over pitch. Work has always come through people who knew Ahmed, so the site backs up a name someone already heard. Show real work and outcomes; avoid service menus and modest labels like "facilitator".
- Engineering leaders come first. Agile coaches and change-minded people are welcome readers but not the target.
- One ask on every page: compare notes. It's an invitation between peers, not a sales pitch, and it points at LinkedIn first, where conversations actually start, then email. There's no contact page or services menu; nobody used them.
- AI is the current chapter, not the brand. The brand is systems and complexity; AI shows up as current proof (the newest writing, About's "Teams and AI"), never in taglines on its own.
- Topics: team health, change management, AI-era teamwork, executive development, agile games, XP and TDD. Scrum Master work is out of scope.
- Never name Ahmed's current or past employers, to the best of our ability. Describe the work generically ("teams I work with", "teams in finance"), and leave out the details that would pin current work to one workplace, such as his job title, "we're a remote company" or a named method his teams use (FaST, for example). Describing how his teams work, such as how they estimate, is fine. Saying he leads teams ("my teams") is fine; an employer is not a hook for consulting. A link to his own writing on a former employer's site is fine; the link text names the piece, not the company.
- ahmedavais.com gets a quiet link, not a feature.
- The 2020 blog posts stay, with their old WordPress URLs redirected. Everything else from the old site is raw material, not something to preserve.

## Stack

- Astro 7, fully static output (`dist/`).
- Hosted as Cloudflare Worker static assets (`wrangler.jsonc`). No server code.
- CI/CD: `.github/workflows/ci.yml`. PRs get a preview URL, `main` deploys to production.
- Duplication: the `duplication` job in `.github/workflows/ci.yml`, shared from [karkhana](https://github.com/ahmedavais/karkhana), fails when a change adds code duplicated elsewhere in the repo, tests included. `.jscpd.json` skips `package-lock.json`.
- Habit Hooks: `.habit-hooks/config.toml` opts this repo into Ahmed's global Claude Code Stop hook. When Claude stops, it checks what the branch changed for structural smells and hands Claude a coaching guide for each. The limits come from `eslint.config.js`; knip, configured in `knip.json` with `sensors/` as entry points, finds unused exports and dependencies. It needs `npm ci`, since knip and ts-morph are dev dependencies. Main was clean when it was adopted (2026-10-18), apart from one long test function. The config also routes karkhana's two test-file length rules: a long `it` gets the usual oversized-function guide, and a long `describe` gets karkhana's module guide through the symlink in `.habit-hooks/generic/guides/`.
- Adversarial review: `.github/workflows/adversarial-review.yml` has Claude Code review every PR with the shared workflow and brief from [karkhana](https://github.com/ahmedavais/karkhana). Comments only. The reviewer takes this repo's checks and conventions from this file, so keep them current here.
- Dependency updates: `renovate.json` follows the shared Renovate policy in [karkhana](https://github.com/ahmedavais/karkhana). Patch and minor updates arrive as one pull request on Mondays, plus a lock file refresh, and merge themselves once every check passes. Majors stay open for Ahmed. When CI fails on a Renovate pull request, the `failed-update-alarm` job in `.github/workflows/ci.yml` assigns it to Ahmed; its `needs` lists every other pull request job, so add a new job there too. The adversarial review skips Renovate's pull requests.
- Watch production: `.github/workflows/watch-production.yml`, with steps shared from [karkhana](https://github.com/ahmedavais/karkhana), runs the live checks in `sensors/live/` after every deploy, daily and on demand. A failed run is the alarm (GitHub emails it); there's no issue tracker in the loop.
- Same setup as ahmedavais.com. Follow its patterns unless there's a reason not to.
- ahmedavais.com (`../ahmedavais.com`) has its own repo and its own session. Read it for patterns, but never change it from here; hand anything found there to Ahmed as a note to paste into that session.

## Commands

- `npm run dev`: dev server at http://localhost:4321. Agents: `npx astro dev --background`, stop with `npx astro dev stop`.
- `npm run verify`: typecheck + lint + spelling + tests + build + sensors + browser sensors. Run before calling any change done; CI runs the same.
- `npm run lint`: ESLint with type-aware TypeScript and Astro rules (`eslint.config.js`). Lint only, no formatter. The structural limits come from karkhana's `karkhana/eslint-limits`, pinned in the lock file (`npm install --save-dev github:ahmedavais/karkhana` takes a newer one): more than 3 parameters, complexity over 10 and nesting deeper than 4 are errors; a function over 30 lines is a warning, so CI stays green while Habit Hooks coaches it when touched. In test files a `describe` block may run to 100 lines, since past that it says more about the module under test than the test.
- `npm run sense`: sensors in `sensors/` that check the built site in `dist/` (run after `npm run build`): every internal link and every `_redirects` target resolves to a built page or asset, every page's description is at least 100 characters, the minimum LinkedIn wants for a link preview, and every post and case study points at its own link-preview card.
- `npm run sense:browser`: Playwright in `sensors/browser/` opens every built page at 375px (touch) and 1280px, in light and dark mode, and fails on sideways scroll, console errors or serious accessibility problems (axe). Uses your Chrome locally; CI installs Chromium. Under Claude Code, its preview server runs with `CLAUDECODE` cleared, because Astro otherwise backgrounds itself and Playwright thinks the server died.
- `npm run watch-production`: live checks against production (`SITE_URL` overrides the site): every sitemap page answers whole in the site shell, every old WordPress URL answers 301 to its new home, and the ahmedavais.com links answer.
- `npm run preview`: build and serve through wrangler, the same way production serves it.

## Layout

- `docs/plan.md`: the pages planned for the first version, the steps to build them, and open questions.
- `src/pages/`: one file per route.
- `src/content/writing/<slug>.md` (or `.mdx` when a post uses a component such as `FlowDiagram`): one per post, served at `/writing/<slug>`. Frontmatter schema in `src/content.config.ts`. A post that first appeared elsewhere (such as the Dynamical Change newsletter on Substack) sets `canonical` to that URL; otherwise the page is its own canonical. The 2020 posts keep their WordPress slugs.
- `src/content/work/<slug>.mdx`: one case study per engagement, served at `/work/<slug>`. Proof, not opinion: a real situation, the setback, what changed, what happened. Clients stay unnamed and described broadly enough that no single one is identifiable.
- `public/_redirects`: 301s from old WordPress URLs to their new home. Cloudflare applies it before serving assets. `npm run sense` fails if a target doesn't exist.
- `src/lib/`: pure logic (`newestFirst` orders both Writing and Work; `publicPath` turns a built page like `/about.html` into its public URL `/about`, used for canonical links; `site-links` finds a page's internal links and redirect targets and checks them against the built files, used by the sensors; `live-checks` reads the live sitemap and recognizes a whole page in the site shell, used by the production watch; `bar-layout` places each bar of a `BarChart` relative to a zero line; `page-meta` reads a built page's meta description and link-preview image, used by the sensors; `share-card` draws a post's or case study's link-preview card and names its path), with `*.test.ts` next to it (vitest). Pages only render.
- `src/layouts/Base.astro`: shared shell for every page: head, header, footer.
- `src/components/`: pieces of the shell. `SiteFooter` carries the "Compare notes" ask that ends every page. `FlowDiagram` draws a left-to-right flow that stacks on phones; use it for diagrams instead of ASCII or images. `SystemsJourney` is the machines → teams → teams + AI diagram shared by Home and About. `LatestEntry` is the "latest work" and "latest writing" teaser on Home. `BarChart` draws a titled bar chart from rows of values in HTML (negative values grow left of a zero line; one row or more can be highlighted in the accent color), and `Spectrum` lays out a few options along a scale with one highlighted; both stack on phones and follow the theme. Use them for charts instead of images.
- `src/assets/`: images that Astro optimizes at build time, such as Ahmed's headshot on About. Use `<Image>` from `astro:assets` for them.
- `src/assets/agile7-mark.svg`: the seven-leaf Agile 7 mark, extracted as vector paths from the designer's Illustrator file. It draws in `currentColor`; the header colors it with `--brand-teal`. `public/favicon.svg` is the same mark in brand teal. The full AGILE7 wordmark is deliberately not used on the site.
- `src/styles/global.css`: design tokens and shared styles.
- `src/pages/share/[section]/[slug].png.ts`: builds a 1200×630 link-preview card (`og:image`) for every post and case study at build time, served at `/share/writing/<slug>.png` and `/share/work/<slug>.png`, so each one looks different when shared on LinkedIn. The card shows the title in the site's fonts, set smaller past 60 characters so it stays within the card (about 130 characters fit); `share-card` draws it with satori (layout to SVG) and resvg (SVG to PNG), reading the fonts from the `@fontsource` packages. Satori sizes boxes without their padding unless told `boxSizing: 'border-box'`, and it ignores `margin: auto`; push things apart with `flexGrow`.
- `public/share-image.png`: the link-preview card every other page uses (`og:image`). Its source is `design/share-image.html`; after editing it, re-render with Chrome headless: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --force-device-scale-factor=1 --virtual-time-budget=5000 --window-size=1200,630 --screenshot="$PWD/public/share-image.png" "file://$PWD/design/share-image.html"`.
- `design/linkedin/`: the Agile 7 LinkedIn company page's logo (400×400) and cover (1128×191), each an HTML source with its rendered PNG. They aren't served by the site; upload the PNGs to LinkedIn by hand. Re-render with the same Chrome headless command, using the source's size, and `--force-device-scale-factor=2` for the cover. On phones LinkedIn shows only about 25–70% of the cover's width clear of the logo, so keep text inside that band.
- Analytics: Cloudflare Web Analytics, switched on in the Cloudflare dashboard, which injects its own small script at the edge. Nothing in this repo adds it, and no other trackers belong on the site.
- Fonts are self-hosted through Astro's font support (`fonts` in `astro.config.mjs`). Don't load fonts from third-party servers.

## Writing

Ahmed writes everything published under his name: posts, newsletter pieces and page copy. Agents don't draft that prose. LinkedIn posts work differently (below).

- Before the writing, agents help him understand the landscape and expand his thinking: research, questions, counterpoints and angles he hasn't considered.
- Ahmed writes once (or records a voice memo and transcribes it) and edits once.
- After the writing, agents check grammar, spelling and American English, and check facts against their source, such as the tool or the case notes. They fix a sentence; they don't replace it.
- From a transcript, agents keep his words and only clean up what speech leaves behind: false starts, repeats and punctuation.
- Sources are linked inline, where they're used. A Sources list at the end only for pieces that rest on studies with numbers, such as "The AI productivity trap", so a reader checking the numbers finds them in one place. Never list Ahmed's own work there; the body already links it.
- LinkedIn posts are the exception: agents may draft the bones of a post, meaning its structure and sentences lifted from the piece it announces, which Ahmed wrote. He edits before posting.
- These rules are a work in progress. Ahmed adjusts them as he learns what works; follow the latest version.

## Conventions

- The name: "Agile 7" in prose, page titles and anywhere it's read as a name (the company is Agile 7, Inc). "agile-7" only as the header wordmark and in the domain. Never "Agile-7".
- Write in American English: organization, center, recognize, practiced, judgment. The audience is American. `npm run spell` (cspell, en-US, `cspell.json`) fails on British spellings and unknown words; add real names and terms to `words`, and British forms the en-US dictionary still accepts to `flagWords`.
- Pages work at 375px wide and respect `prefers-color-scheme`.
- Never commit secrets. Cloudflare credentials live only in GitHub Actions secrets.
- After a visual change, check it in the browser at desktop and mobile widths; `npm run sense:browser` checks every page for sideways scroll, console errors and accessibility problems, not for how it looks.
