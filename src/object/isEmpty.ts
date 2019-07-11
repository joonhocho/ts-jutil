import { AnyObject } from '_src/ts';
import { getKeys } from './getKeys';

export const isEmpty = (obj: AnyObject): boolean => !getKeys(obj).length;
