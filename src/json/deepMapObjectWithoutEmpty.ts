import { isObject } from '_src/is';
import { getKeys } from '_src/object/getKeys';
import { AnyObject } from '_src/ts';
import { deepMapArrayWithoutEmpty } from './deepMapArrayWithoutEmpty';
import { MapFN } from './ts';

export const deepMapObjectWithoutEmpty = <
  T extends AnyObject,
  FN extends MapFN
>(
  obj: T,
  fn: FN
): { [P in keyof T]?: any } | null => {
  const copy: AnyObject = {};
  const keys = getKeys(obj);
  const len = keys.length;
  let nonEmpty = false;

  for (let i = 0; i < len; i += 1) {
    const key = keys[i];
    const value = obj[key];

    let newValue;
    if (isObject(value)) {
      if (Array.isArray(value)) {
        newValue = deepMapArrayWithoutEmpty(value, fn);
      } else {
        newValue = deepMapObjectWithoutEmpty(value, fn);
      }
    } else {
      newValue = fn(value, key, obj);
    }

    if (newValue != null && newValue === newValue) {
      nonEmpty = true;
      copy[key] = newValue;
    }
  }
  return nonEmpty ? (copy as any) : null;
};
