import { AnyFunction } from 'tsdef';
import { memoize } from './memoize';
import { memoizeArg } from './memoizeArg';

export const memoizeCompose = (
  argFns: AnyFunction[],
  fn: AnyFunction
): AnyFunction => {
  // TODO narrow down type like above
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
