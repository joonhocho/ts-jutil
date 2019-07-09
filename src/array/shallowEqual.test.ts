import { shallowEqual } from './shallowEqual';

test('shallowEqual', () => {
  expect(shallowEqual(null, undefined as any)).toBe(false);
  expect(shallowEqual(null, null)).toBe(true);
  expect(shallowEqual([], null)).toBe(false);
  expect(shallowEqual(null, [])).toBe(false);
  expect(shallowEqual([], [])).toBe(true);
  expect(shallowEqual(['a'], [])).toBe(false);
  expect(shallowEqual(['a'], ['b'])).toBe(false);
  expect(shallowEqual(['a'], ['a'])).toBe(true);
  expect(shallowEqual(['a', 1], ['a'])).toBe(false);
  expect(shallowEqual(['a', 1], ['a', 1])).toBe(true);
  expect(shallowEqual(['a', 1], [1, 'a'])).toBe(false);
  expect(shallowEqual(['a', 1], [, 'a', 1])).toBe(false);
});
