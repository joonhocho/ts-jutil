import { OverwriteProps } from 'tsdef';
import { hasOwnProp } from './object';
import { PropKey } from './type';

export const defineProp = <T extends object, K extends string, V>(
  obj: T,
  key: K,
  value: V
): OverwriteProps<T, { [k in K]: V }> =>
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    value,
    writable: true,
  });

export const defineMethod = <T extends object, K extends string, V>(
  obj: T,
  key: K,
  value: V
): OverwriteProps<T, { [k in K]: V }> =>
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value,
    writable: true,
  });

const defaultPropDesc = {
  writable: true,
  enumerable: true,
  configurable: true,
};

export const defineLazyProp = <T extends object, K extends string, V>(
  obj: T,
  key: K,
  getter: (this: T) => V,
  {
    writable = true,
    enumerable = true,
    configurable = true,
  }: {
    writable: boolean;
    enumerable: boolean;
    configurable: boolean;
  } = defaultPropDesc
): OverwriteProps<T, { [k in K]: V }> =>
  Object.defineProperty(obj, key, {
    get(): V {
      // Use 'this' instead of obj so that obj can be a prototype.
      const value = getter.call(this);
      Object.defineProperty(this, key, {
        value,
        writable,
        enumerable,
        configurable,
      });
      return value;
    },
    enumerable,
    configurable: true,
  });

export const inheritProp = <T, F, K extends keyof F, TK extends PropKey>(
  to: T,
  from: F,
  fromKey: K,
  toKey?: TK
): OverwriteProps<
  T,
  TK extends string ? { [P in TK]: F[K] } : { [P in keyof F]: F[P] }
> => {
  const desc = Object.getOwnPropertyDescriptor(from, fromKey);
  if (desc) {
    return Object.defineProperty(to, toKey || fromKey, desc);
  }
  return to as any;
};

export const inheritProps = <T, F, E extends { [key: string]: 1 }>(
  to: T,
  from: F,
  excludeKeys?: E
): OverwriteProps<T, Pick<F, Exclude<keyof F, keyof T | keyof E>>> => {
  const fromKeys = Object.getOwnPropertyNames(from);
  const len = fromKeys.length;

  if (excludeKeys) {
    for (let i = 0; i < len; i += 1) {
      const key: keyof F = fromKeys[i] as any;
      if ((excludeKeys as any)[key] !== 1 && !hasOwnProp(to, key)) {
        inheritProp(to, from, key);
      }
    }
  } else {
    for (let i = 0; i < len; i += 1) {
      const key: keyof F = fromKeys[i] as any;
      if (!hasOwnProp(to, key)) {
        inheritProp(to, from, key);
      }
    }
  }

  return to as any;
};

const classStaticExclude: { [key: string]: 1 } = {
  length: 1,
  name: 1,
  arguments: 1,
  caller: 1,
  prototype: 1,
};

// tslint:disable-next-line typedef
export const inheritStatic = <T, F, E extends { [key: string]: 1 }>(
  to: T,
  from: F,
  excludeKeys?: E
) => inheritProps(to, from, { ...classStaticExclude, ...(excludeKeys as any) });

const prototypeExclude = { constructor: 1 };

export const inheritPrototype = <
  TP,
  T extends { prototype: TP },
  FP,
  F extends { prototype: FP },
  E extends { [key: string]: 1 }
>(
  to: T,
  from: F,
  excludeKeys?: E
): T => {
  inheritProps(to.prototype, from.prototype, {
    ...prototypeExclude,
    ...(excludeKeys as any),
  });
  return to;
};

export const inheritClass = <
  TP,
  T extends { prototype: TP },
  FP,
  F extends { prototype: FP },
  E extends { [key: string]: 1 }
>(
  to: T,
  from: F,
  excludeKeys?: E
): T => {
  inheritStatic(to, from, excludeKeys);
  inheritPrototype(to, from, excludeKeys);
  return to;
};
