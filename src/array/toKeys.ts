import { AnyObject, toKeyFn } from '_src/ts';

export const toKeys = <T, U>(
  list: T[],
  toKey?: toKeyFn<T> | keyof T | null,
  toValue: ((...args: any[]) => U) | U | boolean = true,
  dest: AnyObject = {}
): { [k: string]: U } => {
  type ToValueFn = (...args: any[]) => U;
  const len = list.length;
  const out: any = dest;
  if (len) {
    switch (typeof toKey) {
      case 'function': {
        if (typeof toValue === 'function') {
          for (let i = 0; i < len; i += 1) {
            const item = list[i];
            const k = (toKey as any)(item, i, list);
            if (k != null) {
              out[k] = (toValue as ToValueFn)(item, k, i, list);
            }
          }
        } else {
          for (let i = 0; i < len; i += 1) {
            const item = list[i];
            const k = (toKey as any)(item, i, list);
            if (k != null) {
              out[k] = toValue;
            }
          }
        }
        break;
      }
      case 'string': {
        if (typeof toValue === 'function') {
          for (let i = 0; i < len; i += 1) {
            const item = list[i];
            const k = item[toKey as keyof T];
            if (k != null) {
              out[k] = (toValue as ToValueFn)(item, k, i, list);
            }
          }
        } else {
          for (let i = 0; i < len; i += 1) {
            const item = list[i];
            const k = item[toKey as keyof T];
            if (k != null) {
              out[k] = toValue;
            }
          }
        }
        break;
      }
      default: {
        if (typeof toValue === 'function') {
          for (let i = 0; i < len; i += 1) {
            const item = list[i];
            if (item != null) {
              out[item] = (toValue as ToValueFn)(item, item, i, list);
            }
          }
        } else {
          for (let i = 0; i < len; i += 1) {
            const item = list[i];
            if (item != null) {
              out[item] = toValue;
            }
          }
        }
      }
    }
  }
  return out;
};
