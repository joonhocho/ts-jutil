import { findProp } from './findProp';

test('findProp', () => {
  expect(findProp({}, () => true)).toBe(undefined);
  expect(findProp({ a: 1 }, () => true)).toBe(1);
  expect(findProp({ a: 1 }, () => false)).toBe(undefined);
  expect(findProp({ a: 1 }, (v) => v > 0)).toBe(1);
  expect(findProp({ a: 0 }, (v) => v > 0)).toBe(undefined);
  expect(findProp({ a: 0, b: 1 }, (v) => v > 0)).toBe(1);
  expect(findProp({ a: 0, b: 1 }, (_v, k) => k === ('c' as any))).toBe(
    undefined
  );
  expect(findProp({ a: 0, c: 2, b: 1 }, (_v, k) => k === 'c')).toBe(2);
});
