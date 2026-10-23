import { describe, expect, it } from 'vitest';
import { renderShareCard, shareCardPath } from './share-card';

describe('shareCardPath', () => {
  it('puts a post’s card under its section and slug', () => {
    const path = shareCardPath('writing', 'the-ai-productivity-trap');

    expect(path).toBe('/share/writing/the-ai-productivity-trap.png');
  });
});

function sizeOf(png: Uint8Array) {
  const header = new DataView(png.buffer, png.byteOffset);
  return { width: header.getUint32(16), height: header.getUint32(20) };
}

describe('renderShareCard', () => {
  it('draws a link-preview card the size LinkedIn wants', async () => {
    const card = await renderShareCard({ section: 'writing', title: 'The AI productivity trap' });

    expect(sizeOf(card)).toEqual({ width: 1200, height: 630 });
  });
});
