import { pushToNewSet } from './pushToNewSet';

describe('pushToNewSet', () => {
  test('push to new set', () => {
    const arr = [1, 2, 3];

    expect(pushToNewSet(arr, 4)).toEqual([1, 2, 3, 4]);
    expect(arr).toEqual([1, 2, 3]);
    expect(pushToNewSet(arr, 4)).toEqual([1, 2, 3, 4]);
    expect(pushToNewSet(arr, 2)).toEqual([1, 2, 3]);
    expect(pushToNewSet(arr, 0)).toEqual([1, 2, 3, 0]);
  });
});
