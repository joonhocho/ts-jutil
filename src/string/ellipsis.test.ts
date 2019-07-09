import { ellipsis } from './ellipsis';

describe('ellipsis', () => {
  test('returns a truncated string to the max length', () => {
    expect(ellipsis('1234567890', 4)).toBe('1...');
    expect(ellipsis('1234567890', 4, '.')).toBe('123.');
    expect(ellipsis('1234567890', 4)).toBe('1...');
    expect(ellipsis('1234567890', 4, '...')).toBe('1...');
    expect(ellipsis('1234567890', 12, '...')).toBe('1234567890');
    expect(ellipsis('1234567890', 10, '...')).toBe('1234567890');
    expect(ellipsis('1234567890', 9, '...')).toBe('123456...');
  });
});
