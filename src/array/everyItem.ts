export const everyItem = <T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => any
): boolean => {
  const len = arr.length;
  for (let i = 0; i < len; i += 1) {
    if (!fn(arr[i], i, arr)) {
      return false;
    }
  }
  return true;
};
