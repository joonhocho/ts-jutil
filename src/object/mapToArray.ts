import { AnyObject } from 'src/ts';
import { getKeys } from './getKeys';

export const mapToArray = <T extends AnyObject, U>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T, obj: T) => U,
  thisp?: any
): Array<ReturnType<typeof fn>> => {
  const keys = getKeys(obj);
  const len = keys.length;
  // tslint:disable-next-line prefer-array-literal
  const res = new Array(len);
  if (thisp == null) {
    for (let i = 0; i < len; i += 1) {
      // use for loop since no need to check hasOwnProperty
      const key = keys[i];
      res[i] = fn(obj[key], key, obj);
    }
  } else {
    for (let i = 0; i < len; i += 1) {
      // use for loop since no need to check hasOwnProperty
      const key = keys[i];
      res[i] = fn.call(thisp, obj[key], key, obj);
    }
  }
  return res;
};
