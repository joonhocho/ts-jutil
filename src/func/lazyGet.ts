export const lazyGet = <T>(fn: () => T): (() => T) => {
  let cache: T | undefined;
  return (): T => {
    if (fn != null) {
      cache = fn();
      fn = null as any; // tslint:disable-line no-parameter-reassignment
    }
    return cache!;
  };
};
