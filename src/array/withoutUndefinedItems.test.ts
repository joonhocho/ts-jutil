import { withoutUndefinedItems } from './withoutUndefinedItems';

test('withoutUndefinedItems', () => {
  expect(withoutUndefinedItems([])).toEqual([]);
  expect(
    withoutUndefinedItems([undefined, null, 0, false, '', NaN, 1, 'a'])
  ).toEqual([null, 0, false, '', NaN, 1, 'a']);
});
