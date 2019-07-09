export const mapN = <T, A extends any[]>(
  count: number,
  fn: (...args: A) => T,
  args?: A | null,
  thisp?: any
): T[] => {
  // tslint:disable-next-line prefer-array-literal
  const results: T[] = new Array(count);
  if (args && args.length) {
    for (let i = 0; i < count; i += 1) {
      results[i] = fn.apply(thisp, args);
    }
  } else {
    if (thisp == null) {
      for (let i = 0; i < count; i += 1) {
        results[i] = (fn as any)(i);
      }
    } else {
      for (let i = 0; i < count; i += 1) {
        results[i] = (fn as any).call(thisp, i);
      }
    }
  }
  return results;
};
