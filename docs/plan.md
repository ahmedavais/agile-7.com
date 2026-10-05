# Site plan

The first public version of agile-7.com. Purpose and audience live in [AGENTS.md](../AGENTS.md).

## Pages

- Home: one line on 25 years of learning how systems behave (machines, teams, AI), the current point of view, latest writing, and the ask.
- About (`/about`): the systems story in prose. Links to LinkedIn for the chronology and a quiet link to ahmedavais.com.
- Writing (`/writing`, posts at `/writing/<slug>`): the 2020 posts and new ones. agile-7.com stays the canonical home for writing.
- Let's talk (`/contact`): the kinds of conversation (consulting, speaking, 1:1 development, agile games), talks given, and email.

Every page ends with the same ask: let's talk.

## Design direction

A systems notebook with warmth. Reference mockup: `playground/design/blend.html` (local only).

- Warm off-white background, with a dark mode that follows the system setting.
- Serif headings (Newsreader), sans-serif body (Inter), monospace (IBM Plex Mono) for navigation, labels and diagrams.
- One green accent, used for the ask, labels and diagrams.
- Diagrams are the signature. They keep the monospace look but are built from HTML boxes and arrows, so they stack on a phone and screen readers can follow them. No ASCII in `<pre>`, no images.

## Steps

- [x] Choose a design direction
- [x] Shared shell: navigation, footer, the "let's talk" ask
- [x] Writing list and post pages
- [x] Move the four 2020 posts over
- [x] Redirect their old WordPress URLs to `/writing/<slug>`
- [x] About page
- [x] Let's talk page
- [x] New post: the review bottleneck
- [x] Home page
- [ ] Launch: replace the placeholder

## Open questions

- Which stories become case studies. Add a page once the first one is written.
- The Dynamical Change newsletter: restart it, move it to Substack, or neither. Left off the site for now.
- How much detail about current work can appear publicly.
