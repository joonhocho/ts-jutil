export const reduceRight = <T, U>(
  arr: T[],
  fn: (value: U, item: T, index: number, array: T[]) => U,
  initialValue: U
): U => {
  let v = initialValue;
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    v = fn(v, arr[i], i, arr);
  }
  return v;
};
