import { OverwriteProps } from 'tsdef';

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
