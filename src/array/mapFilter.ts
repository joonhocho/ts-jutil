export const mapFilter = <T, U, B>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => U,
  badValue: B
): Array<Exclude<U, B>> => {
  const len = arr.length;
  const list: Array<Exclude<U, B>> = [];
  for (let i = 0; i < len; i += 1) {
    const value = fn(arr[i], i, arr);
    if ((value as any) !== badValue) {
      list.push(value as Exclude<U, B>);
    }
  }
  return list;
};
