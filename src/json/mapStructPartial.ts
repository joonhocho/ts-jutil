import { getKeys } from '_src/object/getKeys';
import { AnyObject } from '_src/ts';

export const mapStructPartial = <
  T extends AnyObject,
  M extends {
    [P in keyof M]: (
      value: P extends keyof T ? T[P] : any,
      key: P,
      obj: T
    ) => any;
  }
>(
  obj: T,
  fnMap: M
): { [P in keyof M]?: Exclude<ReturnType<M[P]>, undefined> } | undefined => {
  const copy = {} as { [P in keyof M]?: Exclude<ReturnType<M[P]>, undefined> };
  const keys = getKeys(fnMap);
  const len = keys.length;
  let nonEmpty = false;

  for (let i = 0; i < len; i += 1) {
    const key = keys[i];
    const value = fnMap[key]((obj as any)[key], key, obj);
    if (value !== undefined && value === value) {
      nonEmpty = true;
      copy[key] = value;
    }
  }

  return nonEmpty ? copy : undefined;
};
