import { describe, expect, it } from 'vitest';
import { descriptionOf, shareImageOf } from './page-meta';

describe('descriptionOf', () => {
  it('reads the meta description of a page', () => {
    const html = '<head><meta name="description" content="Ahmed Avais on teams"><title>Writing</title></head>';

    const description = descriptionOf(html);

    expect(description).toBe('Ahmed Avais on teams');
  });
});

describe('shareImageOf', () => {
  it('reads the link-preview image of a page', () => {
    const html = '<head><meta property="og:image" content="https://agile-7.com/share/writing/a-post.png"></head>';

    const image = shareImageOf(html);

    expect(image).toBe('https://agile-7.com/share/writing/a-post.png');
  });
});
