import { AnyObject } from 'src/ts';
import { OverwriteProps } from 'tsdef';
import { getKeys } from './getKeys';

export const withoutKeys = <
  T extends AnyObject,
  K extends keyof T,
  U extends AnyObject
>(
  obj: T,
  excludeKeys: K[],
  dest: U = {} as any
): OverwriteProps<U, Pick<T, Exclude<keyof T, K>>> => {
  const out: any = dest;
  const keys = getKeys(obj);
  const len = keys.length;
  for (let i = 0; i < len; i += 1) {
    // use for loop since no need to check hasOwnProperty
    const key = keys[i];
    if (excludeKeys.indexOf(key as any) === -1) {
      out[key] = obj[key];
    }
  }
  return out;
};
