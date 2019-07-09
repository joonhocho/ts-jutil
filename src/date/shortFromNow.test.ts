import { shortFromNow } from './shortFromNow';

test('shortFromNow', () => {
  const now = Date.now();
  expect(shortFromNow(now)).toBe('now');
  expect(shortFromNow(now - 1000)).toBe('-1s');
  expect(shortFromNow(now - 10100)).toBe('-10s');
  expect(shortFromNow(now + 10100)).toBe('+10s');
  expect(shortFromNow(now - 60 * 1000)).toBe('-1m');
  expect(shortFromNow(now - 10 * 60 * 1000)).toBe('-10m');
  expect(shortFromNow(now - 60 * 60 * 1000)).toBe('-1h');
  expect(shortFromNow(now - 10 * 60 * 60 * 1000)).toBe('-10h');
  expect(shortFromNow(now - 24 * 60 * 60 * 1000)).toBe('-1d');
  expect(shortFromNow(now - 10 * 24 * 60 * 60 * 1000)).toBe('-10d');
  expect(shortFromNow(now - 30 * 24 * 60 * 60 * 1000)).toBe('-30d');
  expect(shortFromNow(now - 31 * 24 * 60 * 60 * 1000)).toBe('-1mo');
  expect(shortFromNow(now - 310 * 24 * 60 * 60 * 1000)).toBe('-10mo');
  expect(shortFromNow(now - 365 * 24 * 60 * 60 * 1000)).toBe('-1y');
  expect(shortFromNow(now - 10 * 365 * 24 * 60 * 60 * 1000)).toBe('-10y');
});
