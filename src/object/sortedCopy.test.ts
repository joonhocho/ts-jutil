import { sortedCopy } from './sortedCopy';

describe('sortedCopy', () => {
  test('should sort object props by keys', () => {
    const src = {
      b: '2',
      a: '1',
      c: '3',
    };
    const sorted = sortedCopy(src);

    expect(Object.keys(src)).toEqual(['b', 'a', 'c']);
    expect(Object.keys(sorted)).toEqual(['a', 'b', 'c']);
    expect(src).toEqual(sorted);
    expect(src).not.toBe(sorted);
  });
});
