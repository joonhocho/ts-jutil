import { findKey } from './findKey';

test('findKey', () => {
  expect(findKey({}, () => true)).toBe(undefined);
  expect(findKey({ a: 1 }, () => true)).toBe('a');
  expect(findKey({ a: 1 }, () => false)).toBe(undefined);
  expect(findKey({ a: 1 }, (v) => v > 0)).toBe('a');
  expect(findKey({ a: 0 }, (v) => v > 0)).toBe(undefined);
  expect(findKey({ a: 0, b: 1 }, (v) => v > 0)).toBe('b');
  expect(findKey({ a: 0, b: 1 }, (_v, k) => k === ('c' as any))).toBe(
    undefined
  );
  expect(findKey({ a: 0, c: 2, b: 1 }, (_v, k) => k === 'c')).toBe('c');
});
