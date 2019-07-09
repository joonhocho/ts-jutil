import { AnyObject } from 'src/ts';
import { OverwriteProps } from 'tsdef';

export const assignKeys = <
  T extends AnyObject,
  D extends AnyObject,
  K extends string
>(
  to: D,
  from: T,
  keys: K[]
): OverwriteProps<D, Pick<T, K & keyof T>> => {
  const out: any = to;
  const len = keys.length;
  for (let i = 0; i < len; i += 1) {
    const key = keys[i];
    const desc = Object.getOwnPropertyDescriptor(from, key);
    if (desc && desc.enumerable) {
      out[key] = from[key];
    }
  }
  return out;
};
