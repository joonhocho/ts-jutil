import { truncate } from './truncate';

export const ellipsis = (
  str: string,
  maxLength: number,
  suffix = '...'
): string => truncate(str, maxLength, suffix);
