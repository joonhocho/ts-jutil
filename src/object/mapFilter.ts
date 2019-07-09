import { AnyObject } from 'src/ts';
import { OverwriteProps } from 'tsdef';
import { getKeys } from './getKeys';

export const mapFilter = <T extends AnyObject, U, B, D extends AnyObject>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T, obj: T) => U,
  badValue: B,
  dest: D = {} as any
): OverwriteProps<D, Partial<{ [P in keyof T]: Exclude<U, B> }>> => {
  const out: any = dest;
  const keys = getKeys(obj);
  const len = keys.length;
  for (let i = 0; i < len; i += 1) {
    const key = keys[i];
    const value = fn(obj[key], key, obj);
    if ((value as any) !== badValue) {
      out[key] = value;
    }
  }
  return out;
};
