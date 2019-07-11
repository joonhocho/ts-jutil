import { AnyObject } from '_src/ts';
import { getKeys } from './getKeys';

export const values = <T extends AnyObject>(obj: T): Array<T[keyof T]> => {
  const keys = getKeys(obj);
  const len = keys.length;
  // tslint:disable-next-line prefer-array-literal
  const list = new Array(len);
  for (let i = 0; i < len; i += 1) {
    list[i] = obj[keys[i]];
  }
  return list;
};
