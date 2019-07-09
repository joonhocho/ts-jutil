const concatFn = <T, U>(a: T[], b: U[]): Array<T | U> => [...a, ...b];

export const concatArrays = <T>(arrays: T[][]): T[] =>
  arrays.reduce(concatFn, []);
