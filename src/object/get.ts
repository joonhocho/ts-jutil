import { AnyObject } from 'src/ts';

export const get = <TData = any>(
  obj: AnyObject | null,
  path: string
): TData | undefined => {
  if (!obj) {
    return undefined;
  }

  const keys = path.split('.');
  const lastIndex = keys.length - 1;

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
