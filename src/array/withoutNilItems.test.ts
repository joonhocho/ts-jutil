import { withoutNilItems } from './withoutNilItems';

test('withoutNilItems', () => {
  expect(withoutNilItems([])).toEqual([]);
  expect(
    withoutNilItems([undefined, null, 0, false, '', NaN, 1, 'a'])
  ).toEqual([0, false, '', NaN, 1, 'a']);
});
