import { AnyObject } from '_src/ts';
import { UnionObjects, ValueOf } from 'tsdef';
import { getKeys } from './getKeys';
import { hasOwnProperty } from './hasOwnProp';

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
