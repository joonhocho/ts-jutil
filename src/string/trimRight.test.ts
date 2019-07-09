import { trimRight } from './trimRight';

test('trimRight', () => {
  expect(trimRight('')).toBe('');
  expect(trimRight('a a')).toBe('a a');
  expect(trimRight(' a a')).toBe(' a a');
  expect(trimRight(' a a ')).toBe(' a a');
  expect(trimRight('  a a  ')).toBe('  a a');
});
