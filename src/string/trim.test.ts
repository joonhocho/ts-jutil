import { trim } from './trim';

test('trim', () => {
  expect(trim('')).toBe('');
  expect(trim('a a')).toBe('a a');
  expect(trim(' a a')).toBe('a a');
  expect(trim(' a a ')).toBe('a a');
  expect(trim('  a a  ')).toBe('a a');
});
