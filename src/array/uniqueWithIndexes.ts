import { toKeyFn } from 'src/ts';

export const uniqueWithIndexes = <T>(
  list: T[],
  toKey?: toKeyFn<T> | keyof T
): { list: T[]; indexes: number[] } => {
  const len = list.length;
  const indexes: number[] = [];
  if (!len) {
    return { list: [], indexes };
  }

  // Object.create(null) is slow for lookup
  const keyToIndex: {
    [key: string]: any;
    [key: number]: any;
  } = {};

  let ulist: T[];
  let index = 0;

  switch (typeof toKey) {
    case 'function':
      ulist = list.filter((x, i) => {
        const k = (toKey as any)(x, i, list);
        if (typeof keyToIndex[k] === 'number') {
          indexes[i] = keyToIndex[k];
          return false;
        }
        indexes[i] = keyToIndex[k] = index;
        index += 1;
        return true;
      });
      break;
    case 'string':
      ulist = list.filter((x, i) => {
        const k = x[toKey as keyof T] as any;
        if (typeof keyToIndex[k] === 'number') {
          indexes[i] = keyToIndex[k];
          return false;
        }
        indexes[i] = keyToIndex[k] = index;
        index += 1;
        return true;
      });
      break;
    default:
      ulist = list.filter((x, i) => {
        const k = String(x);
        if (typeof keyToIndex[k] === 'number') {
          indexes[i] = keyToIndex[k];
          return false;
        }
        indexes[i] = keyToIndex[k] = index;
        index += 1;
        return true;
      });
      break;
  }

  return { list: ulist, indexes };
};
