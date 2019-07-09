import { maybeRemoveLast } from './maybeRemoveLast';

test('maybeRemoveLast', () => {
  const arr = [1, 2, 3, 1, 2, 3];
  expect(maybeRemoveLast(arr, 1)).toBe(3);
  expect(arr).toEqual([1, 2, 3, 2, 3]);

  expect(maybeRemoveLast(arr, 1)).toBe(0);
  expect(arr).toEqual([2, 3, 2, 3]);

  expect(maybeRemoveLast(arr, 1)).toBe(-1);
  expect(arr).toEqual([2, 3, 2, 3]);

  expect(maybeRemoveLast(arr, 0)).toBe(-1);
  expect(arr).toEqual([2, 3, 2, 3]);

  expect(maybeRemoveLast(arr, 2)).toBe(2);
  expect(arr).toEqual([2, 3, 3]);
});
