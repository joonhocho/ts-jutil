import { withoutItem } from './withoutItem';

test('withoutItem', () => {
  expect(withoutItem([], undefined)).toEqual([]);
  expect(withoutItem([1], undefined)).toEqual([1]);
  expect(withoutItem([1], 1)).toEqual([]);
  expect(withoutItem([2, 1], 1)).toEqual([2]);
  expect(withoutItem([2, 1, 2, 1, '1', 3], 1)).toEqual([2, 2, '1', 3]);
});
