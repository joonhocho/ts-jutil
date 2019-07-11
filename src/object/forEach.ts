import { AnyObject } from '_src/ts';
import { getKeys } from './getKeys';

export const forEach = <T extends AnyObject>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T, obj: T) => void,
  thisp?: any
): void => {
  const keys = getKeys(obj);
  const len = keys.length;
  if (thisp == null) {
    for (let i = 0; i < len; i += 1) {
      // use for loop since no need to check hasOwnProperty
      const key = keys[i];
      fn(obj[key], key, obj);
    }
  } else {
    for (let i = 0; i < len; i += 1) {
      // use for loop since no need to check hasOwnProperty
      const key = keys[i];
      fn.call(thisp, obj[key], key, obj);
    }
  }
};
