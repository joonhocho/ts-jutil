import { IResult, toResult } from './toResult';

export const waitAll = <T>(
  list: Array<Promise<T> | T>
): Promise<Array<IResult<T, any>>> => Promise.all(list.map(toResult));
