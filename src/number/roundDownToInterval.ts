export const roundDownToInterval = (n: number, interval: number): number =>
  n - (n % interval);
