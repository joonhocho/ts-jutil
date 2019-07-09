export const memoizeArg = <T, U>(fn: (arg: T) => U): ((arg: T) => U) => {
  let called = false;
  let prevArg: T;
  let prevReturn: U;

  return function memoizedFn(this: any, arg: T): U {
    if (called && arg === prevArg) {
      return prevReturn;
    }

    called = true;
    prevArg = arg;
    prevReturn = fn.call(this, arg);
    return prevReturn;
  };
};
