import { AnyObject } from '_src/ts';
import { getKeys } from './getKeys';
import { getter } from './getter';

export const getterMap = <TData>(mapping: {
  [key: string]: string;
}): ((obj: AnyObject | null) => TData) => {
  const keys = getKeys(mapping);
  const getters = keys.map((k) => getter(mapping[k]));
  const len = keys.length;

  return (obj: AnyObject | null): TData => {
    const dest = {} as any;
    for (let i = 0; i < len; i += 1) {
      dest[keys[i]] = getters[i](obj);
    }
    return dest;
  };
};
