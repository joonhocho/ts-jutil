import { pushToSet } from './pushToSet';

describe('pushToSet', () => {
  test('push to set', () => {
    const arr = [1, 2, 3];

    expect(pushToSet(arr, 4)).toBe(true);
    expect(arr).toEqual([1, 2, 3, 4]);

    expect(pushToSet(arr, 4)).toBe(false);
    expect(arr).toEqual([1, 2, 3, 4]);

    expect(pushToSet(arr, 2)).toBe(false);
    expect(arr).toEqual([1, 2, 3, 4]);

    expect(pushToSet(arr, 0)).toBe(true);
    expect(arr).toEqual([1, 2, 3, 4, 0]);
  });
});
