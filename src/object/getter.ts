import { AnyObject } from 'src/ts';

export const getter = <TData = any>(
  path: string
): ((obj: AnyObject | null) => TData | undefined) => {
  const keys = path.split('.');
  const lastIndex = keys.length - 1;

  return (obj: AnyObject | null): TData | undefined => {
    if (!obj) {
      return undefined;
    }

    let scope = obj;
    let i = 0;
    for (; i < lastIndex; i += 1) {
      scope = scope[keys[i]];
      if (!scope) {
        return undefined;
      }
    }
    return scope[keys[i]];
  };
};
