import { prependToSet } from './prependToSet';

describe('prependToSet', () => {
  test('prepend to set', () => {
    const arr = [1, 2, 3];

    expect(prependToSet(arr, 4)).toBe(true);
    expect(arr).toEqual([4, 1, 2, 3]);

    expect(prependToSet(arr, 4)).toBe(false);
    expect(arr).toEqual([4, 1, 2, 3]);

    expect(prependToSet(arr, 2)).toBe(false);
    expect(arr).toEqual([4, 1, 2, 3]);

    expect(prependToSet(arr, 0)).toBe(true);
    expect(arr).toEqual([0, 4, 1, 2, 3]);
  });
});
