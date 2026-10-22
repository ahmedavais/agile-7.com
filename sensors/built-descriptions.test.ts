import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, it } from 'vitest';
import { descriptionOf } from '../src/lib/page-description';

const DIST = join(import.meta.dirname, '..', 'dist');
const LINK_PREVIEW_MINIMUM = 100;

const pages = existsSync(DIST)
  ? readdirSync(DIST, { recursive: true, encoding: 'utf8' }).filter((file) => file.endsWith('.html'))
  : [];

it(`gives every page a description of at least ${LINK_PREVIEW_MINIMUM} characters for link previews`, () => {
  const tooShort = pages
    .map((page) => ({ page, description: descriptionOf(readFileSync(join(DIST, page), 'utf8')) ?? '' }))
    .filter(({ description }) => description.length < LINK_PREVIEW_MINIMUM)
    .map(({ page, description }) => `${page} (${description.length}): ${description}`);

  expect(pages.length).toBeGreaterThan(0);
  expect(tooShort).toEqual([]);
});
