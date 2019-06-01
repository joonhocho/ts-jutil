import {
  AnyFunction,
  AnyObjectWithStringKeys,
  NonNil,
  NonUndefined,
} from 'tsdef';

export type PropKey = string | number | symbol;

export type AnyObject = AnyObjectWithStringKeys;

export type ReturnTypeOrNever<T> = T extends AnyFunction
  ? ReturnType<T>
  : never;

export type Exact<T, X extends T> = T &
  { [K in keyof X]: K extends keyof T ? X[K] : never };

export type KeyOfTypeReverse<T, U> = {
  [P in keyof T]-?: U extends T[P] ? P : never
}[keyof T];

export type WithoutUndefined<T> = Pick<
  T,
  Exclude<keyof T, KeyOfTypeReverse<T, undefined>>
> &
  { [P in KeyOfTypeReverse<T, undefined>]?: NonUndefined<T[P]> };

export type WithoutNil<T> = Pick<
  T,
  Exclude<keyof T, KeyOfTypeReverse<T, undefined | null>>
> &
  { [P in KeyOfTypeReverse<T, undefined | null>]?: NonNil<T[P]> };
