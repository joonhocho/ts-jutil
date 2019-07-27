import { isNotNil } from '_src/is';
import { AnyObject, WithoutNil } from '_src/ts';
import { filterProps } from './filterProps';

export const withoutNilProps = <T extends AnyObject>(obj: T): WithoutNil<T> =>
  filterProps(obj, isNotNil) as any;
