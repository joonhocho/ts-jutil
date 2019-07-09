export const findLast = <T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => boolean
): T | undefined => {
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    if (fn(arr[i], i, arr)) {
      return arr[i];
    }
  }
  return undefined;
};
