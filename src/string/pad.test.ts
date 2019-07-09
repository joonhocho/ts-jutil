import { pad } from './pad';

test('pad', () => {
  expect(pad('123', 0)).toBe('');
  expect(pad('123', 1)).toBe('1');
  expect(pad('123', 2)).toBe('12');
  expect(pad('123', 3)).toBe('123');
  expect(pad('123', 4)).toBe('1231');
  expect(pad('123', 5)).toBe('12312');
  expect(pad('123', 6)).toBe('123123');
});
