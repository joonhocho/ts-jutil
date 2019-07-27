export const filterItems = <T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => any
): T[] => {
  const len = arr.length;
  const list: T[] = [];
  for (let i = 0; i < len; i += 1) {
    const item = arr[i];
    if (fn(item, i, arr)) {
      list.push(item);
    }
  }
  return list;
};
