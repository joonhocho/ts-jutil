import { AnyKey, ExcludeKeys } from 'tsdef';

export const deleteProp = <T, K extends AnyKey>(
  obj: T,
  key: K
): ExcludeKeys<T, K> => {
  delete (obj as any)[key];
  return obj as any;
};
