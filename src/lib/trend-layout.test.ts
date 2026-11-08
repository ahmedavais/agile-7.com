import { describe, expect, it } from 'vitest';
import { trendLayout } from './trend-layout';

describe('trendLayout', () => {
  it('has no points when there are no values', () => {
    const values: number[] = [];

    const points = trendLayout(values, { from: 1, to: 6 });

    expect(points).toEqual([]);
  });

  it('puts a single value in the middle, at the top edge when it is the top of the scale', () => {
    const values = [6];

    const points = trendLayout(values, { from: 1, to: 6 });

    expect(points).toEqual([{ x: 50, y: 0 }]);
  });

  it('puts the bottom of the scale at the bottom edge', () => {
    const values = [1];

    const points = trendLayout(values, { from: 1, to: 6 });

    expect(points).toEqual([{ x: 50, y: 100 }]);
  });

  it('spreads several rounds evenly from the left edge to the right, each value in proportion to the scale', () => {
    const values = [4, 4.5, 5, 4];

    const points = trendLayout(values, { from: 3, to: 5 });

    expect(points).toEqual([
      { x: 0, y: 50 },
      { x: 100 / 3, y: 25 },
      { x: 200 / 3, y: 0 },
      { x: 100, y: 50 },
    ]);
  });
});
