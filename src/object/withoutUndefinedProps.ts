import { isDefined } from '_src/is';
import { WithoutUndefined } from '_src/ts';
import { AnyObject } from 'tsdef';
import { filterProps } from './filterProps';

export const withoutUndefinedProps = <T extends AnyObject>(
  obj: T
): WithoutUndefined<T> => filterProps(obj, isDefined) as any;
