import { AnyObject } from '_src/ts';
import { getKeys } from './getKeys';

export const findProp = <T extends AnyObject>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T, obj: T) => any
): T[keyof T] | undefined => {
  const keys = getKeys(obj);
  for (let i = 0, len = keys.length; i < len; i += 1) {
    const key = keys[i];
    const val = obj[key];
    if (fn(val, key, obj)) {
      return val;
    }
  }
  return undefined;
};
