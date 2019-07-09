export const roundUpToInterval = (n: number, interval: number): number => {
  const r = n % interval;
  if (r > 0) {
    return n + (interval - r);
  }
  return n;
};
