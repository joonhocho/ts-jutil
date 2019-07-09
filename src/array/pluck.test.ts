import { pluck } from './pluck';

describe('pluck', () => {
  test('returns a new array of the plucked values from the array', () => {
    const arr = [{ a: 1, b: 2 }, { b: 3, c: 4 }, { a: 5, c: 6 }];
    expect(pluck(arr, 'a')).toEqual([1, undefined, 5]);
    expect(pluck(arr, 'b')).toEqual([2, 3, undefined]);
    expect(pluck(arr, 'c')).toEqual([undefined, 4, 6]);
  });
});
