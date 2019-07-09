import { findIndex } from './findIndex';

test('findIndex', () => {
  expect(findIndex([], () => true)).toBe(-1);
  expect(findIndex([1], () => true)).toBe(0);
  expect(findIndex([1, 2], () => true)).toBe(0);
  expect(findIndex([1, 2], (x) => x > 1)).toBe(1);
  expect(findIndex([1, 2, 3], (x) => x > 1)).toBe(1);
  expect(findIndex([1, 2, 3], () => false)).toBe(-1);
});
