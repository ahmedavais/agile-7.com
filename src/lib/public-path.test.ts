import { describe, expect, it } from 'vitest';
import { publicPath } from './public-path';

describe('publicPath', () => {
  it('drops the .html that the static build adds to a page', () => {
    const builtPath = '/about.html';

    const path = publicPath(builtPath);

    expect(path).toBe('/about');
  });

  it('serves the home page at the site root', () => {
    const builtPath = '/index.html';

    const path = publicPath(builtPath);

    expect(path).toBe('/');
  });

  it('keeps a page whose name only ends in index', () => {
    const builtPath = '/writing/reindex.html';

    const path = publicPath(builtPath);

    expect(path).toBe('/writing/reindex');
  });
});
