export const memoize = <A extends any[], R>(
  fn: (...args: A) => R
): ((...args: A) => R) => {
  let prevArgs: A | null = null;
  let prevReturn: any = null;

  return function memoizedFn(this: any, ...args: A): R {
    let changed = false;
    if (prevArgs) {
      const len = args.length;
      for (let i = 0; i < len; i += 1) {
        if (args[i] !== prevArgs[i]) {
          changed = true;
          break;
        }
      }
    } else {
      // first call
      changed = true;
    }

    if (changed) {
      prevArgs = args;
      prevReturn = fn.apply(this, args);
      return prevReturn;
    }
    return prevReturn;
  };
};
