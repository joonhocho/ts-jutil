import { uniqueWithIndexes } from './uniqueWithIndexes';

describe('uniqueWithIndexes', () => {
  test('without toKey', () => {
    expect(uniqueWithIndexes([])).toEqual({ list: [], indexes: [] });

    const arr = ['a', 'b', 'c', 'a', 'c'];
    const result = uniqueWithIndexes(arr);
    expect(result).toEqual({
      list: ['a', 'b', 'c'],
      indexes: [0, 1, 2, 0, 2],
    });
    expect(arr).toEqual(['a', 'b', 'c', 'a', 'c']);
  });

  test('with toKey = function', () => {
    const toItem = (key: string): any => ({ key });
    const toKey = ({ key }: any): string => key;
    expect(uniqueWithIndexes([], toKey)).toEqual({ list: [], indexes: [] });

    const arr = ['a', 'b', 'c', 'a', 'c'].map(toItem);
    const result = uniqueWithIndexes(arr, toKey);
    expect(result).toEqual({
      list: ['a', 'b', 'c'].map(toItem),
      indexes: [0, 1, 2, 0, 2],
    });
    expect(arr).toEqual(['a', 'b', 'c', 'a', 'c'].map(toItem));
  });

  test('with toKey = string', () => {
    const toItem = (key: string): any => ({ key });
    expect(uniqueWithIndexes([], 'key' as any)).toEqual({
      list: [],
      indexes: [],
    });

    const arr = ['a', 'b', 'c', 'a', 'c', 'd'].map(toItem);
    const result = uniqueWithIndexes(arr, 'key');
    expect(result).toEqual({
      list: ['a', 'b', 'c', 'd'].map(toItem),
      indexes: [0, 1, 2, 0, 2, 3],
    });
    expect(arr).toEqual(['a', 'b', 'c', 'a', 'c', 'd'].map(toItem));
  });
});
