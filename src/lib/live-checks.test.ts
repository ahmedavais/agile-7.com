import { describe, expect, it } from 'vitest';
import { isSitePage, pagesInSitemap } from './live-checks';

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
