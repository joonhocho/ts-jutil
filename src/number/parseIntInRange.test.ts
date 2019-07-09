import { parseIntInRange } from './parseIntInRange';

test('parseIntInRange', () => {
  expect(parseIntInRange('')).toBe(null);
  expect(parseIntInRange(undefined as any)).toBe(null);
  expect(parseIntInRange(null as any)).toBe(null);
  expect(parseIntInRange('0')).toBe(0);
  expect(parseIntInRange('1')).toBe(1);
  expect(parseIntInRange('-1')).toBe(-1);
  expect(parseIntInRange('100')).toBe(100);
  expect(parseIntInRange('100', null, 100)).toBe(100);
  expect(parseIntInRange('100', null, 99)).toBe(null);
  expect(parseIntInRange('100', 100)).toBe(100);
  expect(parseIntInRange('100', 101)).toBe(null);
  expect(parseIntInRange('100.3')).toBe(100);
  expect(parseIntInRange('-100.3')).toBe(-100);
});
