import { escapeRegExpChars } from './escapeRegExpChars';

test('escapeRegExpChars', () => {
  expect(escapeRegExpChars('-')).toBe('\\-');
});
