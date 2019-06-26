import { bypass } from 'src/func';
import { isDefined, isNotNil } from 'src/is';
import { AnyObject } from './type';

type toKeyFn<T> = (item: T, i: number, list: T[]) => string | number;

export const first = <T>(arr: T[]): T | undefined =>
  arr.length > 0 ? arr[0] : undefined;

export const last = <T>(arr: T[]): T | undefined =>
  arr.length > 0 ? arr[arr.length - 1] : undefined;

export const forEach = <T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => any
): void => {
  const len = arr.length;
  for (let i = 0; i < len; i += 1) {
    fn(arr[i], i, arr);
  }
};

export const map = <T, U>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => U
): U[] => {
  const len = arr.length;
  const list: U[] = new Array(len);
  for (let i = 0; i < len; i += 1) {
    list[i] = fn(arr[i], i, arr);
  }
  return list;
};

export const filter = <T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => any
): T[] => {
  const len = arr.length;
  const list: T[] = [];
  for (let i = 0; i < len; i += 1) {
    const item = arr[i];
    if (fn(item, i, arr)) {
      list.push(item);
    }
  }
  return list;
};

export const mapFilter = <T, U, B>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => U,
  badValue: B
): Array<Exclude<U, B>> => {
  const len = arr.length;
  const list: Array<Exclude<U, B>> = [];
  for (let i = 0; i < len; i += 1) {
    const value = fn(arr[i], i, arr);
    if ((value as any) !== badValue) {
      list.push(value as Exclude<U, B>);
    }
  }
  return list;
};

export const mapToUniqueString = <T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => string | null | undefined
): string[] => {
  const idMap: { [key: string]: true } = {};
  const res: string[] = [];
  const len = arr.length;
  for (let i = 0; i < len; i += 1) {
    const id = fn(arr[i], i, arr);
    if (id != null && idMap[id] !== true) {
      idMap[id] = true;
      res.push(id);
    }
  }
  return res;
};

export const every = <T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => any
): boolean => {
  const len = arr.length;
  for (let i = 0; i < len; i += 1) {
    if (!fn(arr[i], i, arr)) {
      return false;
    }
  }
  return true;
};

export const some = <T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => any
): boolean => {
  const len = arr.length;
  for (let i = 0; i < len; i += 1) {
    if (fn(arr[i], i, arr)) {
      return true;
    }
  }
  return false;
};

export const reduce = <T, U>(
  arr: T[],
  fn: (value: U, item: T, index: number, array: T[]) => U,
  initialValue: U
): U => {
  const len = arr.length;
  let v = initialValue;
  for (let i = 0; i < len; i += 1) {
    v = fn(v, arr[i], i, arr);
  }
  return v;
};

export const reduceRight = <T, U>(
  arr: T[],
  fn: (value: U, item: T, index: number, array: T[]) => U,
  initialValue: U
): U => {
  let v = initialValue;
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    v = fn(v, arr[i], i, arr);
  }
  return v;
};

export const find = <T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => boolean
): T | undefined => {
  const len = arr.length;
  for (let i = 0; i < len; i += 1) {
    if (fn(arr[i], i, arr)) {
      return arr[i];
    }
  }
  return undefined;
};

export const findLast = <T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => boolean
): T | undefined => {
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    if (fn(arr[i], i, arr)) {
      return arr[i];
    }
  }
  return undefined;
};

export const findIndex = <T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => boolean
): number => {
  const len = arr.length;
  for (let i = 0; i < len; i += 1) {
    if (fn(arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
};

export const findLastIndex = <T>(
  arr: T[],
  fn: (item: T, index: number, array: T[]) => boolean
): number => {
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    if (fn(arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
};

export const reduceFunctions = <U>(
  fns: [(value: U) => U],
  initialValue: U
): U => {
  let v = initialValue;
  const len = fns.length;
  for (let i = 0; i < len; i += 1) {
    v = fns[i](v);
  }
  return v;
};

export const reduceRightFunctions = <U>(
  fns: [(value: U) => U],
  initialValue: U
): U => {
  let v = initialValue;
  for (let i = fns.length - 1; i >= 0; i -= 1) {
    v = fns[i](v);
  }
  return v;
};

export const pluck = <T, K extends keyof T>(arr: T[], key: K): Array<T[K]> =>
  arr.map((x) => x[key]);

export const maybeAdd = <T>(arr: T[], item: T): number => {
  if (arr.indexOf(item) === -1) {
    arr.push(item);
    return arr.length - 1;
  }
  return -1;
};

export const maybeRemoveFirst = <T>(arr: T[], item: T): number => {
  const index = arr.indexOf(item);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return index;
};

export const maybeRemoveLast = <T>(arr: T[], item: T): number => {
  const index = arr.lastIndexOf(item);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return index;
};

export const withoutFalsy = <T>(
  arr: T[]
): Array<Exclude<T, null | undefined | false | '' | 0>> =>
  arr.filter(bypass) as any;

export const withoutUndefined = <T>(arr: T[]): Array<Exclude<T, undefined>> =>
  arr.filter(isDefined) as any;

export const withoutNil = <T>(arr: T[]): Array<Exclude<T, undefined | null>> =>
  arr.filter(isNotNil) as any;

export const withoutItem = <T>(arr: T[], item: T): T[] =>
  arr.filter((x) => x !== item);

export const toggle = <T>(arr: T[], item: T): void => {
  const index = arr.indexOf(item);
  if (index === -1) {
    arr.push(item);
  } else {
    arr.splice(index, 1);
  }
};

export const pushToSet = <T>(arr: T[], item: T): boolean => {
  if (arr.indexOf(item) === -1) {
    arr.push(item);
    return true;
  }
  return false;
};

export const prependToSet = <T>(arr: T[], item: T): boolean => {
  if (arr.indexOf(item) === -1) {
    arr.unshift(item);
    return true;
  }
  return false;
};

export const pushToNewSet = <T>(arr: T[], item: T): T[] => {
  if (arr.indexOf(item) === -1) {
    return arr.concat([item]);
  }
  return arr;
};

export const prependToNewSet = <T>(arr: T[], item: T): T[] => {
  if (arr.indexOf(item) === -1) {
    return [item].concat(arr);
  }
  return arr;
};

export const forN = (
  count: number,
  fn: (i: number) => void,
  thisp?: any
): void => {
  if (thisp == null) {
    for (let i = 0; i < count; i += 1) {
      fn(i);
    }
  } else {
    for (let i = 0; i < count; i += 1) {
      fn.call(thisp, i);
    }
  }
};

export const mapN = <T, A extends any[]>(
  count: number,
  fn: (...args: A) => T,
  args?: A | null,
  thisp?: any
): T[] => {
  // tslint:disable-next-line prefer-array-literal
  const results: T[] = new Array(count);
  if (args && args.length) {
    for (let i = 0; i < count; i += 1) {
      results[i] = fn.apply(thisp, args);
    }
  } else {
    if (thisp == null) {
      for (let i = 0; i < count; i += 1) {
        results[i] = (fn as any)(i);
      }
    } else {
      for (let i = 0; i < count; i += 1) {
        results[i] = (fn as any).call(thisp, i);
      }
    }
  }
  return results;
};

const concatFn = <T, U>(a: T[], b: U[]): Array<T | U> => [...a, ...b];

export const concatArrays = <T>(arrays: T[][]): T[] =>
  arrays.reduce(concatFn, []);

export const shallowEqual = <T>(a: T[] | null, b: T[] | null): boolean => {
  if (a === b) {
    return true;
  }
  if (
    !a !== !b ||
    !a ||
    !b ||
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a.length !== b.length
  ) {
    return false;
  }

  const len = a.length;
  for (let i = 0; i < len; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

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

export const countByIndex = <T>(
  list: T[],
  toKey?: toKeyFn<T> | keyof T | null,
  dest: { [k: string]: number } = {}
): { [k: string]: number } => {
  const len = list.length;
  const out: any = dest;
  if (len > 0) {
    switch (typeof toKey) {
      case 'function':
        // get id by function
        for (let i = 0; i < len; i += 1) {
          const id = (toKey as any)(list[i], i, list);
          out[id] = (out[id] || 0) + 1;
        }
        break;
      case 'string':
        // property is id
        for (let i = 0; i < len; i += 1) {
          const id = list[i][toKey as keyof T];
          out[id] = (out[id] || 0) + 1;
        }
        break;
      default:
        // item is id
        for (let i = 0; i < len; i += 1) {
          const id = list[i];
          out[id] = (out[id] || 0) + 1;
        }
        break;
    }
  }
  return out;
};

export const uniqueItems = <T extends number | string>(list: T[]): T[] => {
  if (!list.length) {
    return [];
  }

  const exists: {
    [k: number]: 1;
    [k: string]: 1;
  } = {};

  return list.filter((x) => {
    if (exists[x] === 1) {
      return false;
    }
    exists[x] = 1;
    return true;
  });
};

export const uniqueByKey = <
  T extends { [k in K]: number | string },
  K extends string
>(
  list: T[],
  key: K
): T[] => {
  if (!list.length) {
    return [];
  }

  const exists: {
    [k: number]: 1;
    [k: string]: 1;
  } = {};

  return list.filter((x) => {
    const k = x[key];
    if (exists[k] === 1) {
      return false;
    }
    exists[k] = 1;
    return true;
  });
};

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

export const union = <T>(a: T[], b: T[], toKey?: toKeyFn<T> | keyof T): T[] =>
  unique([...a, ...b], toKey);

export const intersection = <T>(
  a: T[],
  b: T[],
  toKey?: toKeyFn<T> | keyof T | null,
  uniq = true
): T[] => {
  const alen = a.length;
  const blen = b.length;
  const out: T[] = [];
  if (!alen || !blen) {
    return out;
  }

  const bmap: any = countByIndex(b, toKey);
  const toKeyT = typeof toKey;

  if (uniq) {
    switch (toKeyT) {
      case 'function':
        for (let i = 0; i < alen; i += 1) {
          const ai = a[i];
          const k = (toKey as any)(ai, i, a);
          if (bmap[k] > 0) {
            bmap[k] = -1;
            out.push(ai);
          }
        }
        break;
      case 'string':
        for (let i = 0; i < alen; i += 1) {
          const ai = a[i];
          const k = ai[toKey as keyof T];
          if (bmap[k] > 0) {
            bmap[k] = -1;
            out.push(ai);
          }
        }
        break;
      default:
        for (let i = 0; i < alen; i += 1) {
          const ai = a[i];
          const k = ai;
          if (bmap[k] > 0) {
            bmap[k] = -1;
            out.push(ai);
          }
        }
        break;
    }
  } else {
    switch (toKeyT) {
      case 'function':
        for (let i = 0; i < alen; i += 1) {
          const ai = a[i];
          const k = (toKey as any)(ai, i, a);
          if (bmap[k] > 0) {
            bmap[k] -= 1;
            out.push(ai);
          }
        }
        break;
      case 'string':
        for (let i = 0; i < alen; i += 1) {
          const ai = a[i];
          const k = ai[toKey as keyof T];
          if (bmap[k] > 0) {
            bmap[k] -= 1;
            out.push(ai);
          }
        }
        break;
      default:
        for (let i = 0; i < alen; i += 1) {
          const ai = a[i];
          const k = ai;
          if (bmap[k] > 0) {
            bmap[k] -= 1;
            out.push(ai);
          }
        }
        break;
    }
  }

  return out;
};

export const diff = <T>(
  a: T[],
  b: T[],
  toKey?: toKeyFn<T> | keyof T | null,
  uniq = true
): T[] => {
  const alen = a.length;
  const blen = b.length;
  if (!alen) {
    return [];
  }
  if (!blen) {
    return uniq ? unique(a, toKey == null ? undefined : toKey) : a.slice();
  }

  const out: T[] = [];
  const bmap: any = countByIndex(b, toKey);
  const toKeyT = typeof toKey;

  if (uniq) {
    switch (toKeyT) {
      case 'function':
        for (let i = 0; i < alen; i += 1) {
          const ai = a[i];
          const k = (toKey as any)(ai, i, a);
          if (!(bmap[k] > 0)) {
            bmap[k] = 1;
            out.push(ai);
          }
        }
        break;
      case 'string':
        for (let i = 0; i < alen; i += 1) {
          const ai = a[i];
          const k = ai[toKey as keyof T];
          if (!(bmap[k] > 0)) {
            bmap[k] = 1;
            out.push(ai);
          }
        }
        break;
      default:
        for (let i = 0; i < alen; i += 1) {
          const ai = a[i];
          const k = ai;
          if (!(bmap[k] > 0)) {
            bmap[k] = 1;
            out.push(ai);
          }
        }
        break;
    }
  } else {
    switch (toKeyT) {
      case 'function':
        for (let i = 0; i < alen; i += 1) {
          const ai = a[i];
          const k = (toKey as any)(ai, i, a);
          if (bmap[k] > 0) {
            bmap[k] -= 1;
          } else {
            bmap[k] = -1;
            out.push(ai);
          }
        }
        break;
      case 'string':
        for (let i = 0; i < alen; i += 1) {
          const ai = a[i];
          const k = ai[toKey as keyof T];
          if (bmap[k] > 0) {
            bmap[k] -= 1;
          } else {
            bmap[k] = -1;
            out.push(ai);
          }
        }
        break;
      default:
        for (let i = 0; i < alen; i += 1) {
          const ai = a[i];
          const k = ai;
          if (bmap[k] > 0) {
            bmap[k] -= 1;
          } else {
            bmap[k] = -1;
            out.push(ai);
          }
        }
        break;
    }
  }

  return out;
};

export const join = <T, U>(arr: T[], sep: U): Array<T | U> => {
  const res: any[] = [];
  const len = arr.length;
  if (len !== 0) {
    res.push(arr[0]);
    for (let i = 1; i < len; i += 1) {
      res.push(sep, arr[i]);
    }
  }
  return res;
};

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
