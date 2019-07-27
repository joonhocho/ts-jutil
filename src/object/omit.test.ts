import { omit } from './omit';

test('omit', () => {
  expect(omit({}, ['a'] as any)).toEqual({});
  expect(omit({ a: 1 }, ['a'])).toEqual({});
  expect(omit({ a: 1, b: '' }, ['b'])).toEqual({ a: 1 });
  expect(omit({ a: 1, b: '' }, ['a', 'b'])).toEqual({});
  expect(Object.keys(omit({ a: 1, c: true }, ['a', 'b'] as any))).toEqual([
    'c',
  ]);
});
