import { capitalizeFirst } from './capitalizeFirst';

describe('capitalizeFirst', () => {
  test('capitalizes first letter', () => {
    expect(capitalizeFirst(null as any)).toBe('');
    expect(capitalizeFirst('')).toBe('');
    expect(capitalizeFirst(' ')).toBe(' ');
    expect(capitalizeFirst('a')).toBe('A');
    expect(capitalizeFirst(' a')).toBe(' a');
    expect(capitalizeFirst('ab')).toBe('Ab');
    expect(capitalizeFirst('ab c')).toBe('Ab c');
    expect(capitalizeFirst('AB C')).toBe('AB C');
  });
});
