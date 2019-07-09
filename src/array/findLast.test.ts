import { findLast } from './findLast';

test('findLast', () => {
  expect(findLast([], () => true)).toBe(undefined);
  expect(findLast([1], () => true)).toBe(1);
  expect(findLast([1, 2], () => true)).toBe(2);
  expect(findLast([1, 2], (x) => x > 1)).toBe(2);
  expect(findLast([1, 2, 3], (x) => x > 1)).toBe(3);
  expect(findLast([1, 2, 3], () => false)).toBe(undefined);
});
