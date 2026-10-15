import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIST = join(import.meta.dirname, '..', '..', 'dist');

const pages = readdirSync(DIST, { recursive: true, encoding: 'utf8' })
  .filter((file) => file.endsWith('.html') && file !== '404.html')
  .map((file) => (file === 'index.html' ? '/' : `/${file.replace(/\.html$/, '')}`));

for (const path of pages) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`${path} in ${colorScheme} mode`, async ({ page }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => message.type() === 'error' && errors.push(message.text()));
      await page.emulateMedia({ colorScheme });

      await page.goto(path, { waitUntil: 'networkidle' });

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, 'scrolls sideways').toBeLessThanOrEqual(0);
      expect(errors, 'errors in the console').toEqual([]);
      const { violations } = await new AxeBuilder({ page }).analyze();
      const serious = violations
        .filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')
        .map((violation) => `${violation.id}: ${violation.nodes.map((node) => node.target.join(' ')).join(', ')}`);
      expect(serious, 'serious accessibility problems').toEqual([]);
    });
  }
}
