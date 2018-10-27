export const intRange = (min: number, max: number): number[] => {
  // tslint:disable-next-line prefer-array-literal
  const list = new Array(max - min + 1);
  for (let i = min; i <= max; i += 1) {
    list[i - min] = i;
  }
  return list;
};

export const parseIntInRange = (
  str: string,
  min?: number | null,
  max?: number | null
): number | null => {
  const mi = min == null ? Number.MIN_SAFE_INTEGER : min;
  const ma = max == null ? Number.MAX_SAFE_INTEGER : max;
  const v = parseInt(str, 10);
  return v >= mi && v <= ma ? v : null;
};

export const parseFloatInRange = (
  str: string,
  min?: number | null,
  max?: number | null
): number | null => {
  const mi = min == null ? -Number.MAX_VALUE : min;
  const ma = max == null ? Number.MAX_VALUE : max;
  const v = parseFloat(str);
  return v >= mi && v <= ma ? v : null;
};

const defaultSuffixes = ['', 'K', 'M', 'B'];

export const formatShortNumber = (
  n: number,
  {
    divisor = 1000,
    units = defaultSuffixes,
    precision = 2,
    round = 'round',
  }: {
    divisor?: number;
    units?: string[];
    precision?: number;
    round?: 'round' | 'floor' | 'ceil';
  } = {}
): string => {
  const sign = n >= 0 ? '' : '-';
  let abs = Math.abs(n);
  const len = units.length;
  for (let i = 0; i < len; i += 1) {
    if (abs < divisor || i >= len - 1) {
      const sigN = `${abs}`.replace(/\..*$/, '').length;
      const p = Math.max(0, precision - sigN);
      const ns = i === 0 ? abs : abs.toFixed(p);
      return `${sign}${ns}${units[i]}`;
    }
    const pp = Math.pow(10, Math.max(0, precision - 1));
    abs = Math[round]((abs * pp) / divisor) / pp;
  }
  return `${sign}${abs}${units[len - 1]}`;
};
