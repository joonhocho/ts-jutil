import { isDefined } from '_src/is';

export const withoutUndefinedItems = <T>(
  arr: T[]
): Array<Exclude<T, undefined>> => arr.filter(isDefined) as any;
