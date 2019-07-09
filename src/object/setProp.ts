import { AnyKey, ExcludeKeys } from 'tsdef';

export const setProp = <T, K extends AnyKey, V>(
  obj: T,
  key: K,
  value: V
): ExcludeKeys<T, K> & { [P in K]: V } => {
  (obj as any)[key] = value;
  return obj as any;
};
