export const forEach = <T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => any
): void => {
  const len = arr.length;
  for (let i = 0; i < len; i += 1) {
    fn(arr[i], i, arr);
  }
};
