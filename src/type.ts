export type PropKey = string | number | symbol;
export interface IAnyObject {
  [key: string]: any;
}
export type AnyObject = IAnyObject;
export type AnyFunc = (...args: any[]) => any;
export type ManyArgsFunc = AnyFunc;

export type ReturnTypeOrNever<T> = T extends AnyFunc ? ReturnType<T> : never;

export type Diff<T, U> = T extends U ? never : T;

export type UnionObjects<T extends AnyObject, U extends AnyObject> = {
  [P in Diff<keyof T, keyof U>]: T[P]
} &
  { [P in keyof T & keyof U]: T[P] | U[P] } &
  { [P in Diff<keyof U, keyof T>]: U[P] };

export type ExtendObjects<T extends AnyObject, U extends AnyObject> = {
  [P in Diff<keyof T, keyof U>]: T[P]
} &
  { [P in keyof T & keyof U]: U[P] } &
  { [P in Diff<keyof U, keyof T>]: U[P] };

export type ValueOf<T> = T[keyof T];

export type Exact<T, X extends T> = T &
  { [K in keyof X]: K extends keyof T ? X[K] : never };

// export type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never;

export type KeyOfType<T, U> = {
  [P in keyof T]-?: T[P] extends U ? P : never
}[keyof T];

export type KeyOfTypeReverse<T, U> = {
  [P in keyof T]-?: U extends T[P] ? P : never
}[keyof T];

export type Nil<T> = T | null | undefined;
export type NonNil<T> = T extends null | undefined ? never : T;
export type NonNull<T> = T extends null ? never : T;
export type Und<T> = T | undefined;
export type NonUnd<T> = T extends undefined ? never : T;

export type WithoutUndefined<T> = Pick<
  T,
  Exclude<keyof T, KeyOfTypeReverse<T, undefined>>
> &
  { [P in KeyOfTypeReverse<T, undefined>]?: NonUnd<T[P]> };

export type WithoutNull<T> = Pick<
  T,
  Exclude<keyof T, KeyOfTypeReverse<T, null>>
> &
  { [P in KeyOfTypeReverse<T, null>]?: NonNull<T[P]> };

export type WithoutNil<T> = Pick<
  T,
  Exclude<keyof T, KeyOfTypeReverse<T, undefined | null>>
> &
  { [P in KeyOfTypeReverse<T, undefined | null>]?: NonNil<T[P]> };
