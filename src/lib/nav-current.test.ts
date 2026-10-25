import { describe, expect, it } from 'vitest';
import { navCurrent } from './nav-current';

describe('navCurrent', () => {
  it('marks a section’s own page as the current page', () => {
    const current = navCurrent('/writing', '/writing');

    expect(current).toBe('page');
  });

  it('marks the section a page sits inside', () => {
    const current = navCurrent('/writing', '/writing/chance-of-done');

    expect(current).toBe('true');
  });

  it('marks nothing for a page outside the section', () => {
    const current = navCurrent('/writing', '/about');

    expect(current).toBeUndefined();
  });

  it('does not count a page whose path only starts with the section’s name', () => {
    const current = navCurrent('/work', '/workshop');

    expect(current).toBeUndefined();
  });
});
