import { unique } from './unique';

describe('unique', () => {
  test('without toKey', () => {
    expect(unique([])).toEqual([]);

    const arr = ['a', 'b', 'c', 'a', 'c'];
    const result = unique(arr);
    expect(result).toEqual(['a', 'b', 'c']);
    expect(result).not.toBe(arr);
  });

  test('with toKey = function', () => {
    expect(unique([], (x) => x)).toEqual([]);

    const arr = ['a', 'b', 'c', 'a', 'c'].map((key) => ({ key }));
    const result = unique(arr, ({ key }) => key);
    expect(result).toEqual([{ key: 'a' }, { key: 'b' }, { key: 'c' }]);
    expect(result).not.toBe(arr);
  });

  test('with toKey = string', () => {
    expect(unique([], 'k' as any)).toEqual([]);

    const arr = ['a', 'b', 'c', 'a', 'c'].map((k) => ({ k }));
    const result = unique(arr, 'k');
    expect(result).toEqual([{ k: 'a' }, { k: 'b' }, { k: 'c' }]);
    expect(result).not.toBe(arr);
  });
});
