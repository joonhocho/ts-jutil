import { AnyObject } from '_src/ts';
import { OverwriteProps } from 'tsdef';
import { getKeys } from './getKeys';

export const assignDefined = <T extends AnyObject, D extends AnyObject>(
  to: D,
  from: T,
  keys = getKeys(from)
): OverwriteProps<D, T> => {
  const d = (to as any) as OverwriteProps<D, T>;
  const len = keys.length;
  for (let i = 0; i < len; i += 1) {
    const key = keys[i];
    const v = from[key];
    if (v !== undefined) {
      d[key] = v;
    }
  }
  return d;
};
