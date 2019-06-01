import { AnyObject, OverwriteProps, UnionObjects, ValueOf } from 'tsdef';
import { isDefined, isNotNil } from './is';
import { WithoutNil, WithoutUndefined } from './type';

const { hasOwnProperty } = Object.prototype;

export const isObject = (o: any): boolean =>
  o !== null && typeof o === 'object';

export const isPlain = (o: any): boolean =>
  isObject(o) && (o.constructor === Object || o.constructor == null);

export const hasOwnProp = (o: any, k: keyof any): boolean =>
  typeof o.hasOwnProperty === 'function'
    ? o.hasOwnProperty(k)
    : hasOwnProperty.call(o, k);

export const isEmpty = (obj: AnyObject): boolean => !getKeys(obj).length;

export const getKeys: <T>(
  obj: T
) => Array<string & keyof T> = Object.keys as any;

export { getKeys as keys };

export const values = <T extends AnyObject>(obj: T): Array<T[keyof T]> => {
  const keys = getKeys(obj);
  const len = keys.length;
  // tslint:disable-next-line prefer-array-literal
  const list = new Array(len);
  for (let i = 0; i < len; i += 1) {
    list[i] = obj[keys[i]];
  }
  return list;
};

export const filterKeys = <
  T extends AnyObject,
  K extends keyof T,
  U extends AnyObject
>(
  obj: T,
  keys: K[],
  dest: U = {} as any
): OverwriteProps<U, Pick<T, K>> => {
  const out: any = dest;
  const len = keys.length;
  if (obj.hasOwnProperty) {
    for (let i = 0; i < len; i += 1) {
      const key = keys[i];
      if (obj.hasOwnProperty(key)) {
        out[key] = obj[key];
      }
    }
  } else {
    for (let i = 0; i < len; i += 1) {
      const key = keys[i];
      if (hasOwnProperty.call(obj, key)) {
        out[key] = obj[key];
      }
    }
  }
  return out;
};

export const withoutKeys = <
  T extends AnyObject,
  K extends keyof T,
  U extends AnyObject
>(
  obj: T,
  excludeKeys: K[],
  dest: U = {} as any
): OverwriteProps<U, Pick<T, Exclude<keyof T, K>>> => {
  const out: any = dest;
  const keys = getKeys(obj);
  const len = keys.length;
  for (let i = 0; i < len; i += 1) {
    // use for loop since no need to check hasOwnProperty
    const key = keys[i];
    if (excludeKeys.indexOf(key as any) === -1) {
      out[key] = obj[key];
    }
  }
  return out;
};

export const forEach = <T extends AnyObject>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T, obj: T) => void,
  thisp?: any
): void => {
  const keys = getKeys(obj);
  const len = keys.length;
  if (thisp == null) {
    for (let i = 0; i < len; i += 1) {
      // use for loop since no need to check hasOwnProperty
      const key = keys[i];
      fn(obj[key], key, obj);
    }
  } else {
    for (let i = 0; i < len; i += 1) {
      // use for loop since no need to check hasOwnProperty
      const key = keys[i];
      fn.call(thisp, obj[key], key, obj);
    }
  }
};

export const mapToArray = <T extends AnyObject, U>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T, obj: T) => U,
  thisp?: any
): Array<ReturnType<typeof fn>> => {
  const keys = getKeys(obj);
  const len = keys.length;
  // tslint:disable-next-line prefer-array-literal
  const res = new Array(len);
  if (thisp == null) {
    for (let i = 0; i < len; i += 1) {
      // use for loop since no need to check hasOwnProperty
      const key = keys[i];
      res[i] = fn(obj[key], key, obj);
    }
  } else {
    for (let i = 0; i < len; i += 1) {
      // use for loop since no need to check hasOwnProperty
      const key = keys[i];
      res[i] = fn.call(thisp, obj[key], key, obj);
    }
  }
  return res;
};

export const reduce = <T extends AnyObject, U>(
  obj: T,
  fn: (output: U, value: T[keyof T], key: keyof T, obj: T) => U,
  initial: U,
  thisp?: any
): U => {
  let value = initial;
  const keys = getKeys(obj);
  const len = keys.length;
  if (thisp == null) {
    for (let i = 0; i < len; i += 1) {
      // use for loop since no need to check hasOwnProperty
      const key = keys[i];
      value = fn(value, obj[key], key, obj);
    }
  } else {
    for (let i = 0; i < len; i += 1) {
      // use for loop since no need to check hasOwnProperty
      const key = keys[i];
      value = fn.call(thisp, value, obj[key], key, obj);
    }
  }
  return value;
};

export const map = <T extends AnyObject, U, D extends AnyObject>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T, obj: T) => U,
  thisp?: any,
  dest: D = {} as any
): OverwriteProps<D, { [P in keyof T]: U }> => {
  const out: any = dest;
  const keys = getKeys(obj);
  const len = keys.length;
  if (thisp == null) {
    for (let i = 0; i < len; i += 1) {
      const key = keys[i];
      out[key] = fn(obj[key], key, obj);
    }
  } else {
    for (let i = 0; i < len; i += 1) {
      const key = keys[i];
      out[key] = fn.call(thisp, obj[key], key, obj);
    }
  }
  return out;
};

export const filter = <T extends AnyObject, D extends AnyObject>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T, obj: T) => boolean,
  thisp?: any,
  dest: D = {} as any
): UnionObjects<D, Partial<{ [P in keyof T]: T[P] }>> => {
  const out: any = dest;
  const keys = getKeys(obj);
  const len = keys.length;
  if (thisp == null) {
    for (let i = 0; i < len; i += 1) {
      const key = keys[i];
      if (fn(obj[key], key, obj)) {
        out[key] = obj[key];
      }
    }
  } else {
    for (let i = 0; i < len; i += 1) {
      const key = keys[i];
      if (fn.call(thisp, obj[key], key, obj)) {
        out[key] = obj[key];
      }
    }
  }
  return out;
};

export const mapFilter = <T extends AnyObject, U, B, D extends AnyObject>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T, obj: T) => U,
  badValue: B,
  dest: D = {} as any
): OverwriteProps<D, Partial<{ [P in keyof T]: Exclude<U, B> }>> => {
  const out: any = dest;
  const keys = getKeys(obj);
  const len = keys.length;
  for (let i = 0; i < len; i += 1) {
    const key = keys[i];
    const value = fn(obj[key], key, obj);
    if ((value as any) !== badValue) {
      out[key] = value;
    }
  }
  return out;
};

export const withoutUndefined = <T extends AnyObject>(
  obj: T
): WithoutUndefined<T> => filter(obj, isDefined) as any;

export const withoutNil = <T extends AnyObject>(obj: T): WithoutNil<T> =>
  filter(obj, isNotNil) as any;

export const assignKeys = <
  T extends AnyObject,
  D extends AnyObject,
  K extends string
>(
  to: D,
  from: T,
  keys: K[]
): OverwriteProps<D, Pick<T, K & keyof T>> => {
  const out: any = to;
  const len = keys.length;
  for (let i = 0; i < len; i += 1) {
    const key = keys[i];
    const desc = Object.getOwnPropertyDescriptor(from, key);
    if (desc && desc.enumerable) {
      out[key] = from[key];
    }
  }
  return out;
};

export const assignDefined = <T extends AnyObject, D extends AnyObject>(
  to: D,
  from: T,
  keys = getKeys(from)
): OverwriteProps<D, T> => {
  const d = (to as any) as OverwriteProps<D, T>;
  const len = keys.length;
  for (let i = 0; i < len; i += 1) {
    const key = keys[i];
    const v = from[key];
    if (v !== undefined) {
      d[key] = v;
    }
  }
  return d;
};

export const copy = <
  T extends AnyObject,
  D extends AnyObject,
  K extends string
>(
  to: D,
  from: T,
  keys?: K[],
  own = true
): OverwriteProps<D, Pick<T, K & keyof T>> => {
  const out: any = to;
  if (keys) {
    const len = keys.length;
    if (own) {
      if (from.hasOwnProperty) {
        for (let i = 0; i < len; i += 1) {
          const key = keys[i];
          if (from.hasOwnProperty(key)) {
            out[key] = from[key];
          }
        }
      } else {
        for (let i = 0; i < len; i += 1) {
          const key = keys[i];
          if (hasOwnProperty.call(from, key)) {
            out[key] = from[key];
          }
        }
      }
    } else {
      for (let i = 0; i < len; i += 1) {
        const key = keys[i];
        if (key in from) {
          out[key] = from[key];
        }
      }
    }
  } else {
    const fkeys = getKeys(from);
    const len = fkeys.length;
    for (let i = 0; i < len; i += 1) {
      const key = fkeys[i];
      out[key] = from[key];
    }
  }
  return out;
};

export const mapKeys = <T extends AnyObject, D extends AnyObject>(
  obj: T,
  keyMappings: Partial<{ [P in keyof T]: string }>,
  dest: D = {} as any,
  own = true
): UnionObjects<
  D,
  { [P in NonNullable<ValueOf<typeof keyMappings>>]: ValueOf<T> }
> => {
  const out: any = dest;
  const keys = getKeys(keyMappings);
  const len = keys.length;
  if (own) {
    if (obj.hasOwnProperty) {
      for (let i = 0; i < len; i += 1) {
        const key = keys[i];
        if (obj.hasOwnProperty(key)) {
          out[(keyMappings as any)[key]] = obj[key];
        }
      }
    } else {
      for (let i = 0; i < len; i += 1) {
        const key = keys[i];
        if (hasOwnProperty.call(obj, key)) {
          out[(keyMappings as any)[key]] = obj[key];
        }
      }
    }
  } else {
    for (let i = 0; i < len; i += 1) {
      const key = keys[i];
      if (key in obj) {
        out[(keyMappings as any)[key]] = obj[key];
      }
    }
  }
  return out;
};

export const get = <TData = any>(
  obj: AnyObject | null,
  path: string
): TData | undefined => {
  if (!obj) {
    return undefined;
  }

  const keys = path.split('.');
  const lastIndex = keys.length - 1;

  let scope = obj;
  let i = 0;
  for (; i < lastIndex; i += 1) {
    scope = scope[keys[i]];
    if (!scope) {
      return undefined;
    }
  }
  return scope[keys[i]];
};

export const getter = <TData = any>(
  path: string
): ((obj: AnyObject | null) => TData | undefined) => {
  const keys = path.split('.');
  const lastIndex = keys.length - 1;

  return (obj: AnyObject | null): TData | undefined => {
    if (!obj) {
      return undefined;
    }

    let scope = obj;
    let i = 0;
    for (; i < lastIndex; i += 1) {
      scope = scope[keys[i]];
      if (!scope) {
        return undefined;
      }
    }
    return scope[keys[i]];
  };
};

// tslint:disable-next-line typedef
export const setter = (
  path: string,
  createObject?: (key: string, path: string[], parent: AnyObject) => any
) => {
  const keys = path.split('.');
  const lastIndex = keys.length - 1;

  if (createObject) {
    return <T extends AnyObject, U extends T>(obj: T, value: any): U => {
      let scope: AnyObject = obj;
      let i = 0;
      const curPath = [];
      for (; i < lastIndex; i += 1) {
        const key = keys[i];
        curPath.push(key);
        scope = scope[key] || (scope[key] = createObject(key, curPath, scope));
      }
      scope[keys[i]] = value;
      return obj as U;
    };
  }

  return <T extends AnyObject, U extends T>(obj: T, value: any): U => {
    let scope: AnyObject = obj;
    let i = 0;
    for (; i < lastIndex; i += 1) {
      const key = keys[i];
      scope = scope[key] || (scope[key] = {});
    }
    scope[keys[i]] = value;
    return obj as U;
  };
};

// tslint:disable-next-line typedef
export const immutableSetter = (
  path: string,
  cloneObject?: (
    obj: any,
    key: string,
    path: string[],
    parent: AnyObject
  ) => any
) => {
  const keys = path.split('.');
  const lastIndex = keys.length - 1;

  const getValue = getter(path);

  if (cloneObject) {
    return <T extends AnyObject, U extends T>(obj: T, value: any): U => {
      if (getValue(obj) === value) {
        return obj as U;
      }

      const newObj = { ...(obj as AnyObject) };
      let scope = newObj;
      let i = 0;
      const curPath = [];
      for (; i < lastIndex; i += 1) {
        const key = keys[i];
        curPath.push(key);
        scope = scope[key] = cloneObject(scope[key], key, curPath, scope);
      }
      scope[keys[i]] = value;
      return newObj as U;
    };
  }

  return <T extends AnyObject, U extends T>(obj: T, value: any): U => {
    if (getValue(obj) === value) {
      return obj as U;
    }

    const newObj = { ...(obj as AnyObject) };
    let scope = newObj;
    let i = 0;
    for (; i < lastIndex; i += 1) {
      const key = keys[i];
      scope = scope[key] = { ...scope[key] };
    }
    scope[keys[i]] = value;
    return newObj as U;
  };
};

interface IEnum {
  [key: string]: number;
}

export const enums = (list: string[], start = 1): IEnum => {
  const dest: IEnum = {};
  const len = list.length;
  for (let i = 0; i < len; i += 1) {
    dest[list[i]] = start + i;
  }
  return dest;
};

export const getterMap = <TData>(mapping: {
  [key: string]: string;
}): ((obj: AnyObject | null) => TData) => {
  const keys = getKeys(mapping);
  const getters = keys.map((k) => getter(mapping[k]));
  const len = keys.length;

  return (obj: AnyObject | null): TData => {
    const dest = {} as any;
    for (let i = 0; i < len; i += 1) {
      dest[keys[i]] = getters[i](obj);
    }
    return dest;
  };
};

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
