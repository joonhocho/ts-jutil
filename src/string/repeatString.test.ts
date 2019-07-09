import { repeatString } from './repeatString';

test('repeatString', () => {
  expect(repeatString('123', 0)).toBe('');
  expect(repeatString('123', 1)).toBe('123');
  expect(repeatString('123', 2)).toBe('123123');
});
