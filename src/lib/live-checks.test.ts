import { describe, expect, it } from 'vitest';
import { analyticsTokenIn, isAcceptedReport, isSitePage, pagesInSitemap, visitReport } from './live-checks';

describe('pagesInSitemap', () => {
  it('lists every page the sitemap names', () => {
    const xml = '<urlset><url><loc>https://agile-7.com/</loc></url><url><loc>https://agile-7.com/about</loc></url></urlset>';

    expect(pagesInSitemap(xml)).toEqual(['https://agile-7.com/', 'https://agile-7.com/about']);
  });
});

describe('isSitePage', () => {
  it('recognizes a whole page in the site shell', () => {
    expect(isSitePage('<html><head><title>About · Agile 7</title></head><body></body></html>')).toBe(true);
    expect(isSitePage('<html><head><title>Agile 7</title></head><body></body></html>')).toBe(true);
  });

  it('rejects an error page or a cut-off answer', () => {
    expect(isSitePage('<html><head><title>Error 1101</title></head></html>')).toBe(false);
    expect(isSitePage('<html><head><title>Agile 7</title>')).toBe(false);
  });
});

describe('analyticsTokenIn', () => {
  it('reads the site token from the Web Analytics beacon Cloudflare adds to a page', () => {
    const page = `<html><body><script defer src="https://static.cloudflareinsights.com/beacon.min.js/v1" data-cf-beacon='{"version":"2024.11.0","token":"eaa8b6591cd34d329a1db7ef8d5080e4","r":1,"spa":2}' crossorigin="anonymous"></script></body></html>`;

    const token = analyticsTokenIn(page);

    expect(token).toBe('eaa8b6591cd34d329a1db7ef8d5080e4');
  });

  it('finds no token on a page Cloudflare left without the beacon', () => {
    const page = '<html><head><title>About · Agile 7</title></head><body></body></html>';

    const token = analyticsTokenIn(page);

    expect(token).toBeUndefined();
  });
});

describe('visitReport', () => {
  it('reports a page load for the site, the smallest report Web Analytics counts', () => {
    const report = visitReport('eaa8b6591cd34d329a1db7ef8d5080e4', 'https://agile-7.com/watch-production');

    expect(JSON.parse(report)).toEqual({ siteToken: 'eaa8b6591cd34d329a1db7ef8d5080e4', location: 'https://agile-7.com/watch-production', eventType: 1 });
  });
});

describe('isAcceptedReport', () => {
  it('reads No Content as a report Web Analytics took', () => {
    expect(isAcceptedReport(204)).toBe(true);
  });

  it('reads anything else as a report it turned away, such as the 404 when a rule covers /cdn-cgi/ or the 200 for a report it ignores', () => {
    expect(isAcceptedReport(404)).toBe(false);
    expect(isAcceptedReport(200)).toBe(false);
  });
});
