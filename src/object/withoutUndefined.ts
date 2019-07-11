import { isDefined } from '_src/is';
import { WithoutUndefined } from '_src/ts';
import { AnyObject } from 'tsdef';
import { filter } from './filter';

export const withoutUndefined = <T extends AnyObject>(
  obj: T
): WithoutUndefined<T> => filter(obj, isDefined) as any;
