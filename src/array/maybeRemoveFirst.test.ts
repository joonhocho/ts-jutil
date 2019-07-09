import { maybeRemoveFirst } from './maybeRemoveFirst';

test('maybeRemoveFirst', () => {
  const arr = [1, 2, 3, 1, 2, 3];
  expect(maybeRemoveFirst(arr, 1)).toBe(0);
  expect(arr).toEqual([2, 3, 1, 2, 3]);

  expect(maybeRemoveFirst(arr, 1)).toBe(2);
  expect(arr).toEqual([2, 3, 2, 3]);

  expect(maybeRemoveFirst(arr, 1)).toBe(-1);
  expect(arr).toEqual([2, 3, 2, 3]);

  expect(maybeRemoveFirst(arr, 0)).toBe(-1);
  expect(arr).toEqual([2, 3, 2, 3]);

  expect(maybeRemoveFirst(arr, 2)).toBe(0);
  expect(arr).toEqual([3, 2, 3]);
});
