import { withoutFalsy } from './withoutFalsy';

test('withoutFalsy', () => {
  expect(withoutFalsy([])).toEqual([]);
  expect(withoutFalsy([undefined, null, 0, false, '', NaN, 1, 'a'])).toEqual([
    1,
    'a',
  ]);
});
