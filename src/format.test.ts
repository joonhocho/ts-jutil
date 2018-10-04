import { formatCurrency, formatName, toDigits, toTitleCase } from './format';

describe('formatCurrency', () => {
  test('should format a number to currency', () => {
    expect(formatCurrency(1231242.1232)).toBe('$1,231,242');
    expect(formatCurrency(1231242.1232, 2)).toBe('$1,231,242.12');
    expect(formatCurrency(1231242.1252, 2)).toBe('$1,231,242.13');
    expect(formatCurrency(1231242.1252, 2, 4, '')).toBe('123,1242.13');
    expect(formatCurrency(123.1252, 2, 4, '')).toBe('123.13');
  });
});

describe('formatName', () => {
  test('capitalizes first letter', () => {
    expect(formatName(null as any)).toBe('');
    expect(formatName('')).toBe('');
    expect(formatName(' ')).toBe('');
    expect(formatName('a')).toBe('A');
    expect(formatName(' a')).toBe('A');
    expect(formatName('ab')).toBe('Ab');
    expect(formatName('ab c')).toBe('Ab C');
    expect(formatName('   ab c  \n\t DD ')).toBe('Ab C Dd');
  });
});

describe('toDigits', () => {
  test('capitalizes first letter', () => {
    expect(toDigits(null as any)).toBe('');
    expect(toDigits('')).toBe('');
    expect(toDigits(' ')).toBe('');
    expect(toDigits('1')).toBe('1');
    expect(toDigits('+1 (123) 456-7890 ext. 1234')).toBe('112345678901234');
  });
});

describe('toTitleCase', () => {
  test('converts a string to title case', () => {
    expect(toTitleCase('hello')).toBe('Hello');
    expect(toTitleCase('HELLO_WORLD')).toBe('Hello World');
  });
});
