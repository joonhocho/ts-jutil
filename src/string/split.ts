import { isTruthy } from '_src/is';

export const split = (list: string | string[], delimiter = ','): string[] => {
  if (!list || !list.length) return [];
  const array = typeof list === 'string' ? list.split(delimiter) : list;
  return array.filter(isTruthy);
};
