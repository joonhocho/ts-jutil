import { AnyObject, toKeyFn } from 'src/ts';

export const indexItems = <T>(
  list: T[],
  toKey: toKeyFn<T> | keyof T,
  dest: AnyObject = {}
): { [k: string]: T } => {
  const len = list.length;
  const out: any = dest;
  if (len > 0) {
    if (typeof toKey === 'function') {
      for (let i = 0; i < len; i += 1) {
        const item = list[i];
        const k = toKey(item, i, list);
        if (k != null) {
          out[k] = item;
        }
      }
    } else {
      for (let i = 0; i < len; i += 1) {
        const item = list[i];
        const k = item && item[toKey];
        if (k != null) {
          out[k] = item;
        }
      }
    }
  }
  return out;
};
