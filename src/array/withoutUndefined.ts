import { isDefined } from '_src/is';

export const withoutUndefined = <T>(arr: T[]): Array<Exclude<T, undefined>> =>
  arr.filter(isDefined) as any;
