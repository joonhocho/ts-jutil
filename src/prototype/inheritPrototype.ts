import { inheritProps } from './inheritProps';

const prototypeExclude = { constructor: 1 };

export const inheritPrototype = <
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
  inheritProps(to.prototype, from.prototype, {
    ...prototypeExclude,
    ...(excludeKeys as any),
  });
  return to;
};
