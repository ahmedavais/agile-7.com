# agile-7.com

Ahmed Avais's site for Agile-7. It used to be a WordPress blog and services site; this is the rebuild.
The first version has Home, About, Writing and Let's talk; `docs/plan.md` tracks what's left.

## Purpose

agile-7.com shows engineering leaders what Ahmed has done and can do: build healthy teams, make change stick and lead well in complex systems. People who hear about him can see the proof and reach out for consulting, speaking or 1:1 leadership development.

- Proof over pitch. Work has always come through people who knew Ahmed, so the site backs up a name someone already heard. Show real work and outcomes; avoid service menus and modest labels like "facilitator".
- Engineering leaders come first. Agile coaches and change-minded people are welcome readers but not the target.
- One ask on every page: "let's talk". It covers consulting, speaking and other conversations without naming a specific path.
- AI is the current chapter, not the brand. The brand is systems and complexity; AI shows up as current proof (the newest writing, About's "Teams and AI", the AI topic on Let's talk), never in taglines on its own.
- Topics: team health, change management, AI-era teamwork, executive development, agile games, XP and TDD. Scrum Master work is out of scope.
- Never name Ahmed's current employer. Describe current work generically ("my teams"); the employer is not a hook for consulting.
- ahmedavais.com gets a quiet link, not a feature.
- The 2020 blog posts stay, with their old WordPress URLs redirected. Everything else from the old site is raw material, not something to preserve.

## Stack

- Astro 7, fully static output (`dist/`).
- Hosted as Cloudflare Worker static assets (`wrangler.jsonc`). No server code.
- CI/CD: `.github/workflows/ci.yml`. PRs get a preview URL, `main` deploys to production.
- Same setup as ahmedavais.com. Follow its patterns unless there's a reason not to.

## Commands

- `npm run dev`: dev server at http://localhost:4321. Agents: `npx astro dev --background`, stop with `npx astro dev stop`.
- `npm run verify`: typecheck + tests + build. Run before calling any change done; CI runs the same.
- `npm run preview`: build and serve through wrangler, the same way production serves it.

## Layout

- `docs/plan.md`: the pages planned for the first version, the steps to build them, and open questions.
- `src/pages/`: one file per route.
- `src/content/writing/<slug>.md` (or `.mdx` when a post uses a component such as `FlowDiagram`): one per post, served at `/writing/<slug>`. Frontmatter schema in `src/content.config.ts`. The 2020 posts keep their WordPress slugs.
- `public/_redirects`: 301s from old WordPress URLs to their new home. Cloudflare applies it before serving assets.
- `src/lib/`: pure logic, with `*.test.ts` next to it (vitest). Pages only render.
- `src/layouts/Base.astro`: shared shell for every page: head, header, footer.
- `src/components/`: pieces of the shell. `SiteFooter` carries the "let's talk" ask that ends every page except Let's talk itself (`ask={false}` on `Base`). `FlowDiagram` draws a left-to-right flow that stacks on phones; use it for diagrams instead of ASCII or images. `SystemsJourney` is the machines → teams → teams + AI diagram shared by Home and About.
- `src/styles/global.css`: design tokens and shared styles.
- `public/share-image.png`: the link-preview card every page uses (`og:image`). Its source is `design/share-image.html`; after editing it, re-render with Chrome headless: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --force-device-scale-factor=1 --virtual-time-budget=5000 --window-size=1200,630 --screenshot="$PWD/public/share-image.png" "file://$PWD/design/share-image.html"`.
- Fonts are self-hosted through Astro's font support (`fonts` in `astro.config.mjs`). Don't load fonts from third-party servers.

## Conventions

- Write in American English: organization, center, recognize, practiced, judgment. The audience is American.
- Pages work at 375px wide and respect `prefers-color-scheme`.
- Never commit secrets. Cloudflare credentials live only in GitHub Actions secrets.
- After a visual change, check it in the browser at desktop and mobile widths.
