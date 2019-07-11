import { AnyObject } from '_src/ts';

// tslint:disable-next-line typedef
export const setter = (
  path: string,
  createObject?: (key: string, path: string[], parent: AnyObject) => any
) => {
  const keys = path.split('.');
  const lastIndex = keys.length - 1;

  if (createObject) {
    return <T extends AnyObject, U extends T>(obj: T, value: any): U => {
      let scope: AnyObject = obj;
      let i = 0;
      const curPath = [];
      for (; i < lastIndex; i += 1) {
        const key = keys[i];
        curPath.push(key);
        scope = scope[key] || (scope[key] = createObject(key, curPath, scope));
      }
      scope[keys[i]] = value;
      return obj as U;
    };
  }

  return <T extends AnyObject, U extends T>(obj: T, value: any): U => {
    let scope: AnyObject = obj;
    let i = 0;
    for (; i < lastIndex; i += 1) {
      const key = keys[i];
      scope = scope[key] || (scope[key] = {});
    }
    scope[keys[i]] = value;
    return obj as U;
  };
};
