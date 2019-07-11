import { map } from '_src/array/map';
import { isObject } from '_src/is';
import { map as mapObj } from '_src/object/map';

export const cloneDeep = <T>(obj: T): T => {
  if (isObject(obj)) {
    if (Array.isArray(obj)) {
      return map(obj, cloneDeep) as any;
    }

    return mapObj(obj, cloneDeep) as any;
  }
  return obj;
};
