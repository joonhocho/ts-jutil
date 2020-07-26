import { toResult } from './toResult';

export const waitAll = <T>(list: Array<Promise<T> | T>) =>
  Promise.all(list.map(toResult));
