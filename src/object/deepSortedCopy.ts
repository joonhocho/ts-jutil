import { getKeys } from './getKeys';

export const deepSortedCopy = <T>(obj: T): T => {
  if (obj == null || typeof obj !== 'object') {
    // primitive
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepSortedCopy) as any;
  }

  const { constructor } = obj as any;
  if (constructor != null && constructor !== Object) {
    return obj;
  }

  let keys = getKeys(obj);
  const len = keys.length;
  const dest = {} as T;
  if (len) {
    keys = keys.sort();
    for (let i = 0; i < len; i += 1) {
      const key = keys[i];
      (dest as any)[key] = deepSortedCopy((obj as any)[key]);
    }
  }

  return dest;
};
