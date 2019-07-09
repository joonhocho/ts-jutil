import { find } from './find';

test('find', () => {
  expect(find([], () => true)).toBe(undefined);
  expect(find([1], () => true)).toBe(1);
  expect(find([1, 2], () => true)).toBe(1);
  expect(find([1, 2], (x) => x > 1)).toBe(2);
  expect(find([1, 2, 3], (x) => x > 1)).toBe(2);
  expect(find([1, 2, 3], () => false)).toBe(undefined);
});
