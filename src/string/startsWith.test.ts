import { startsWith } from './startsWith';

test('startsWith', () => {
  expect(startsWith('', '')).toBe(true);
  expect(startsWith('', 'a')).toBe(false);
  expect(startsWith('a', 'a')).toBe(true);
  expect(startsWith('aa', 'a')).toBe(true);
  expect(startsWith('aa', 'aa')).toBe(true);
  expect(startsWith('aab', 'aab')).toBe(true);
  expect(startsWith('aabc', 'aab')).toBe(true);
  expect(startsWith('abcd', 'bc')).toBe(false);
  expect(startsWith('abcd', 'cd')).toBe(false);
  expect(startsWith('abcd', 'ab')).toBe(true);
  expect(startsWith('abcd', 'aB')).toBe(false);
  expect(startsWith('abcd', 'Ab')).toBe(false);
});
