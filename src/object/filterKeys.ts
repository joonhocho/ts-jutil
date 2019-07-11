import { AnyObject } from '_src/ts';
import { OverwriteProps } from 'tsdef';
import { hasOwnProperty } from './hasOwnProp';

export const filterKeys = <
  T extends AnyObject,
  K extends keyof T,
  U extends AnyObject
>(
  obj: T,
  keys: K[],
  dest: U = {} as any
): OverwriteProps<U, Pick<T, K>> => {
  const out: any = dest;
  const len = keys.length;
  if (obj.hasOwnProperty) {
    for (let i = 0; i < len; i += 1) {
      const key = keys[i];
      if (obj.hasOwnProperty(key)) {
        out[key] = obj[key];
      }
    }
  } else {
    for (let i = 0; i < len; i += 1) {
      const key = keys[i];
      if (hasOwnProperty.call(obj, key)) {
        out[key] = obj[key];
      }
    }
  }
  return out;
};
