import { toKeyFn } from 'src/ts';

export const unique = <T>(list: T[], toKey?: toKeyFn<T> | keyof T): T[] => {
  if (!list.length) {
    return [];
  }

  const exists: { [k: string]: 1 } = {};
  switch (typeof toKey) {
    case 'function':
      return list.filter((x, i) => {
        const k = (toKey as any)(x, i, list);
        if (k == null || exists[k] === 1) {
          return false;
        }
        exists[k] = 1;
        return true;
      });
    case 'string':
      return list.filter((x) => {
        const k = x[toKey as keyof T] as any;
        if (k == null || exists[k] === 1) {
          return false;
        }
        exists[k] = 1;
        return true;
      });
    default:
      return list.filter((x) => {
        const k = String(x);
        if (exists[k] === 1) {
          return false;
        }
        exists[k] = 1;
        return true;
      });
  }
};
