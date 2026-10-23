import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, it } from 'vitest';
import { shareImageOf } from '../src/lib/page-meta';
import { shareCardPath } from '../src/lib/share-card';

const DIST = join(import.meta.dirname, '..', 'dist');
const SECTIONS = ['writing', 'work'] as const;

const entries = SECTIONS.flatMap((section) => {
  const directory = join(DIST, section);
  return existsSync(directory)
    ? readdirSync(directory).filter((file) => file.endsWith('.html')).map((file) => ({ section, slug: file.replace(/\.html$/, '') }))
    : [];
});

it('gives every post and case study its own link-preview card', () => {
  const missing = entries
    .map(({ section, slug }) => ({ page: `${section}/${slug}`, card: shareCardPath(section, slug), html: readFileSync(join(DIST, section, `${slug}.html`), 'utf8') }))
    .filter(({ card, html }) => new URL(shareImageOf(html) ?? '/', 'https://agile-7.com').pathname !== card || !existsSync(join(DIST, card)))
    .map(({ page, card }) => `${page} should point at ${card}`);

  expect(entries.length).toBeGreaterThan(0);
  expect(missing).toEqual([]);
});
