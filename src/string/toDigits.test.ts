import { toDigits } from './toDigits';

describe('toDigits', () => {
  test('capitalizes first letter', () => {
    expect(toDigits(null as any)).toBe('');
    expect(toDigits('')).toBe('');
    expect(toDigits(' ')).toBe('');
    expect(toDigits('1')).toBe('1');
    expect(toDigits('+1 (123) 456-7890 ext. 1234')).toBe('112345678901234');
  });
});
