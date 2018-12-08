import { average } from 'src/number';

const getNumPairs = (len: number): Array<[number, number]> => {
  const a: Array<[number, number]> = [];
  for (let i = 0; i < len; i += 1) {
    a.push([0, 0]);
  }
  return a;
};

const avgNano = (a: number, b: number): number => {
  const n0 = a % 1000000;
  let n1 = b % 1000000;
  if (n1 < n0) {
    n1 += 1000000;
  }
  return (n1 + n0) / 2;
};

const minuteInMs = 60 * 1000;
const hourInMs = 60 * minuteInMs;
const dayInMs = 24 * hourInMs;

export class Timestamp {
  public static getMilliseconds = Date.now;

  public static getNanoseconds =
    process && process.hrtime && ((): number => process.hrtime()[1]);

  public static nanosecondsCalibration = 0;

  public static calibrate = (accuracy = 100): number => {
    const { getNanoseconds, getMilliseconds } = Timestamp;
    const pairs = getNumPairs(accuracy);
    const len = pairs.length;
    let i = 0;
    let lastMs = getMilliseconds();

    while (i !== len) {
      const hr0 = getNanoseconds();
      const ms = getMilliseconds();
      const hr1 = getNanoseconds();
      if (ms !== lastMs) {
        lastMs = ms;
        pairs[i] = [hr0, hr1];
        i += 1;
      }
    }

    Timestamp.nanosecondsCalibration =
      Math.round(
        average(
          pairs
            .map(([a, b]) => avgNano(a, b)) // avg
            .sort()
            .slice(50, 450) // remove outliers
        )! // average
      ) % 1000000;

    return Timestamp.nanosecondsCalibration;
  };

  public static currentNanoseconds = (): number =>
    (Math.max(Timestamp.getNanoseconds(), 1000000) -
      Timestamp.nanosecondsCalibration) %
    1000000;

  public static now = (): Timestamp =>
    new Timestamp(Timestamp.getMilliseconds(), Timestamp.currentNanoseconds());

  public static from = (ms: number | string | Date, ns = 0): Timestamp =>
    new Timestamp(new Date(ms).getTime(), ns);

  constructor(public milliseconds: number, public nanoseconds: number) {}

  public toDate(): Date {
    return new Date(this.milliseconds);
  }

  public toMilliseconds(): number {
    return this.milliseconds + this.nanoseconds / 1000000;
  }

  public toMillisecondsString(): string {
    return `${this.milliseconds}.${this.nanoseconds
      .toString()
      .padStart(6, '0')}`;
  }

  public toNanosecondsString(): string {
    return `${this.milliseconds}${this.nanoseconds
      .toString()
      .padStart(6, '0')}`;
  }

  public toString(): string {
    return this.toNanosecondsString();
  }

  public toISOString(): string {
    return this.toDate().toISOString();
  }

  public addSeconds(seconds: number): Timestamp {
    this.milliseconds += seconds * 1000;
    return this;
  }

  public addMinutes(minutes: number): Timestamp {
    this.milliseconds += minutes * minuteInMs;
    return this;
  }

  public addHours(hours: number): Timestamp {
    this.milliseconds += hours * hourInMs;
    return this;
  }

  public addDays(days: number): Timestamp {
    this.milliseconds += days * dayInMs;
    return this;
  }

  public clone(): Timestamp {
    return new Timestamp(this.milliseconds, this.nanoseconds);
  }

  public equal(ts: Timestamp): boolean {
    return (
      ts.milliseconds === this.milliseconds &&
      ts.nanoseconds === this.nanoseconds
    );
  }
}
