import { OverwriteProps } from 'tsdef';

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
