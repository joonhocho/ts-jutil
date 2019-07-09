import { parseFloatInRange } from './parseFloatInRange';

test('parseFloatInRange', () => {
  expect(parseFloatInRange('')).toBe(null);
  expect(parseFloatInRange(undefined as any)).toBe(null);
  expect(parseFloatInRange(null as any)).toBe(null);
  expect(parseFloatInRange('0')).toBe(0);
  expect(parseFloatInRange('1')).toBe(1);
  expect(parseFloatInRange('-1')).toBe(-1);
  expect(parseFloatInRange('100')).toBe(100);
  expect(parseFloatInRange('100', null, 100)).toBe(100);
  expect(parseFloatInRange('100', null, 99)).toBe(null);
  expect(parseFloatInRange('100', 100)).toBe(100);
  expect(parseFloatInRange('100', 101)).toBe(null);
  expect(parseFloatInRange('100.3')).toBe(100.3);
  expect(parseFloatInRange('-100.3')).toBe(-100.3);
});
