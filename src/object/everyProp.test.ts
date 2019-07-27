import { everyProp } from './everyProp';

test('everyProp', () => {
  expect(everyProp({ a: 1 }, (v) => v > 0)).toBe(true);
  expect(everyProp({ a: 1, b: 3 }, (v) => v > 0)).toBe(true);
  expect(everyProp({ a: 1, b: 3, c: 0 }, (v) => v > 0)).toBe(false);
  expect(everyProp({ a: 1, c: 0, b: 3 }, (v) => v > 0)).toBe(false);
  expect(everyProp({ a: 1, c: 0, b: 3 }, (_v, k) => /^\w$/.test(k))).toBe(true);
  expect(
    everyProp({ a: 1, c: 0, b: 3, dd: 3 }, (_v, k) => /^\w$/.test(k))
  ).toBe(false);
});
