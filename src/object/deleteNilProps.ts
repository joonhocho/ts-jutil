import { WithoutNil } from '_src/ts';
import { AnyObject } from 'tsdef';
import { getKeys } from './getKeys';

export const deleteNilProps = <T extends AnyObject>(obj: T): WithoutNil<T> => {
  const keys = getKeys(obj);
  for (let i = 0, len = keys.length; i < len; i += 1) {
    const key = keys[i];
    if (obj[key] == null) {
      delete obj[key];
    }
  }
  return obj;
};
