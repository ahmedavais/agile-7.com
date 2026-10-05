# agile-7.com

Ahmed Avais's site for Agile-7. It used to be a WordPress blog and services site; this is the rebuild.
Right now it is only the foundation: one placeholder page, deployed.

## Purpose

agile-7.com shows engineering leaders what Ahmed has done and can do: build healthy teams, make change stick, and work well with AI. People who hear about him can see the proof and reach out for consulting, speaking or 1:1 leadership development.

- Proof over pitch. Work has always come through people who knew Ahmed, so the site backs up a name someone already heard. Show real work and outcomes; avoid service menus and modest labels like "facilitator".
- Engineering leaders come first. Agile coaches and change-minded people are welcome readers but not the target.
- One ask on every page: "let's talk". It covers consulting, speaking and other conversations without naming a specific path.
- Topics: team health, change management, AI-era teamwork, executive development, agile games, XP and TDD. Scrum Master work is out of scope.
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
- `src/content/writing/<slug>.md`: one per post, served at `/writing/<slug>`. Frontmatter schema in `src/content.config.ts`. The 2020 posts keep their WordPress slugs.
- `public/_redirects`: 301s from old WordPress URLs to their new home. Cloudflare applies it before serving assets.
- `src/lib/`: pure logic, with `*.test.ts` next to it (vitest). Pages only render.
- `src/layouts/Base.astro`: shared shell for every page: head, header, footer.
- `src/components/`: pieces of the shell. `SiteFooter` carries the "let's talk" ask that ends every page except Let's talk itself (`ask={false}` on `Base`). `FlowDiagram` draws a left-to-right flow that stacks on phones; use it for diagrams instead of ASCII or images.
- `src/styles/global.css`: design tokens and shared styles.
- Fonts are self-hosted through Astro's font support (`fonts` in `astro.config.mjs`). Don't load fonts from third-party servers.

## Conventions

- Pages work at 375px wide and respect `prefers-color-scheme`.
- Never commit secrets. Cloudflare credentials live only in GitHub Actions secrets.
- After a visual change, check it in the browser at desktop and mobile widths.
