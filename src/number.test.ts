import {
  formatShortNumber,
  intRange,
  parseFloatInRange,
  parseIntInRange,
} from './number';

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

test('formatShortNumber', () => {
  expect(formatShortNumber(-999)).toBe('-999');
  expect(formatShortNumber(0)).toBe('0');
  expect(formatShortNumber(999)).toBe('999');
  expect(formatShortNumber(1000)).toBe('1.0K');
  expect(formatShortNumber(10000)).toBe('10K');
  expect(formatShortNumber(99999)).toBe('100K');
  expect(formatShortNumber(999999)).toBe('1.0M');
  expect(formatShortNumber(1000000)).toBe('1.0M');
  expect(formatShortNumber(10000000)).toBe('10M');
  expect(formatShortNumber(100000000)).toBe('100M');
  expect(formatShortNumber(1000000000)).toBe('1.0B');
  expect(formatShortNumber(10000000000)).toBe('10B');
  expect(formatShortNumber(100000000000)).toBe('100B');
  expect(formatShortNumber(1000000000000)).toBe('1000B');
  expect(formatShortNumber(10000000000000)).toBe('10000B');
  expect(formatShortNumber(100000000000000)).toBe('100000B');
});
