import { withoutUndefined } from './withoutUndefined';

test('withoutUndefined', () => {
  expect(withoutUndefined([])).toEqual([]);
  expect(
    withoutUndefined([undefined, null, 0, false, '', NaN, 1, 'a'])
  ).toEqual([null, 0, false, '', NaN, 1, 'a']);
});
