import { some } from './some';

test('some', () => {
  expect(some({ a: 0 }, (v) => v > 0)).toBe(false);
  expect(some({ a: 1 }, (v) => v > 0)).toBe(true);
  expect(some({ a: 1, b: 3 }, (v) => v > 0)).toBe(true);
  expect(some({ a: -1, b: -3, c: 0 }, (v) => v > 0)).toBe(false);
  expect(some({ a: 1, c: 0, b: 3 }, (_v, k) => k.length > 1)).toBe(false);
  expect(some({ a: 1, c: 0, b: 3, dd: 3 }, (_v, k) => k.length > 1)).toBe(true);
});
