import { find } from './find';

test('find', () => {
  expect(find({}, () => true)).toBe(undefined);
  expect(find({ a: 1 }, () => true)).toBe(1);
  expect(find({ a: 1 }, () => false)).toBe(undefined);
  expect(find({ a: 1 }, (v) => v > 0)).toBe(1);
  expect(find({ a: 0 }, (v) => v > 0)).toBe(undefined);
  expect(find({ a: 0, b: 1 }, (v) => v > 0)).toBe(1);
  expect(find({ a: 0, b: 1 }, (_v, k) => k === ('c' as any))).toBe(undefined);
  expect(find({ a: 0, c: 2, b: 1 }, (_v, k) => k === 'c')).toBe(2);
});
