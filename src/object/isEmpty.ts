import { AnyObject } from 'src/ts';
import { getKeys } from './getKeys';

export const isEmpty = (obj: AnyObject): boolean => !getKeys(obj).length;
