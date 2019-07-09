import { AnyObject } from 'src/ts';
import { UnionObjects } from 'tsdef';
import { getKeys } from './getKeys';

export const filter = <T extends AnyObject, D extends AnyObject>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T, obj: T) => boolean,
  thisp?: any,
  dest: D = {} as any
): UnionObjects<D, Partial<{ [P in keyof T]: T[P] }>> => {
  const out: any = dest;
  const keys = getKeys(obj);
  const len = keys.length;
  if (thisp == null) {
    for (let i = 0; i < len; i += 1) {
      const key = keys[i];
      if (fn(obj[key], key, obj)) {
        out[key] = obj[key];
      }
    }
  } else {
    for (let i = 0; i < len; i += 1) {
      const key = keys[i];
      if (fn.call(thisp, obj[key], key, obj)) {
        out[key] = obj[key];
      }
    }
  }
  return out;
};
