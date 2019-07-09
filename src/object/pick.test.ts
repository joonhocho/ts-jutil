import { pick } from './pick';

test('pick', () => {
  expect(pick({}, ['a'] as any)).toEqual({});
  expect(pick({ a: 1 }, ['a'])).toEqual({ a: 1 });
  expect(pick({ a: 1, b: '' }, ['b'])).toEqual({ b: '' });
  expect(pick({ a: 1, b: '' }, ['a', 'b'])).toEqual({ a: 1, b: '' });
  expect(Object.keys(pick({ a: 1, c: true }, ['a', 'b'] as any))).toEqual([
    'a',
  ]);
});
