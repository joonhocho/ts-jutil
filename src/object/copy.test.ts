import { copy } from './copy';

test('copy', () => {
  expect(copy({}, { a: 1 }, ['a'])).toEqual({ a: 1 });
  expect(copy({}, { a: 1 }, ['a', 'b'])).toEqual({ a: 1 });
  expect(copy({}, { a: 1, b: 2 }, ['a', 'b'])).toEqual({ a: 1, b: 2 });
  expect(copy({}, { a: 1, b: undefined }, ['a', 'b'])).toEqual({
    a: 1,
    b: undefined,
  });
  expect(copy({}, { a: 1, b: null }, ['a', 'b'])).toEqual({ a: 1, b: null });

  const dest = {};
  expect(copy(dest, { a: 1, b: 2, z: 3 }, ['a', 'b', 'c'])).toBe(dest);
  expect(dest).toEqual({ a: 1, b: 2 });

  expect(copy({}, { a: 1, b: 2 })).toEqual({ a: 1, b: 2 });
  expect(copy({}, {}, ['hasOwnProperty'])).toEqual({});
  expect(copy({}, {}, ['hasOwnProperty'], false)).toEqual({
    hasOwnProperty: {}.hasOwnProperty,
  });
});
