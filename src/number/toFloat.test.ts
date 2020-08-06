import { toFloat } from './toFloat';

test('toFloat', () => {
  expect(toFloat(null)).toEqual(null);
  expect(toFloat(undefined)).toEqual(null);
  expect(toFloat('')).toEqual(null);
  expect(toFloat('a')).toEqual(null);
  expect(toFloat('0')).toEqual(0);
  expect(toFloat('1')).toEqual(1);
  expect(toFloat('1.5')).toEqual(1.5);
  expect(toFloat(0)).toEqual(0);
  expect(toFloat(1)).toEqual(1);
});
