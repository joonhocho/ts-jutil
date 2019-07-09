import { truncate } from './truncate';

describe('truncate', () => {
  test('returns a truncated string to the max length', () => {
    expect(truncate('1234567890', 4)).toBe('1234');
    expect(truncate('1234567890', 4, '.')).toBe('123.');
    expect(truncate('1234567890', 4, '...')).toBe('1...');
    expect(truncate('1234567890', 12, '...')).toBe('1234567890');
    expect(truncate('1234567890', 10, '...')).toBe('1234567890');
    expect(truncate('1234567890', 9, '...')).toBe('123456...');
  });
});
