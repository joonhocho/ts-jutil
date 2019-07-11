import { toKeyFn } from '_src/ts';
import { unique } from './unique';

export const union = <T>(a: T[], b: T[], toKey?: toKeyFn<T> | keyof T): T[] =>
  unique([...a, ...b], toKey);
