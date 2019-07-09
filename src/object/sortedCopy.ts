import { getKeys } from './getKeys';

export const sortedCopy = <T extends { [key: string]: any }>(obj: T): T => {
  let keys = getKeys(obj);
  const len = keys.length;
  const dest = {} as T;
  if (len) {
    keys = keys.sort();
    for (let i = 0; i < len; i += 1) {
      const key = keys[i];
      dest[key] = obj[key];
    }
  }
  return dest;
};
