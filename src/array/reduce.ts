export const reduce = <T, U>(
  arr: T[],
  fn: (value: U, item: T, index: number, array: T[]) => U,
  initialValue: U
): U => {
  const len = arr.length;
  let v = initialValue;
  for (let i = 0; i < len; i += 1) {
    v = fn(v, arr[i], i, arr);
  }
  return v;
};
