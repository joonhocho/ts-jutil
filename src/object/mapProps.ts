import { AnyObject } from '_src/ts';
import { OverwriteProps } from 'tsdef';
import { getKeys } from './getKeys';

export const mapProps = <T extends AnyObject, U, D extends AnyObject>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T, obj: T) => U,
  thisp?: any,
  dest: D = {} as any
): OverwriteProps<D, { [P in keyof T]: U }> => {
  const out: any = dest;
  const keys = getKeys(obj);
  const len = keys.length;
  if (thisp == null) {
    for (let i = 0; i < len; i += 1) {
      const key = keys[i];
      out[key] = fn(obj[key], key, obj);
    }
  } else {
    for (let i = 0; i < len; i += 1) {
      const key = keys[i];
      out[key] = fn.call(thisp, obj[key], key, obj);
    }
  }
  return out;
};
