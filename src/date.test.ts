import { getTime, parseYYYYMMDD, shortFromNow } from './date';

test('parseYYYYMMDD', () => {
  const d1 = parseYYYYMMDD('2000-01-01');
  expect(d1!.getFullYear()).toBe(2000);
  expect(d1!.getMonth()).toBe(0);
  expect(d1!.getDate()).toBe(1);

  const now = new Date();
  const d2 = parseYYYYMMDD(
    `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
  );
  expect(d2!.getFullYear()).toBe(now.getFullYear());
  expect(d2!.getMonth()).toBe(now.getMonth());
  expect(d2!.getDate()).toBe(now.getDate());

  expect(parseYYYYMMDD('2000-01-010')).toBe(null);
  expect(parseYYYYMMDD('2000-01-0')).toBe(null);
  expect(parseYYYYMMDD('2001-02-29')).toBe(null);

  // gap year
  expect(parseYYYYMMDD('2000-02-29')).not.toBe(null);
});

test('getTime', () => {
  const now = Date.now();
  expect(getTime(now)).toBe(now);
  expect(getTime(new Date(now).toISOString())).toBe(now);
  expect(getTime(new Date(now))).toBe(now);
  expect(getTime(null)).toBe(null);
});

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
