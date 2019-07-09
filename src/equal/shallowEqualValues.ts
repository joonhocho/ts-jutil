import { IEqualValuesOptions } from './ts';

export const shallowEqualValues = (
  a: any,
  b: any,
  opts?: IEqualValuesOptions
): boolean => {
  // Same reference
  if (a === b || (a !== a && b !== b)) {
    return true;
  }

  if (opts) {
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

    return equalValues != null && equalValues(a, b, opts);
  }

  return false;
};
