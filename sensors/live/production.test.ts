import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { assert, describe, expect, it } from 'vitest';
import { analyticsTokenIn, isAcceptedReport, isSitePage, pagesInSitemap, visitReport } from '../../src/lib/live-checks';
import { redirectRules } from '../../src/lib/site-links';

const SITE = process.env.SITE_URL ?? 'https://agile-7.com';
const OWNED_PLACES = [
  'https://ahmedavais.com/',
  'https://ahmedavais.com/p/team-shape',
  'https://ahmedavais.com/p/stop-starting',
  'https://ahmedavais.com/p/chance-of-done',
];
const WATCH_VISIT = `${SITE}/watch-production`;
const PATIENCE_MS = 15_000;
const WITHOUT_FOLLOWING: RequestInit = { redirect: 'manual' };
const AS_A_BROWSER_ASKS: RequestInit = { headers: { accept: 'text/html' } };
const AS_THE_BEACON_REPORTS = (report: string): RequestInit => ({
  method: 'POST',
  headers: { origin: new URL(SITE).origin, 'content-type': 'application/json' },
  body: report,
});

async function answerFrom(url: string, request: RequestInit = {}) {
  const response = await fetch(url, { ...request, signal: AbortSignal.timeout(PATIENCE_MS) });
  return { status: response.status, body: await response.text(), location: response.headers.get('location') };
}

describe(`production at ${SITE}`, () => {
  it('serves every page in its sitemap, whole and in the site shell', async () => {
    const pages = pagesInSitemap((await answerFrom(`${SITE}/sitemap-0.xml`)).body);
    const answers = await Promise.all(pages.map(async (page) => ({ page, answer: await answerFrom(page) })));
    const broken = answers.filter(({ answer }) => answer.status !== 200 || !isSitePage(answer.body)).map(({ page, answer }) => `${page} (${answer.status})`);

    expect(pages.length).toBeGreaterThan(0);
    expect(broken).toEqual([]);
  });

  it('counts visits in Web Analytics', async () => {
    const token = analyticsTokenIn((await answerFrom(`${SITE}/`, AS_A_BROWSER_ASKS)).body);
    assert(token, 'The home page carries no Web Analytics beacon: check Web Analytics is on for the site in the Cloudflare dashboard');

    const report = await answerFrom(`${SITE}/cdn-cgi/rum`, AS_THE_BEACON_REPORTS(visitReport(token, WATCH_VISIT)));

    expect(isAcceptedReport(report.status), `/cdn-cgi/rum answered ${report.status}: check no Cloudflare rule covers /cdn-cgi/`).toBe(true);
  });

  it('sends every old WordPress URL to its new home', async () => {
    const rules = redirectRules(readFileSync(join(import.meta.dirname, '..', '..', 'public', '_redirects'), 'utf8'));
    const answers = await Promise.all(rules.map(async (rule) => ({ rule, answer: await answerFrom(`${SITE}${rule.from}`, WITHOUT_FOLLOWING) })));
    const wrong = answers
      .filter(({ rule, answer }) => answer.status !== 301 || new URL(answer.location ?? '', SITE).pathname !== rule.to)
      .map(({ rule, answer }) => `${rule.from} → ${answer.status} ${answer.location}`);

    expect(wrong).toEqual([]);
  });

  it('links to places Ahmed owns that answer', async () => {
    const answers = await Promise.all(OWNED_PLACES.map(async (place) => ({ place, answer: await answerFrom(place) })));

    expect(answers.filter(({ answer }) => answer.status !== 200).map(({ place, answer }) => `${place} (${answer.status})`)).toEqual([]);
  });
});
