import { withoutNil } from './withoutNil';

test('withoutNil', () => {
  expect(withoutNil([])).toEqual([]);
  expect(withoutNil([undefined, null, 0, false, '', NaN, 1, 'a'])).toEqual([
    0,
    false,
    '',
    NaN,
    1,
    'a',
  ]);
});
