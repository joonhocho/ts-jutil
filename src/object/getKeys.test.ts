import { getKeys } from './getKeys';

test('getKeys', () => {
  expect(getKeys({})).toEqual([]);
  expect(getKeys({ a: 1 })).toEqual(['a']);
  expect(getKeys({ a: 1, b: 2 })).toEqual(['a', 'b']);
});
