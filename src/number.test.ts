import {
  average,
  formatShortNumber,
  intRange,
  max,
  min,
  parseFloatInRange,
  parseIntInRange,
  roundDownToInterval,
  roundUpToInterval,
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
  expect(formatShortNumber(1499)).toBe('1.5K');
  expect(formatShortNumber(1000, { precision: 1 })).toBe('1K');
  expect(formatShortNumber(12345)).toBe('12K');
  expect(
    formatShortNumber(12345, { divisor: 10000, units: ['', 'm'], precision: 3 })
  ).toBe('1.23m');
  expect(formatShortNumber(123456)).toBe('124K');
  expect(formatShortNumber(123456, { round: 'floor' })).toBe('123K');
  expect(formatShortNumber(123456, { round: 'ceil' })).toBe('124K');
  expect(formatShortNumber(123456, { precision: 1 })).toBe('123K');
  expect(formatShortNumber(123456, { precision: 2 })).toBe('124K');
  expect(formatShortNumber(123456, { precision: 3 })).toBe('123K');
  expect(formatShortNumber(123456, { precision: 4 })).toBe('123.5K');
  expect(formatShortNumber(123456, { precision: 5 })).toBe('123.46K');
  expect(formatShortNumber(1234567)).toBe('1.2M');
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

test('average', () => {
  expect(average([1, 2, 3, 4])).toEqual(2.5);
  expect(average([])).toBeNull();
});

test('min', () => {
  expect(min([-1, 0, 1, 2, 3, 4])).toEqual(-1);
  expect(min([])).toBeNull();
});

test('max', () => {
  expect(max([-1, 0, 1, 2, 3, 4])).toEqual(4);
  expect(max([])).toBeNull();
});

test('roundDownToInterval', () => {
  expect(roundDownToInterval(100, 4)).toBe(100);
  expect(roundDownToInterval(101, 4)).toBe(100);
  expect(roundDownToInterval(102, 4)).toBe(100);
  expect(roundDownToInterval(103, 4)).toBe(100);
  expect(roundDownToInterval(104, 4)).toBe(104);

  expect(roundDownToInterval(99, 3)).toBe(99);
  expect(roundDownToInterval(100, 3)).toBe(99);
  expect(roundDownToInterval(101, 3)).toBe(99);
  expect(roundDownToInterval(102, 3)).toBe(102);
});

test('roundUpToInterval', () => {
  expect(roundUpToInterval(100, 4)).toBe(100);
  expect(roundUpToInterval(101, 4)).toBe(104);
  expect(roundUpToInterval(102, 4)).toBe(104);
  expect(roundUpToInterval(103, 4)).toBe(104);
  expect(roundUpToInterval(104, 4)).toBe(104);

  expect(roundUpToInterval(99, 3)).toBe(99);
  expect(roundUpToInterval(100, 3)).toBe(102);
  expect(roundUpToInterval(101, 3)).toBe(102);
  expect(roundUpToInterval(102, 3)).toBe(102);
});
