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
