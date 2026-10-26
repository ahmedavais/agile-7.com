# Site plan

The first public version of agile-7.com. Purpose and audience live in [AGENTS.md](../AGENTS.md).

## Pages

- Home: a headline on how Ahmed leads (his teams do the work; his part is the practices, feedback loops and trust), the machines → teams → teams + AI journey in the diagram below it, latest work and writing, and the ask.
- About (`/about`): the systems story in prose. Links to LinkedIn for the chronology and a quiet link to ahmedavais.com.
- Writing (`/writing`, posts at `/writing/<slug>`): the 2020 posts and new ones. agile-7.com stays the canonical home for writing.
- About lists a short selection of talks most relevant to engineering leaders and links to the full list at `/talks`. The Let's talk page (`/contact`) was retired in October 2026 and redirects to About; nobody used it.

- Work (`/work`, case studies at `/work/<slug>`): stories from engagements, with the setbacks left in. Clients stay unnamed.

Every page ends with the same ask: compare notes, on LinkedIn or by email.

## Design direction

A systems notebook with warmth. Reference mockup: `playground/design/blend.html` (local only).

- Warm off-white background, with a dark mode that follows the system setting.
- Serif headings (Newsreader), sans-serif body (Inter), monospace (IBM Plex Mono) for navigation, labels and diagrams.
- The seven-leaf mark from the Agile 7 logo, small and quiet, in three places only: the header beside "agile-7", the favicon and the share card.
- One teal accent from the Agile 7 logo (PANTONE 3255 C, `#43C1BB`). Text, links and the ask use a deeper teal (`#277773`) in light mode so they pass WCAG AA on both backgrounds; the full brand teal is for the mark and diagram borders, and for everything in dark mode.
- Diagrams are the signature. They keep the monospace look but are built from HTML boxes and arrows, so they stack on a phone and screen readers can follow them. No ASCII in `<pre>`, no images.

## Steps

- [x] Choose a design direction
- [x] Shared shell: navigation, footer, the "compare notes" ask
- [x] Writing list and post pages
- [x] Move the four 2020 posts over
- [x] Redirect their old WordPress URLs to `/writing/<slug>`
- [x] About page
- [x] New post: the review bottleneck
- [x] Home page
- [x] Launch: replace the placeholder

## After launch

- [x] Link-preview card for LinkedIn and Slack
- [x] Work section with its first case study
- [x] Second case study, from a different industry
- [x] Third case study: AI-era evidence from a federal engagement
- [x] Post: Every bug teaches the system
- [x] A current headshot for About
- [x] The year of the Dalian workshops, for the talks list
- [x] Confirm the title of the 2017 Agile Indy talk
- [x] Refresh the "What shape is your team in?" screenshots once the tool says "Groupthink"
- [ ] Gather the rest of Ahmed's talks
- [ ] Watch the guest recordings again on YouTube and add the keepers to Talks and sessions with their links (candidates in private notes)
- [ ] Revise the older talk decks with what Ahmed knows now (his own pace; originals are listed in private notes)
- [x] Check every internal link and redirect target in the built site
- [x] Watch production after each deploy and daily
- [x] Check every page in a browser at phone and desktop widths, light and dark
- [x] Check spelling for American English
- [x] Lint TypeScript and Astro with ESLint
- [ ] Cache Playwright's browser in CI if the slower verify gets in the way
- [ ] Review the production watch on 2026-11-24: were failures real or false alarms, does the daily 11:41 UTC run earn its keep, did GitHub's failure emails get noticed, and is any check missing or pure noise?

## Decisions

- Every page ends with an invitation to compare notes, pointing at LinkedIn first and then email, instead of "let's talk" and a contact page (October 2026). Nobody reached out through the old ask, and comparing notes suits both readers the site now serves: leaders weighing consulting and leaders hiring. The talks moved to About.
- The newsletter is Dynamical Change on Substack, at its custom domain dynamicalchange.com (October 2026; ahmedavais.substack.com links answer 301 there), free for now; revisit a paid tier only with evidence such as a steady rhythm and readers asking for more. Posts can appear on both Substack and agile-7.com; the copy on agile-7.com sets `canonical` to wherever the piece first appeared. If Substack ever needs a sender address, use a PO box or virtual mailbox, never a home address. Pledges stay off and the header above every post stays empty: no asks for money while it's free, and readers get straight to the piece. The email banner (1100×220) shows the mark, the name and Ahmed's byline.
- Three slots a week, still one new piece of writing: on Saturday the new piece, alternating a Dynamical Change piece on an ahmedavais.com tool (on Substack, with a copy here) and a new agile-7.com original, where a new case study counts; on Sunday the Agile 7 company page announces the original or shares a case study or older piece; on Wednesday a short vertical video walks through one tool on YouTube Shorts and TikTok. The originals keep adding proof of Ahmed's work alongside the newsletter copies, and Dynamical Change is the one name across Substack, YouTube and TikTok.
- Talk decks stay on SlideShare (https://www.slideshare.net/aavais) instead of being hosted here. SlideShare answers OK even for missing pages, so the sensors can't catch a dead deck; that's accepted. Talks from the 2023 AgileIndy sessions stay as plain text: their Sched pages were Project Brilliant listings and may not last.
- No Watch section for now. Ahmed's older video is mostly five or more years old and aimed at agile coaches; his guest recordings are proof of speaking, so the best ones join Talks and sessions as YouTube links. Revisit when there's current video worth leading with.
- Keep Cloudflare Web Analytics, which Cloudflare injects on every page because it's turned on for the domain. It's cookieless and free, and it answers whether people read the proof and where they came from. Ad and tracker blockers hide many engineers, so read it as a minimum and a trend, not a total. Revisit after a few months.
- A failed production-watch run is the alarm, emailed by GitHub. No issue tracker in the loop, so alarms don't turn into another backlog.
- Other sites' links stay unchecked, except ahmedavais.com. LinkedIn and Substack block bots (Substack answers GitHub's runners with 403, whether or not the post exists), and SlideShare answers OK even for missing pages.
- Bot Fight Mode stays off (turned off 2026-10-14). It answered 403 to GitHub Actions runners and broke automated checks against the live site. Cloudflare's security insights flag this as a Medium finding; that's accepted for a static site with no forms or logins. Revisit only if traffic or abuse grows.
