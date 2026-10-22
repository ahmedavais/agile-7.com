import { describe, expect, it } from 'vitest';
import { descriptionOf } from './page-description';

describe('descriptionOf', () => {
  it('reads the meta description of a page', () => {
    const html = '<head><meta name="description" content="Ahmed Avais on teams"><title>Writing</title></head>';

    const description = descriptionOf(html);

    expect(description).toBe('Ahmed Avais on teams');
  });
});
