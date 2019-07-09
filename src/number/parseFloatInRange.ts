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
