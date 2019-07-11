import { AnyObject, toKeyFn } from '_src/ts';

export const indexItemsToList = <T>(
  list: T[],
  toKey: toKeyFn<T> | keyof T,
  dest: AnyObject = {}
): { [k: string]: T[] } => {
  const len = list.length;
  const out: any = dest;
  if (len > 0) {
    if (typeof toKey === 'function') {
      for (let i = 0; i < len; i += 1) {
        const item = list[i];
        const k = toKey(item, i, list);
        if (k != null) {
          const l = out[k];
          if (l) {
            l.push(item);
          } else {
            out[k] = [item];
          }
        }
      }
    } else {
      for (let i = 0; i < len; i += 1) {
        const item = list[i];
        const k = item && item[toKey];
        if (k != null) {
          const l = out[k];
          if (l) {
            l.push(item);
          } else {
            out[k] = [item];
          }
        }
      }
    }
  }
  return out;
};
