import { AnyFunction } from 'tsdef';

export const noop = (): void => {
  /*noop*/
};
export const returnVoid = (): void => undefined;
export const returnNull = (): null => null;
export const returnTrue = (): true => true;
export const returnFalse = (): false => false;
export const bypass = <T>(v: T): T => v;

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

// TODO narrow down type like above
export const memoizeCompose = (
  argFns: AnyFunction[],
  fn: AnyFunction
): AnyFunction => {
  const len = argFns.length;
  if (len > 1) {
    const memoized1 = memoize(fn);

    return function memoizedFn(this: any, ...args: any[]): any {
      const prevArgs = [];
      for (let i = 0; i < len; i += 1) {
        prevArgs.push(argFns[i].apply(this, args));
      }
      return memoized1.apply(this, prevArgs);
    };
  }
  const [argFn] = argFns;
  const memoized2 = memoizeArg(fn);

  return function memoizedFn(this: any, arg: any): any {
    return memoized2.call(this, argFn(arg));
  };
};

export const lazyGet = <T>(fn: () => T): (() => T) => {
  let cache: T | undefined;
  let called = false;
  return (): T => {
    if (!called) {
      called = true;
      cache = fn();
    }
    return cache!;
  };
};
