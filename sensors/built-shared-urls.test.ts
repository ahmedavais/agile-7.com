import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { expect, it } from 'vitest';
import { sharedUrlOf } from '../src/lib/page-meta';
import { publicPath } from '../src/lib/public-path';

const DIST = join(import.meta.dirname, '..', 'dist');
const SITE = 'https://agile-7.com';

const pages = existsSync(DIST)
  ? readdirSync(DIST, { recursive: true, encoding: 'utf8' }).filter((file) => file.endsWith('.html'))
  : [];

it('gives link previews the address of the Agile 7 page being shared', () => {
  const elsewhere = pages
    .map((page) => ({ expected: new URL(publicPath(`/${page}`), SITE).href, shared: sharedUrlOf(readFileSync(join(DIST, page), 'utf8')) }))
    .filter(({ expected, shared }) => shared !== expected)
    .map(({ expected, shared }) => `${expected} shares ${shared}`);

  expect(pages.length).toBeGreaterThan(0);
  expect(elsewhere).toEqual([]);
});
