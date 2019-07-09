import { inheritPrototype } from './inheritPrototype';
import { inheritStatic } from './inheritStatic';

export const inheritClass = <
  TP,
  T extends { prototype: TP },
  FP,
  F extends { prototype: FP },
  E extends { [key: string]: 1 }
>(
  to: T,
  from: F,
  excludeKeys?: E
): T => {
  inheritStatic(to, from, excludeKeys);
  inheritPrototype(to, from, excludeKeys);
  return to;
};
