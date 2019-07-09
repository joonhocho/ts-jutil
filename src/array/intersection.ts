import { toKeyFn } from 'src/ts';
import { countByIndex } from './countByIndex';

export const intersection = <T>(
  a: T[],
  b: T[],
  toKey?: toKeyFn<T> | keyof T | null,
  uniq = true
): T[] => {
  const alen = a.length;
  const blen = b.length;
  const out: T[] = [];
  if (!alen || !blen) {
    return out;
  }

  const bmap: any = countByIndex(b, toKey);
  const toKeyT = typeof toKey;

  if (uniq) {
    switch (toKeyT) {
      case 'function':
        for (let i = 0; i < alen; i += 1) {
          const ai = a[i];
          const k = (toKey as any)(ai, i, a);
          if (bmap[k] > 0) {
            bmap[k] = -1;
            out.push(ai);
          }
        }
        break;
      case 'string':
        for (let i = 0; i < alen; i += 1) {
          const ai = a[i];
          const k = ai[toKey as keyof T];
          if (bmap[k] > 0) {
            bmap[k] = -1;
            out.push(ai);
          }
        }
        break;
      default:
        for (let i = 0; i < alen; i += 1) {
          const ai = a[i];
          const k = ai;
          if (bmap[k] > 0) {
            bmap[k] = -1;
            out.push(ai);
          }
        }
        break;
    }
  } else {
    switch (toKeyT) {
      case 'function':
        for (let i = 0; i < alen; i += 1) {
          const ai = a[i];
          const k = (toKey as any)(ai, i, a);
          if (bmap[k] > 0) {
            bmap[k] -= 1;
            out.push(ai);
          }
        }
        break;
      case 'string':
        for (let i = 0; i < alen; i += 1) {
          const ai = a[i];
          const k = ai[toKey as keyof T];
          if (bmap[k] > 0) {
            bmap[k] -= 1;
            out.push(ai);
          }
        }
        break;
      default:
        for (let i = 0; i < alen; i += 1) {
          const ai = a[i];
          const k = ai;
          if (bmap[k] > 0) {
            bmap[k] -= 1;
            out.push(ai);
          }
        }
        break;
    }
  }

  return out;
};
