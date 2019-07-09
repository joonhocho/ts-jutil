export const forN = (
  count: number,
  fn: (i: number) => void,
  thisp?: any
): void => {
  if (thisp == null) {
    for (let i = 0; i < count; i += 1) {
      fn(i);
    }
  } else {
    for (let i = 0; i < count; i += 1) {
      fn.call(thisp, i);
    }
  }
};
