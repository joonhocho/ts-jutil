import { AnyObject } from '_src/ts';
import { getKeys } from './getKeys';

export const findKey = <T extends AnyObject>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T, obj: T) => any
): keyof T | undefined => {
  const keys = getKeys(obj);
  for (let i = 0, len = keys.length; i < len; i += 1) {
    const key = keys[i];
    if (fn(obj[key], key, obj)) {
      return key;
    }
  }
  return undefined;
};
