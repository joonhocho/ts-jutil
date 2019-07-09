import { findLastIndex } from './findLastIndex';

test('findLastIndex', () => {
  expect(findLastIndex([], () => true)).toBe(-1);
  expect(findLastIndex([1], () => true)).toBe(0);
  expect(findLastIndex([1, 2], () => true)).toBe(1);
  expect(findLastIndex([1, 2], (x) => x > 1)).toBe(1);
  expect(findLastIndex([1, 2, 3], (x) => x > 1)).toBe(2);
  expect(findLastIndex([1, 2, 3], () => false)).toBe(-1);
});
