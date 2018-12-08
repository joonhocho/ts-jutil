import { Timestamp } from './timestamp';

test('Timestamp.calibrate()', () => {
  expect(Timestamp.nanosecondsCalibration).toBe(0);
  const c = Timestamp.calibrate();
  expect(c).toBeGreaterThanOrEqual(0);
  expect(c).toBeLessThan(1000000);
  expect(Timestamp.nanosecondsCalibration).toBe(c);
});

test('Timestamp.currentNanoseconds()', () => {
  for (let i = 0; i < 100; i += 1) {
    const ns = Timestamp.currentNanoseconds();
    expect(ns).toBeGreaterThanOrEqual(0);
    expect(ns).toBeLessThan(1000000);
  }
});

test('Timestamp.now()', () => {
  const ts = Timestamp.now();
  expect(ts).toBeInstanceOf(Timestamp);

  expect(typeof ts.milliseconds).toBe('number');
  expect(ts.milliseconds).toBeGreaterThanOrEqual(Date.now() - 100);
  expect(ts.milliseconds).toBeLessThanOrEqual(Date.now() + 100);

  expect(typeof ts.nanoseconds).toBe('number');
  expect(ts.nanoseconds).toBeGreaterThanOrEqual(0);
  expect(ts.nanoseconds).toBeLessThan(1000000);
});

test('Timestamp().toDate()', () => {
  const ts = new Timestamp(1234567, 8910);
  expect(ts.toDate()).toBeInstanceOf(Date);
  expect(ts.toDate().getTime()).toBe(new Date(1234567).getTime());
});

test('Timestamp().toMilliseconds()', () => {
  const ts = new Timestamp(1234567, 8910);
  expect(ts.toMilliseconds()).toBeCloseTo(1234567.00891, 5);
});

test('Timestamp().toMillisecondsString()', () => {
  const ts = new Timestamp(1234567, 8910);
  expect(ts.toMillisecondsString()).toBe('1234567.008910');
});

test('Timestamp().toNanosecondsString()', () => {
  const ts = new Timestamp(1234567, 8910);
  expect(ts.toNanosecondsString()).toBe('1234567008910');
});

test('Timestamp().toString()', () => {
  const ts = new Timestamp(1234567, 8910);
  expect(ts.toString()).toBe('1234567008910');
});

test('Timestamp().toISOString()', () => {
  const ts = new Timestamp(1234567, 8910);
  expect(ts.toISOString()).toMatch(new Date(1234567).toISOString());
});
