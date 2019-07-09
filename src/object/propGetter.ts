import { AnyKey } from 'tsdef';

export type PropGetter<T, K extends keyof T> = (obj: T) => T[K];

// tslint:disable-next-line typedef
export const propGetter = <K extends AnyKey>(key: K) => <
  T extends { [k in K]: any }
>(
  obj: T
): T[K] => obj[key];
