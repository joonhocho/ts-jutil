export const intRange = (mini: number, maxi: number): number[] => {
  // tslint:disable-next-line prefer-array-literal
  const list = new Array(maxi - mini + 1);
  for (let i = mini; i <= maxi; i += 1) {
    list[i - mini] = i;
  }
  return list;
};

export const parseIntInRange = (
  str: string,
  mini?: number | null,
  maxi?: number | null
): number | null => {
  const mi = mini == null ? Number.MIN_SAFE_INTEGER : mini;
  const ma = maxi == null ? Number.MAX_SAFE_INTEGER : maxi;
  const v = parseInt(str, 10);
  return v >= mi && v <= ma ? v : null;
};

export const parseFloatInRange = (
  str: string,
  mini?: number | null,
  maxi?: number | null
): number | null => {
  const mi = mini == null ? -Number.MAX_VALUE : mini;
  const ma = maxi == null ? Number.MAX_VALUE : maxi;
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

export const average = (ns: number[]): number | null => {
  const len = ns.length;
  if (len === 0) {
    return null;
  }
  let sum = 0;
  for (let i = 0; i < len; i += 1) {
    sum += ns[i];
  }
  return sum / len;
};

export const min = (ns: number[]): number | null => {
  const len = ns.length;
  if (len === 0) {
    return null;
  }
  let m = Number.MAX_VALUE;
  for (let i = 0; i < len; i += 1) {
    const n = ns[i];
    if (n < m) {
      m = n;
    }
  }
  return m;
};

export const max = (ns: number[]): number | null => {
  const len = ns.length;
  if (len === 0) {
    return null;
  }
  let m = Number.MIN_VALUE;
  for (let i = 0; i < len; i += 1) {
    const n = ns[i];
    if (n > m) {
      m = n;
    }
  }
  return m;
};
