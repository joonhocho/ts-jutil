import { map } from 'src/array/map';
import { isObject } from 'src/is';
import { map as mapObj } from 'src/object/map';

export const cloneDeep = <T>(obj: T): T => {
  if (isObject(obj)) {
    if (Array.isArray(obj)) {
      return map(obj, cloneDeep) as any;
    }

    return mapObj(obj, cloneDeep) as any;
  }
  return obj;
};
