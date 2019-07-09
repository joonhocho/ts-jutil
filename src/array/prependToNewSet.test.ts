import { prependToNewSet } from './prependToNewSet';

describe('prependToNewSet', () => {
  test('prepend to new set', () => {
    const arr = [1, 2, 3];

    expect(prependToNewSet(arr, 4)).toEqual([4, 1, 2, 3]);
    expect(arr).toEqual([1, 2, 3]);
    expect(prependToNewSet(arr, 4)).toEqual([4, 1, 2, 3]);
    expect(prependToNewSet(arr, 2)).toEqual([1, 2, 3]);
    expect(prependToNewSet(arr, 0)).toEqual([0, 1, 2, 3]);
  });
});
