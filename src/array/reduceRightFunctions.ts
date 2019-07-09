export const reduceRightFunctions = <U>(
  fns: [(value: U) => U],
  initialValue: U
): U => {
  let v = initialValue;
  for (let i = fns.length - 1; i >= 0; i -= 1) {
    v = fns[i](v);
  }
  return v;
};
