# agile-7.com

Ahmed Avais's site for Agile-7. It used to be a WordPress blog and services site; this is the rebuild.
Right now it is only the foundation: one placeholder page, deployed.

## Stack

- Astro 7, fully static output (`dist/`).
- Hosted as Cloudflare Worker static assets (`wrangler.jsonc`). No server code.
- CI/CD: `.github/workflows/ci.yml`. PRs get a preview URL, `main` deploys to production.
- Same setup as ahmedavais.com. Follow its patterns unless there's a reason not to.

## Commands

- `npm run dev`: dev server at http://localhost:4321. Agents: `npx astro dev --background`, stop with `npx astro dev stop`.
- `npm run verify`: typecheck + build. Run before calling any change done; CI runs the same.
- `npm run preview`: build and serve through wrangler, the same way production serves it.

## Layout

- `src/pages/`: one file per route.
- `src/layouts/Base.astro`, `src/styles/global.css`: shared shell and design tokens.

## Conventions

- Pages work at 375px wide and respect `prefers-color-scheme`.
- Old WordPress URLs (e.g. `/the-power-of-inquiry/`) redirect to their new home once that content is migrated.
- Never commit secrets. Cloudflare credentials live only in GitHub Actions secrets.
- After a visual change, check it in the browser at desktop and mobile widths.
