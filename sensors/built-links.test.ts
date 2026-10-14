import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { internalLinksIn, redirectTargets, resolvesIn } from '../src/lib/site-links';

const DIST = join(import.meta.dirname, '..', 'dist');

function filesUnder(directory: string): string[] {
  return readdirSync(directory, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => relative(DIST, join(entry.parentPath, entry.name)));
}

describe('the built site', () => {
  it('has been built', () => {
    expect(existsSync(DIST), 'Run npm run build before npm run sense').toBe(true);
  });

  const built = existsSync(DIST) ? new Set(filesUnder(DIST)) : new Set<string>();
  const pages = [...built].filter((file) => file.endsWith('.html'));

  it('links only to pages and assets that exist', () => {
    const broken = pages.flatMap((page) =>
      internalLinksIn(readFileSync(join(DIST, page), 'utf8'))
        .filter((link) => !resolvesIn(link, built))
        .map((link) => `${page} → ${link}`),
    );

    expect(broken).toEqual([]);
  });

  it('redirects only to pages that exist', () => {
    const redirects = existsSync(join(DIST, '_redirects')) ? readFileSync(join(DIST, '_redirects'), 'utf8') : '';
    const broken = redirectTargets(redirects).filter((target) => !resolvesIn(target, built));

    expect(broken).toEqual([]);
  });
});
