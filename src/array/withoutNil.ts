import { isNotNil } from 'src/is';

export const withoutNil = <T>(arr: T[]): Array<Exclude<T, undefined | null>> =>
  arr.filter(isNotNil) as any;
