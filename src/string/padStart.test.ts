import { padStart } from './padStart';

test('padStart', () => {
  expect(padStart('abc', 0, '123')).toBe('abc');
  expect(padStart('abc', 1, '123')).toBe('abc');
  expect(padStart('abc', 2, '123')).toBe('abc');
  expect(padStart('abc', 3, '123')).toBe('abc');
  expect(padStart('abc', 4, '123')).toBe('1abc');
  expect(padStart('abc', 5, '123')).toBe('12abc');
  expect(padStart('abc', 6, '123')).toBe('123abc');
  expect(padStart('abc', 7, '123')).toBe('1231abc');
});
