import { shallowEqualValues } from './shallowEqualValues';

test('shallowEqualValues', () => {
  expect(shallowEqualValues(undefined, undefined)).toBe(true);
  expect(shallowEqualValues(null, null)).toBe(true);
  expect(shallowEqualValues(NaN, NaN)).toBe(true);
  expect(shallowEqualValues(0, 0)).toBe(true);
  expect(shallowEqualValues(true, true)).toBe(true);
  expect(shallowEqualValues(false, false)).toBe(true);
  expect(shallowEqualValues('', '')).toBe(true);
  expect(shallowEqualValues('0', '0')).toBe(true);
  expect(shallowEqualValues(0, '0')).toBe(false);
  expect(
    shallowEqualValues(0, '0', { normalize: (x): string => x.toString() })
  ).toBe(true);
  expect(shallowEqualValues(0, '0', { normalize: (x): any => x })).toBe(false);
  expect(
    // tslint:disable-next-line triple-equals
    shallowEqualValues(0, '0', { equalValues: (a, b): boolean => a == b })
  ).toBe(true);
  expect(
    shallowEqualValues(null, undefined, {
      // tslint:disable-next-line triple-equals
      equalValues: (a, b): boolean => a == b,
    })
  ).toBe(true);
  expect(
    shallowEqualValues('undefined', undefined, {
      // tslint:disable-next-line triple-equals
      equalValues: (a, b): boolean => a == b,
    })
  ).toBe(false);
  expect(shallowEqualValues([], '')).toBe(false);
  expect(shallowEqualValues([], [])).toBe(false);
  expect(shallowEqualValues([], [])).toBe(false);
  expect(shallowEqualValues({}, {})).toBe(false);
});
