import { padEnd } from './padEnd';

test('padEnd', () => {
  expect(padEnd('abc', 0, '123')).toBe('abc');
  expect(padEnd('abc', 1, '123')).toBe('abc');
  expect(padEnd('abc', 2, '123')).toBe('abc');
  expect(padEnd('abc', 3, '123')).toBe('abc');
  expect(padEnd('abc', 4, '123')).toBe('abc1');
  expect(padEnd('abc', 5, '123')).toBe('abc12');
  expect(padEnd('abc', 6, '123')).toBe('abc123');
  expect(padEnd('abc', 7, '123')).toBe('abc1231');
});
