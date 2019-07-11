import { toKeyFn } from '_src/ts';

export const countByIndex = <T>(
  list: T[],
  toKey?: toKeyFn<T> | keyof T | null,
  dest: { [k: string]: number } = {}
): { [k: string]: number } => {
  const len = list.length;
  const out: any = dest;
  if (len > 0) {
    switch (typeof toKey) {
      case 'function':
        // get id by function
        for (let i = 0; i < len; i += 1) {
          const id = (toKey as any)(list[i], i, list);
          out[id] = (out[id] || 0) + 1;
        }
        break;
      case 'string':
        // property is id
        for (let i = 0; i < len; i += 1) {
          const id = list[i][toKey as keyof T];
          out[id] = (out[id] || 0) + 1;
        }
        break;
      default:
        // item is id
        for (let i = 0; i < len; i += 1) {
          const id = list[i];
          out[id] = (out[id] || 0) + 1;
        }
        break;
    }
  }
  return out;
};
