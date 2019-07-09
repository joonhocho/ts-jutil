import { isObject } from 'src/is';
import { deepMapObjectWithoutEmpty } from './deepMapObjectWithoutEmpty';
import { MapFN } from './ts';

export const deepMapArrayWithoutEmpty = <I, T extends I[], FN extends MapFN>(
  arr: T,
  fn: FN
): any[] | null => {
  const copy = [];
  const len = arr.length;
  for (let i = 0; i < len; i += 1) {
    const value = arr[i];

    let newValue;
    if (isObject(value)) {
      if (Array.isArray(value)) {
        newValue = deepMapArrayWithoutEmpty(value, fn);
      } else {
        newValue = deepMapObjectWithoutEmpty(value, fn);
      }
    } else {
      newValue = fn(value, i, arr);
    }

    if (newValue != null && newValue === newValue) {
      copy.push(newValue);
    }
  }
  return copy.length ? copy : null;
};
