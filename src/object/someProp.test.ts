import { someProp } from './someProp';

test('someProp', () => {
  expect(someProp({ a: 0 }, (v) => v > 0)).toBe(false);
  expect(someProp({ a: 1 }, (v) => v > 0)).toBe(true);
  expect(someProp({ a: 1, b: 3 }, (v) => v > 0)).toBe(true);
  expect(someProp({ a: -1, b: -3, c: 0 }, (v) => v > 0)).toBe(false);
  expect(someProp({ a: 1, c: 0, b: 3 }, (_v, k) => k.length > 1)).toBe(false);
  expect(someProp({ a: 1, c: 0, b: 3, dd: 3 }, (_v, k) => k.length > 1)).toBe(
    true
  );
});
