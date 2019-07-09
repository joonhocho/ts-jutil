import { isDefined } from 'src/is';
import { WithoutUndefined } from 'src/ts';
import { AnyObject } from 'tsdef';
import { filter } from './filter';

export const withoutUndefined = <T extends AnyObject>(
  obj: T
): WithoutUndefined<T> => filter(obj, isDefined) as any;
