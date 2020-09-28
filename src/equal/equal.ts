import { isObject } from '_src/is';
import { getKeys } from '_src/object/getKeys';
import { hasOwnProp } from '_src/object/hasOwnProp';
import { AnyObject } from '_src/ts';
import { IEqualOptions } from './ts';

export const equalObjects = (
  a: AnyObject,
  b: AnyObject,
  opts: IEqualOptions
): boolean => {
  if (a === b) {
    return true;
  }

  const { testKeys = true, keys, skipKeys, allowSubset = false } = opts;

  const skip: { [k: string]: 1 } = {};
  if (skipKeys) {
    const len = skipKeys.length;
    for (let i = 0; i < len; i += 1) {
      skip[skipKeys[i]] = 1;
    }
  }

  if (keys) {
    const len = keys.length;
    if (testKeys) {
      for (let i = 0; i < len; i += 1) {
        const k = keys[i];
        if (skip[k] !== 1) {
          skip[k] = 1;

          const hasKey = hasOwnProp(a, k);
          if (
            hasKey !== hasOwnProp(b, k) ||
            (hasKey && !equal(a[k], b[k], opts))
          ) {
            return false;
          }
        }
      }
    } else {
      for (let i = 0; i < len; i += 1) {
        const k = keys[i];
        if (skip[k] !== 1) {
          skip[k] = 1;

          if (!equal(a[k], b[k], opts)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  const keysA = getKeys(a);
  const keysB = getKeys(b);
  const lenA = keysA.length;
  const lenB = keysB.length;

  if (testKeys && !allowSubset) {
    if (!allowSubset && !skipKeys && lenA !== lenB) {
      return false;
    }

    for (let i = 0; i < lenA; i += 1) {
      const k = keysA[i];
      if (skip[k] !== 1) {
        skip[k] = 1;

        if (!hasOwnProp(b, k) || !equal(a[k], b[k], opts)) {
          return false;
        }
      }
    }

    if (!allowSubset) {
      for (let i = 0; i < lenB; i += 1) {
        const k = keysB[i];
        if (skip[k] !== 1) {
          skip[k] = 1;

          if (!hasOwnProp(a, k) || !equal(a[k], b[k], opts)) {
            return false;
          }
        }
      }
    }
  } else {
    for (let i = 0; i < lenA; i += 1) {
      const k = keysA[i];
      if (skip[k] !== 1) {
        skip[k] = 1;

        if (!equal(a[k], b[k], opts)) {
          return false;
        }
      }
    }

    if (!allowSubset) {
      for (let i = 0; i < lenB; i += 1) {
        const k = keysB[i];
        if (skip[k] !== 1) {
          skip[k] = 1;

          if (!equal(a[k], b[k], opts)) {
            return false;
          }
        }
      }
    }
  }

  return true;
};

export const equal = (a: any, b: any, opts: IEqualOptions): boolean => {
  // Same reference
  if (a === b || (a !== a && b !== b)) {
    return true;
  }

  const { normalize, equalValues } = opts;
  if (normalize) {
    // tslint:disable-next-line no-parameter-reassignment
    a = normalize(a);
    // tslint:disable-next-line no-parameter-reassignment
    b = normalize(b);

    // retest normalized
    if (a === b || (a !== a && b !== b)) {
      return true;
    }
  }

  if (equalValues && equalValues(a, b, opts)) {
    return true;
  }

  // Check both are objects
  if (!isObject(a) || !isObject(b)) {
    return false;
  }

  // Check array
  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }

  // Compare objects
  return equalObjects(a, b, opts);
};
