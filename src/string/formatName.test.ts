import { formatName } from './formatName';

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
