export const pluck = <T, K extends keyof T>(arr: T[], key: K): Array<T[K]> =>
  arr.map((x) => x[key]);
