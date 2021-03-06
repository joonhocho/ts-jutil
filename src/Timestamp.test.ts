import { Timestamp } from './Timestamp';

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

test('Timestamp.from()', () => {
  const now = new Date();
  const ts = Timestamp.from(now)!;
  expect(ts).toBeInstanceOf(Timestamp);
  expect(ts.milliseconds).toBe(now.getTime());
  expect(ts.nanoseconds).toBe(0);
  expect(Timestamp.from(now, 1)!.nanoseconds).toBe(1);
  expect(Timestamp.from(now.getTime())!.equal(ts)).toBe(true);
  expect(Timestamp.from(now.toISOString())!.equal(ts)).toBe(true);
});

test('Timestamp.parseNanoseconds()', () => {
  const ts = Timestamp.now();
  expect(Timestamp.parseNanoseconds(ts.toNanosecondsString())).toBeInstanceOf(
    Timestamp
  );
  expect(Timestamp.parseNanoseconds(ts.toNanosecondsString())!.equal(ts)).toBe(
    true
  );
  expect(Timestamp.parseNanoseconds('')).toBeNull();
});

test('Timestamp.parseMilliseconds()', () => {
  const ts = Timestamp.now();
  expect(Timestamp.parseMilliseconds(ts.toMillisecondsString())).toBeInstanceOf(
    Timestamp
  );
  expect(
    Timestamp.parseMilliseconds(ts.toMillisecondsString())!.equal(ts)
  ).toBe(true);
  expect(Timestamp.parseMilliseconds('')).toBeNull();
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

test('Timestamp().addSeconds()', () => {
  const ts = new Timestamp(1234567, 8910).addSeconds(5);
  expect(ts.milliseconds).toBe(1239567);
});

test('Timestamp().addMinutes()', () => {
  const ts = new Timestamp(1234567, 8910).addMinutes(5);
  expect(ts.milliseconds).toBe(1234567 + 5 * 60 * 1000);
});

test('Timestamp().addHours()', () => {
  const ts = new Timestamp(1234567, 8910).addHours(5);
  expect(ts.milliseconds).toBe(1234567 + 5 * 60 * 60 * 1000);
});

test('Timestamp().addDays()', () => {
  const ts = new Timestamp(1234567, 8910).addDays(5);
  expect(ts.milliseconds).toBe(1234567 + 5 * 24 * 60 * 60 * 1000);
});

test('Timestamp().clone()', () => {
  const ts = Timestamp.now();
  const clone = ts.clone();
  expect(clone).not.toBe(ts);
  expect(clone.milliseconds).toBe(ts.milliseconds);
  expect(clone.nanoseconds).toBe(ts.nanoseconds);
  expect(clone).toBeInstanceOf(Timestamp);
  expect(clone.equal(ts)).toBe(true);
});
