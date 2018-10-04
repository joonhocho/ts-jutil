import { intRange, parseFloatInRange, parseIntInRange } from './number';

describe('number', () => {
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
});

describe('intRange', () => {
  test('should create a range of numbers', () => {
    expect(intRange(-2, 3)).toEqual([-2, -1, 0, 1, 2, 3]);
  });
});
