export const findItem = <T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => boolean
): T | undefined => {
  const len = arr.length;
  for (let i = 0; i < len; i += 1) {
    if (fn(arr[i], i, arr)) {
      return arr[i];
    }
  }
  return undefined;
};
