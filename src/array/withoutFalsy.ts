import { bypass } from 'src/func/return';

export const withoutFalsy = <T>(
  arr: T[]
): Array<Exclude<T, null | undefined | false | '' | 0>> =>
  arr.filter(bypass) as any;
