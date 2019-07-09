import { mapKeys } from './mapKeys';

test('mapKeys', () => {
  expect(mapKeys({}, { a: 'aa' })).toEqual({});
  expect(mapKeys({ a: 1 }, { a: 'aa' })).toEqual({ aa: 1 });
  expect(mapKeys({ a: 1, b: 2 }, { a: 'aa' })).toEqual({ aa: 1 });
  expect(mapKeys({ a: 1, b: 2, c: 3 }, { a: 'aa', c: 'a' })).toEqual({
    a: 3,
    aa: 1,
  });

  const dest = { e: 4 };
  expect(mapKeys({ a: 1, b: 2, c: 3 }, { a: 'aa', c: 'a' }, dest)).toBe(dest);
  expect(dest).toEqual({ aa: 1, a: 3, e: 4 });
  expect(mapKeys({ a: 1 }, { hasOwnProperty: 'aa' } as any)).toEqual({});
  expect(mapKeys({ a: 1 }, { hasOwnProperty: 'aa' } as any, {}, false)).toEqual(
    {
      aa: {}.hasOwnProperty,
    }
  );
});
