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
