import { deepSortedCopy } from './deepSortedCopy';

describe('deepSortedCopy', () => {
  test('should sort object props by keys', () => {
    const src = {
      b: '2',
      a: '1',
      c: '3',
    };
    const sorted = deepSortedCopy(src);

    expect(Object.keys(src)).toEqual(['b', 'a', 'c']);
    expect(Object.keys(sorted)).toEqual(['a', 'b', 'c']);
    expect(src).toEqual(sorted);
    expect(src).not.toBe(sorted);
  });

  test('should sort objects deeply by keys', () => {
    const src = {
      b: [{ c: 3, a: 1, b: 2 }, { c2: 3, a2: 1, b2: 2 }],
      a: '1',
      c: { c3: 3, a3: 1, b3: 2 },
    };
    const sorted = deepSortedCopy(src);

    expect(Object.keys(src)).toEqual(['b', 'a', 'c']);
    expect(Object.keys(sorted)).toEqual(['a', 'b', 'c']);
    expect(src).toEqual(sorted);
    expect(src).not.toBe(sorted);

    expect(src.b).not.toBe(sorted.b);
    expect(src.b[0]).not.toBe(sorted.b[0]);
    expect(src.b[1]).not.toBe(sorted.b[1]);
    expect(src.c).not.toBe(sorted.c);
    expect(Object.keys(sorted.b[0])).toEqual(['a', 'b', 'c']);
    expect(Object.keys(sorted.b[1])).toEqual(['a2', 'b2', 'c2']);
    expect(Object.keys(sorted.c)).toEqual(['a3', 'b3', 'c3']);
  });
});
