export const mapItems = <T, U>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => U
): U[] => {
  const len = arr.length;
  const list: U[] = new Array(len);
  for (let i = 0; i < len; i += 1) {
    list[i] = fn(arr[i], i, arr);
  }
  return list;
};
