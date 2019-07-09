import { isNotNil } from 'src/is';
import { AnyObject, WithoutNil } from 'src/ts';
import { filter } from './filter';

export const withoutNil = <T extends AnyObject>(obj: T): WithoutNil<T> =>
  filter(obj, isNotNil) as any;
