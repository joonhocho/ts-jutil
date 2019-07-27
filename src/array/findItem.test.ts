import { findItem } from './findItem';

test('findItem', () => {
  expect(findItem([], () => true)).toBe(undefined);
  expect(findItem([1], () => true)).toBe(1);
  expect(findItem([1, 2], () => true)).toBe(1);
  expect(findItem([1, 2], (x) => x > 1)).toBe(2);
  expect(findItem([1, 2, 3], (x) => x > 1)).toBe(2);
  expect(findItem([1, 2, 3], () => false)).toBe(undefined);
});
