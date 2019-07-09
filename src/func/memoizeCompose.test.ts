import { memoizeCompose } from './memoizeCompose';

describe('memoizeCompose', () => {
  it('composes argument mapping function.', () => {
    const getA = ({ a }: any): any => a;

    let count = 0;
    const addAB = memoizeCompose([getA], (a) => {
      count += 1;
      return 2 * a;
    });

    expect(addAB({ a: 1 })).toBe(2);
    expect(count).toBe(1);

    expect(addAB({ a: 1 })).toBe(2);
    expect(count).toBe(1);

    expect(addAB({ a: 2 })).toBe(4);
    expect(count).toBe(2);

    expect(addAB({ a: 2 })).toBe(4);
    expect(count).toBe(2);

    // unnecessary secondary field does not trigger recalc
    expect(addAB({ a: 2, b: 1 })).toBe(4);
    expect(count).toBe(2);
  });

  it('composes argument mapping functions.', () => {
    const getA = ({ a }: any): any => a;
    const getB = ({ b }: any): any => b;

    let count = 0;
    const addAB = memoizeCompose([getA, getB], (a, b) => {
      count += 1;
      return a + b;
    });

    expect(addAB({ a: 1, b: 2 })).toBe(3);
    expect(count).toBe(1);

    expect(addAB({ a: 1, b: 2 })).toBe(3);
    expect(count).toBe(1);

    expect(addAB({ a: 2, b: 1 })).toBe(3);
    expect(count).toBe(2);

    expect(addAB({ a: 2, b: 1 })).toBe(3);
    expect(count).toBe(2);

    expect(addAB({ a: 2, b: 2 })).toBe(4);
    expect(count).toBe(3);

    // unnecessary third field does not trigger recalc
    expect(addAB({ a: 2, b: 2, c: 3 })).toBe(4);
    expect(count).toBe(3);
  });
});
