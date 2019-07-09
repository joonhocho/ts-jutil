import { getKeys } from 'src/object/getKeys';

export type Unpromise<T> = T extends Promise<infer U> ? U : T;

export const allValues = <T extends { [key: string]: any }>(
  mapOfPromise: T
): Promise<{ [K in keyof T]: Unpromise<T[K]> }> => {
  const keys = getKeys(mapOfPromise);
  const len = keys.length;
  const promises = new Array(len);
  for (let i = 0; i < len; i += 1) {
    promises[i] = mapOfPromise[keys[i]];
  }
  return Promise.all(promises).then((values) => {
    const mapped: { [K in keyof T]: Unpromise<T[K]> } = {} as any;
    for (let i = 0; i < len; i += 1) {
      mapped[keys[i]] = values[i];
    }
    return mapped;
  });
};

export const promiseAll = allValues;
