import { map } from './array';
import { getKeys, isObject, map as mapObject } from './object';
import { AnyObject, Exact, ReturnTypeOrNever } from './type';

export const cloneDeep = <T>(obj: T): T => {
  if (isObject(obj)) {
    if (Array.isArray(obj)) {
      return map(obj, cloneDeep) as any;
    }

    return mapObject(obj, cloneDeep) as any;
  }
  return obj;
};

type MapFN = (value: any, key: string | number, obj: object | any[]) => any;

export const deepMapObjectWithoutEmpty = <
  T extends AnyObject,
  FN extends MapFN
>(
  obj: T,
  fn: FN
): { [P in keyof T]?: any } | null => {
  const copy: AnyObject = {};
  const keys = getKeys(obj);
  const len = keys.length;
  let nonEmpty = false;

  for (let i = 0; i < len; i += 1) {
    const key = keys[i];
    const value = obj[key];

    let newValue;
    if (isObject(value)) {
      if (Array.isArray(value)) {
        newValue = deepMapArrayWithoutEmpty(value, fn);
      } else {
        newValue = deepMapObjectWithoutEmpty(value, fn);
      }
    } else {
      newValue = fn(value, key, obj);
    }

    if (newValue != null && newValue === newValue) {
      nonEmpty = true;
      copy[key] = newValue;
    }
  }
  return nonEmpty ? (copy as any) : null;
};

export const deepMapArrayWithoutEmpty = <I, T extends I[], FN extends MapFN>(
  arr: T,
  fn: FN
): any[] | null => {
  const copy = [];
  const len = arr.length;
  for (let i = 0; i < len; i += 1) {
    const value = arr[i];

    let newValue;
    if (isObject(value)) {
      if (Array.isArray(value)) {
        newValue = deepMapArrayWithoutEmpty(value, fn);
      } else {
        newValue = deepMapObjectWithoutEmpty(value, fn);
      }
    } else {
      newValue = fn(value, i, arr);
    }

    if (newValue != null && newValue === newValue) {
      copy.push(newValue);
    }
  }
  return copy.length ? copy : null;
};

export const mapStruct = <
  T extends AnyObject,
  M extends Exact<{ [P in keyof T]-?: (value: T[P], key: P, obj: T) => any }, M>
>(
  obj: T,
  fnMap: M
):
  | { [P in keyof T]?: Exclude<ReturnTypeOrNever<M[P]>, undefined> }
  | undefined => {
  const copy = {} as {
    [P in keyof T]?: Exclude<ReturnTypeOrNever<M[P]>, undefined>
  };
  const keys = getKeys(obj);
  const len = keys.length;
  let nonEmpty = false;

  for (let i = 0; i < len; i += 1) {
    const key = keys[i];
    const fn = fnMap[key];
    if (fn) {
      const value = (fn as any)(obj[key], key, obj);
      if (value !== undefined && value === value) {
        nonEmpty = true;
        copy[key] = value;
      }
    }
  }

  return nonEmpty ? copy : undefined;
};

export const mapStructPartial = <
  T extends AnyObject,
  M extends {
    [P in keyof M]: (
      value: P extends keyof T ? T[P] : any,
      key: P,
      obj: T
    ) => any
  }
>(
  obj: T,
  fnMap: M
): { [P in keyof M]?: Exclude<ReturnType<M[P]>, undefined> } | undefined => {
  const copy = {} as { [P in keyof M]?: Exclude<ReturnType<M[P]>, undefined> };
  const keys = getKeys(fnMap);
  const len = keys.length;
  let nonEmpty = false;

  for (let i = 0; i < len; i += 1) {
    const key = keys[i];
    const value = fnMap[key]((obj as any)[key], key, obj);
    if (value !== undefined && value === value) {
      nonEmpty = true;
      copy[key] = value;
    }
  }

  return nonEmpty ? copy : undefined;
};
