import { capitalizeWords } from './capitalizeWords';

describe('capitalizeWords', () => {
  test('capitalizes words', () => {
    expect(capitalizeWords(null as any)).toBe('');
    expect(capitalizeWords('')).toBe('');
    expect(capitalizeWords(' ')).toBe(' ');
    expect(capitalizeWords('aaa bbb\tccc\nddd  \n\t eee.f. g,h, i')).toBe(
      'Aaa Bbb\tCcc\nDdd  \n\t Eee.f. G,h, I'
    );
    expect(capitalizeWords('AAA bBb CcC')).toBe('AAA BBb CcC');
  });
});
