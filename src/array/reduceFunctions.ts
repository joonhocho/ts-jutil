export const reduceFunctions = <U>(
  fns: [(value: U) => U],
  initialValue: U
): U => {
  let v = initialValue;
  const len = fns.length;
  for (let i = 0; i < len; i += 1) {
    v = fns[i](v);
  }
  return v;
};
