import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  test('should format a number to currency', () => {
    expect(formatCurrency(1231242.1232)).toBe('$1,231,242');
    expect(formatCurrency(1231242.1232, 2)).toBe('$1,231,242.12');
    expect(formatCurrency(1231242.1252, 2)).toBe('$1,231,242.13');
    expect(formatCurrency(1231242.1252, 2, 4, '')).toBe('123,1242.13');
    expect(formatCurrency(123.1252, 2, 4, '')).toBe('123.13');
  });
});
