import { isDefined } from 'src/is';

export const withoutUndefined = <T>(arr: T[]): Array<Exclude<T, undefined>> =>
  arr.filter(isDefined) as any;
