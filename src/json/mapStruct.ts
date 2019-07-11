import { getKeys } from '_src/object/getKeys';
import { AnyObject, Exact, ReturnTypeOrNever } from '_src/ts';

export const mapStruct = <
  T extends AnyObject,
  M extends Exact<{ [P in keyof T]-?: (value: T[P], key: P, obj: T) => any }, M>
>(
  obj: T,
  fnMap: M
):
  | { [P in keyof T]?: Exclude<ReturnTypeOrNever<M[P]>, undefined> }
  | undefined => {
  const copy = {} as {
    [P in keyof T]?: Exclude<ReturnTypeOrNever<M[P]>, undefined>;
  };
  const keys = getKeys(obj);
  const len = keys.length;
  let nonEmpty = false;

  for (let i = 0; i < len; i += 1) {
    const key = keys[i];
    const fn = fnMap[key];
    if (fn) {
      const value = (fn as any)(obj[key], key, obj);
      if (value !== undefined && value === value) {
        nonEmpty = true;
        copy[key] = value;
      }
    }
  }

  return nonEmpty ? copy : undefined;
};
