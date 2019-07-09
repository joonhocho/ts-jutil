import { maybeAdd } from './maybeAdd';

test('maybeAdd', () => {
  const arr = [1, 2, 3];
  expect(maybeAdd(arr, 1)).toBe(-1);
  expect(arr).toEqual([1, 2, 3]);
  expect(maybeAdd(arr, 0)).toBe(3);
  expect(arr).toEqual([1, 2, 3, 0]);
  expect(maybeAdd(arr, 0)).toBe(-1);
  expect(arr).toEqual([1, 2, 3, 0]);
});
