import { describe, expect, it } from 'vitest';
import { internalLinksIn, redirectTargets, resolvesIn } from './site-links';

const built = new Set(['index.html', 'about.html', 'writing/the-power-of-inquiry.html', 'favicon.svg', '_astro/client.js']);

describe('internalLinksIn', () => {
  it('finds links and sources that stay on the site', () => {
    const html = '<a href="/about">About</a><img src="/favicon.svg"><script src="/_astro/client.js"></script>';

    expect(internalLinksIn(html)).toEqual(['/about', '/favicon.svg', '/_astro/client.js']);
  });

  it('leaves out links to other sites, mail, phone and same-page anchors', () => {
    const html = '<a href="https://x.test">x</a><a href="//cdn.test/a.js">a</a><a href="mailto:a@b.test">m</a><a href="tel:1">t</a><a href="#top">top</a>';

    expect(internalLinksIn(html)).toEqual([]);
  });
});

describe('resolvesIn', () => {
  it('finds a page served without its .html', () => {
    expect(resolvesIn('/writing/the-power-of-inquiry', built)).toBe(true);
  });

  it('serves the home page from index.html', () => {
    expect(resolvesIn('/', built)).toBe(true);
  });

  it('finds an asset by its own name, ignoring query and anchor', () => {
    expect(resolvesIn('/favicon.svg?v=2#x', built)).toBe(true);
  });

  it('misses a page that was never built', () => {
    expect(resolvesIn('/writing/never-built', built)).toBe(false);
  });
});

describe('redirectTargets', () => {
  it('reads where each redirect sends people, skipping blank lines and comments', () => {
    const redirects = '# old WordPress posts\n/the-power-of-inquiry /writing/the-power-of-inquiry 301\n\n/the-power-of-inquiry/ /writing/the-power-of-inquiry 301\n';

    expect(redirectTargets(redirects)).toEqual(['/writing/the-power-of-inquiry', '/writing/the-power-of-inquiry']);
  });
});
