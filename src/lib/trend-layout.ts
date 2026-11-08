export interface Scale {
  from: number;
  to: number;
}

interface Point {
  x: number;
  y: number;
}

export function trendLayout(values: number[], scale: Scale): Point[] {
  const across = (index: number) => (values.length === 1 ? 50 : (index * 100) / (values.length - 1));
  const down = (value: number) => ((scale.to - value) / (scale.to - scale.from)) * 100;
  return values.map((value, index) => ({ x: across(index), y: down(value) }));
}
