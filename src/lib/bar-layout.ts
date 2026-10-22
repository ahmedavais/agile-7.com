interface Bar {
  start: number;
  length: number;
}

export interface BarLayout {
  zero: number;
  bars: Bar[];
}

export function barLayout(values: number[]): BarLayout {
  const reachRight = Math.max(0, ...values);
  const reachLeft = Math.max(0, ...values.map((value) => -value));
  const span = reachRight + reachLeft;
  const share = (amount: number) => (span === 0 ? 0 : (amount / span) * 100);
  const zero = share(reachLeft);
  const barFor = (value: number): Bar => {
    const length = share(Math.abs(value));
    return { start: value < 0 ? zero - length : zero, length };
  };
  return { zero, bars: values.map(barFor) };
}
