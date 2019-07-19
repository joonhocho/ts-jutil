import { endsWith } from './endsWith';

test('endsWith', () => {
  expect(endsWith('', '')).toBe(true);
  expect(endsWith('', 'a')).toBe(false);
  expect(endsWith('a', 'a')).toBe(true);
  expect(endsWith('aa', 'a')).toBe(true);
  expect(endsWith('aa', 'aa')).toBe(true);
  expect(endsWith('aab', 'aab')).toBe(true);
  expect(endsWith('aabc', 'aab')).toBe(false);
  expect(endsWith('aabc', 'abc')).toBe(true);
  expect(endsWith('abcd', 'bc')).toBe(false);
  expect(endsWith('abcd', 'cd')).toBe(true);
  expect(endsWith('abcd', 'ab')).toBe(false);
  expect(endsWith('abcd', 'aB')).toBe(false);
  expect(endsWith('abcd', 'Ab')).toBe(false);
  expect(endsWith('abcd', 'cD')).toBe(false);
});
