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
  divideBy = 1000,
  suffixes = defaultSuffixes
): string => {
  const sign = n >= 0 ? '' : '-';
  let abs = Math.abs(n);
  const len = suffixes.length;
  for (let i = 0; i < len; i += 1) {
    if (abs < divideBy || i >= len - 1) {
      return `${sign}${abs}${suffixes[i]}`;
    }
    abs = Math.round(abs / divideBy);
  }
  return `${sign}${abs}${suffixes[len - 1]}`;
};
