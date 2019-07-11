import { AnyObject } from '_src/ts';
import { OverwriteProps } from 'tsdef';
import { getKeys } from './getKeys';
import { hasOwnProperty } from './hasOwnProp';

export const copy = <
  T extends AnyObject,
  D extends AnyObject,
  K extends string
>(
  to: D,
  from: T,
  keys?: K[],
  own = true
): OverwriteProps<D, Pick<T, K & keyof T>> => {
  const out: any = to;
  if (keys) {
    const len = keys.length;
    if (own) {
      if (from.hasOwnProperty) {
        for (let i = 0; i < len; i += 1) {
          const key = keys[i];
          if (from.hasOwnProperty(key)) {
            out[key] = from[key];
          }
        }
      } else {
        for (let i = 0; i < len; i += 1) {
          const key = keys[i];
          if (hasOwnProperty.call(from, key)) {
            out[key] = from[key];
          }
        }
      }
    } else {
      for (let i = 0; i < len; i += 1) {
        const key = keys[i];
        if (key in from) {
          out[key] = from[key];
        }
      }
    }
  } else {
    const fkeys = getKeys(from);
    const len = fkeys.length;
    for (let i = 0; i < len; i += 1) {
      const key = fkeys[i];
      out[key] = from[key];
    }
  }
  return out;
};
