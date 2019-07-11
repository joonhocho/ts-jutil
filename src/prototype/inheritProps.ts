import { hasOwnProp } from '_src/object/hasOwnProp';
import { OverwriteProps } from 'tsdef';
import { inheritProp } from './inheritProp';

export const inheritProps = <T, F, E extends { [key: string]: 1 }>(
  to: T,
  from: F,
  excludeKeys?: E
): OverwriteProps<T, Pick<F, Exclude<keyof F, keyof T | keyof E>>> => {
  const fromKeys = Object.getOwnPropertyNames(from);
  const len = fromKeys.length;

  if (excludeKeys) {
    for (let i = 0; i < len; i += 1) {
      const key: keyof F = fromKeys[i] as any;
      if ((excludeKeys as any)[key] !== 1 && !hasOwnProp(to, key)) {
        inheritProp(to, from, key);
      }
    }
  } else {
    for (let i = 0; i < len; i += 1) {
      const key: keyof F = fromKeys[i] as any;
      if (!hasOwnProp(to, key)) {
        inheritProp(to, from, key);
      }
    }
  }

  return to as any;
};
