import { isObject } from '_src/is';
import { equalObjects } from './equalObjects';
import { IEqualOptions } from './ts';

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
