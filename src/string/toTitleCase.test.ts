import { toTitleCase } from './toTitleCase';

describe('toTitleCase', () => {
  test('converts a string to title case', () => {
    expect(toTitleCase('hello')).toBe('Hello');
    expect(toTitleCase('HELLO_WORLD')).toBe('Hello World');
  });
});
