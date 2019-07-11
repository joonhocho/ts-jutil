import { getKeys } from '_src/object/getKeys';
import { hasOwnProp } from '_src/object/hasOwnProp';
import { AnyObject } from '_src/ts';
import { shallowEqualValues } from './shallowEqualValues';
import { IEqualOptions } from './ts';

export const shallowEqualObjects = (
  a: AnyObject,
  b: AnyObject,
  opts: IEqualOptions
): boolean => {
  if (a === b) {
    return true;
  }

  const { testKeys = true, keys, skipKeys } = opts;

  const skip: { [k: string]: 1 } = {};
  if (skipKeys) {
    const len = skipKeys.length;
    for (let i = 0; i < len; i += 1) {
      skip[skipKeys[i]] = 1;
    }
  }

  if (keys) {
    const len = keys.length;
    for (let i = 0; i < len; i += 1) {
      const k = keys[i];
      if (skip[k] !== 1) {
        skip[k] = 1;

        if (testKeys) {
          const hasKey = hasOwnProp(a, k);
          if (hasKey !== hasOwnProp(b, k)) {
            return false;
          }
          if (!hasKey) {
            continue;
          }
        }

        if (!shallowEqualValues(a[k], b[k], opts)) {
          return false;
        }
      }
    }
    return true;
  }

  const keysA = getKeys(a);
  const lenA = keysA.length;
  const keysB = getKeys(b);
  const lenB = keysB.length;

  if (testKeys && !skipKeys && lenA !== lenB) {
    return false;
  }

  for (let i = 0; i < lenA; i += 1) {
    const k = keysA[i];
    if (skip[k] !== 1) {
      skip[k] = 1;

      if (
        (testKeys && !hasOwnProp(b, k)) ||
        !shallowEqualValues(a[k], b[k], opts)
      ) {
        return false;
      }
    }
  }

  for (let i = 0; i < lenB; i += 1) {
    const k = keysB[i];
    if (skip[k] !== 1) {
      skip[k] = 1;

      if (
        (testKeys && !hasOwnProp(a, k)) ||
        !shallowEqualValues(a[k], b[k], opts)
      ) {
        return false;
      }
    }
  }

  return true;
};
