import { AnyObject } from 'src/ts';
import { getter } from './getter';

// tslint:disable-next-line typedef
export const immutableSetter = (
  path: string,
  cloneObject?: (
    obj: any,
    key: string,
    path: string[],
    parent: AnyObject
  ) => any
) => {
  const keys = path.split('.');
  const lastIndex = keys.length - 1;

  const getValue = getter(path);

  if (cloneObject) {
    return <T extends AnyObject, U extends T>(obj: T, value: any): U => {
      if (getValue(obj) === value) {
        return obj as U;
      }

      const newObj = { ...(obj as AnyObject) };
      let scope = newObj;
      let i = 0;
      const curPath = [];
      for (; i < lastIndex; i += 1) {
        const key = keys[i];
        curPath.push(key);
        scope = scope[key] = cloneObject(scope[key], key, curPath, scope);
      }
      scope[keys[i]] = value;
      return newObj as U;
    };
  }

  return <T extends AnyObject, U extends T>(obj: T, value: any): U => {
    if (getValue(obj) === value) {
      return obj as U;
    }

    const newObj = { ...(obj as AnyObject) };
    let scope = newObj;
    let i = 0;
    for (; i < lastIndex; i += 1) {
      const key = keys[i];
      scope = scope[key] = { ...scope[key] };
    }
    scope[keys[i]] = value;
    return newObj as U;
  };
};
