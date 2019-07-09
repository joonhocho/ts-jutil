import { formatShortNumber } from './formatShortNumber';

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
