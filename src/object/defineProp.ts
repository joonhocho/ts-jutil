import { OverwriteProps } from 'tsdef';

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
