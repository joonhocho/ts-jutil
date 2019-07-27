import { mapItems } from '_src/array/mapItems';
import { isObject } from '_src/is';
import { mapProps } from '_src/object/mapProps';

export const cloneDeep = <T>(obj: T): T => {
  if (isObject(obj)) {
    if (Array.isArray(obj)) {
      return mapItems(obj, cloneDeep) as any;
    }

    return mapProps(obj, cloneDeep) as any;
  }
  return obj;
};
