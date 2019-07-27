import { WithoutUndefined } from '_src/ts';
import { AnyObject } from 'tsdef';
import { getKeys } from './getKeys';

export const deleteUndefinedProps = <T extends AnyObject>(
  obj: T
): WithoutUndefined<T> => {
  const keys = getKeys(obj);
  for (let i = 0, len = keys.length; i < len; i += 1) {
    const key = keys[i];
    if (obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
};
