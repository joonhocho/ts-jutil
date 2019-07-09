import { uniqueItems } from './uniqueItems';

test('uniqueItems', () => {
  expect(uniqueItems([])).toEqual([]);
  expect(uniqueItems([1, 2, 3, 2, 1])).toEqual([1, 2, 3]);
  expect(uniqueItems([1, 2, 3, 2, 1].map(String))).toEqual(
    [1, 2, 3].map(String)
  );
});
