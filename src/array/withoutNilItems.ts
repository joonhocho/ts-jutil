import { isNotNil } from '_src/is';

export const withoutNilItems = <T>(
  arr: T[]
): Array<Exclude<T, undefined | null>> => arr.filter(isNotNil) as any;
