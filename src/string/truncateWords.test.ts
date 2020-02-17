import { truncateWords } from './truncateWords';

describe('truncateWords', () => {
  test('returns a truncated string to the max length', () => {
    const nWords = (n: number, word: string): string => {
      const words: string[] = [];
      for (let i = 0; i < n; i += 1) {
        words.push(word);
      }
      return words.join(' ');
    };
    const text = nWords(10, '123456789');

    expect(truncateWords(text, 90, 99)).toBe(text);
    expect(truncateWords(text, 90, 98)).toBe(text);
    expect(truncateWords(text, 80, 98)).toBe(`${text.substring(0, 89)}...`);
    expect(truncateWords(text, 79, 98)).toBe(`${text.substring(0, 79)}...`);
    expect(truncateWords(text, 50, 60)).toBe(`${text.substring(0, 59)}...`);
  });
});
