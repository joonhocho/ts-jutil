import { getTime } from './getTime';

test('getTime', () => {
  const now = Date.now();
  expect(getTime(now)).toBe(now);
  expect(getTime(new Date(now).toISOString())).toBe(now);
  expect(getTime(new Date(now))).toBe(now);
  expect(getTime(null)).toBe(null);
});
