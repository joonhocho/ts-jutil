import { parseYYYYMMDD } from './parseYYYYMMDD';

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
