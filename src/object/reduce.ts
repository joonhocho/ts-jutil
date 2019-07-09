import { AnyObject } from 'src/ts';
import { getKeys } from './getKeys';

export const reduce = <T extends AnyObject, U>(
  obj: T,
  fn: (output: U, value: T[keyof T], key: keyof T, obj: T) => U,
  initial: U,
  thisp?: any
): U => {
  let value = initial;
  const keys = getKeys(obj);
  const len = keys.length;
  if (thisp == null) {
    for (let i = 0; i < len; i += 1) {
      // use for loop since no need to check hasOwnProperty
      const key = keys[i];
      value = fn(value, obj[key], key, obj);
    }
  } else {
    for (let i = 0; i < len; i += 1) {
      // use for loop since no need to check hasOwnProperty
      const key = keys[i];
      value = fn.call(thisp, value, obj[key], key, obj);
    }
  }
  return value;
};
