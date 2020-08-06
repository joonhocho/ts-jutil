import { toInt } from './toInt';

test('toInt', () => {
  expect(toInt(null)).toEqual(null);
  expect(toInt(undefined)).toEqual(null);
  expect(toInt('')).toEqual(null);
  expect(toInt('a')).toEqual(null);
  expect(toInt('0')).toEqual(0);
  expect(toInt('1')).toEqual(1);
  expect(toInt('1.5')).toEqual(1);
  expect(toInt(0)).toEqual(0);
  expect(toInt(1)).toEqual(1);
  expect(toInt(1.5)).toEqual(1.5);
});
