# Site plan

The first public version of agile-7.com. Purpose and audience live in [AGENTS.md](../AGENTS.md).

## Pages

- Home: one line on 25 years of learning how systems behave (machines, teams, AI), the current point of view, latest writing, and the ask.
- About (`/about`): the systems story in prose. Links to LinkedIn for the chronology and a quiet link to ahmedavais.com.
- Writing (`/writing`, posts at `/writing/<slug>`): the 2020 posts and new ones. agile-7.com stays the canonical home for writing.
- Let's talk (`/contact`): the kinds of conversation (consulting, speaking, 1:1 development, agile games), talks given, and email.

- Work (`/work`, case studies at `/work/<slug>`): stories from engagements, with the setbacks left in. Clients stay unnamed.

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
- [x] Launch: replace the placeholder

## After launch

- [x] Link-preview card for LinkedIn and Slack
- [x] Work section with its first case study
- [x] Second case study, from a different industry
- [x] Post: Every bug teaches the system
- [ ] A current headshot for About
- [ ] The year of the Dalian workshops, for the talks list
- [ ] Confirm the title of the 2017 Agile Indy talk
- [ ] Gather the rest of Ahmed's talks

## Open questions

- The Dynamical Change newsletter: restart it, move it to Substack, or neither. Left off the site for now.
