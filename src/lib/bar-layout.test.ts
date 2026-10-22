import { describe, expect, it } from 'vitest';
import { barLayout } from './bar-layout';

describe('barLayout with nothing to draw', () => {
  it('has nothing to draw when there are no values, with the zero line at the start', () => {
    const values: number[] = [];

    const layout = barLayout(values);

    expect(layout).toEqual({ zero: 0, bars: [] });
  });

  it('draws nothing when every value is zero', () => {
    const values = [0, 0];

    const layout = barLayout(values);

    expect(layout).toEqual({ zero: 0, bars: [{ start: 0, length: 0 }, { start: 0, length: 0 }] });
  });
});

describe('barLayout with positive values', () => {
  it('fills the track with a single positive value', () => {
    const values = [24];

    const layout = barLayout(values);

    expect(layout).toEqual({ zero: 0, bars: [{ start: 0, length: 100 }] });
  });

  it('draws positive values in proportion to the largest', () => {
    const values = [98, 154, 77];

    const layout = barLayout(values);

    expect(layout).toEqual({
      zero: 0,
      bars: [
        { start: 0, length: (98 / 154) * 100 },
        { start: 0, length: 100 },
        { start: 0, length: 50 },
      ],
    });
  });
});

describe('barLayout with negative values', () => {
  it('grows negative values left from a zero line placed so the largest negative fits', () => {
    const values = [24, -19];

    const layout = barLayout(values);

    const zero = (19 / 43) * 100;
    expect(layout).toEqual({
      zero,
      bars: [
        { start: zero, length: (24 / 43) * 100 },
        { start: 0, length: zero },
      ],
    });
  });
});
