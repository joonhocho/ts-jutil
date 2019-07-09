import { PropKey } from 'src/ts';
import { OverwriteProps } from 'tsdef';

export const inheritProp = <T, F, K extends keyof F, TK extends PropKey>(
  to: T,
  from: F,
  fromKey: K,
  toKey?: TK
): OverwriteProps<
  T,
  TK extends string ? { [P in TK]: F[K] } : { [P in keyof F]: F[P] }
> => {
  const desc = Object.getOwnPropertyDescriptor(from, fromKey);
  if (desc) {
    return Object.defineProperty(to, toKey || fromKey, desc);
  }
  return to as any;
};
