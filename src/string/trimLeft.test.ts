import { trimLeft } from './trimLeft';

test('trimLeft', () => {
  expect(trimLeft('')).toBe('');
  expect(trimLeft('a a')).toBe('a a');
  expect(trimLeft(' a a')).toBe('a a');
  expect(trimLeft(' a a ')).toBe('a a ');
  expect(trimLeft('  a a  ')).toBe('a a  ');
});
