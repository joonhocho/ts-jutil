import {
  bypass,
  lazyGet,
  memoize,
  memoizeArg,
  memoizeCompose,
  noop,
  returnFalse,
  returnNull,
  returnTrue,
  returnVoid,
} from './func';

test('noop', () => {
  expect(noop()).toBe(undefined);
  expect(noop()).toBe(undefined);
});

test('returnVoid', () => {
  expect(returnVoid()).toBe(undefined);
  expect(returnVoid()).toBe(undefined);
});

test('returnNull', () => {
  expect(returnNull()).toBe(null);
  expect(returnNull()).toBe(null);
});

test('returnTrue', () => {
  expect(returnTrue()).toBe(true);
  expect(returnTrue()).toBe(true);
});

test('returnFalse', () => {
  expect(returnFalse()).toBe(false);
  expect(returnFalse()).toBe(false);
});

test('bypass', () => {
  expect(bypass(undefined)).toBe(undefined);
  expect(bypass(null)).toBe(null);
  expect(bypass(true)).toBe(true);
  expect(bypass(1)).toBe(1);
  expect(bypass('')).toBe('');
});

test('lazyGet', () => {
  const getter = jest.fn().mockImplementation(() => new Date());
  const lazied = lazyGet(getter);
  expect(getter).toBeCalledTimes(0);
  const d = lazied();
  expect(getter).toBeCalledTimes(1);
  expect(d).toBeInstanceOf(Date);
  expect(lazied()).toBe(d);
  expect(lazied()).toBe(d);
  expect(getter).toBeCalledTimes(1);

  const getter2 = jest.fn().mockImplementation(() => undefined);
  const lazied2 = lazyGet(getter2);
  expect(getter2).toBeCalledTimes(0);
  expect(lazied2()).toBe(undefined);
  expect(getter2).toBeCalledTimes(1);
  expect(lazied2()).toBe(undefined);
  expect(getter2).toBeCalledTimes(1);
});

describe('func', () => {
  describe('memoizeArg', () => {
    it('memoizes last function argument and returned value.', () => {
      let count = 0;
      const times2 = memoizeArg((a: number) => {
        count += 1;
        return 2 * a;
      });

      expect(times2(1)).toBe(2);
      expect(count).toBe(1);

      expect(times2(1)).toBe(2);
      expect(count).toBe(1);

      expect(times2(2)).toBe(4);
      expect(count).toBe(2);

      expect(times2(2)).toBe(4);
      expect(count).toBe(2);
    });
  });

  describe('memoize', () => {
    it('memoizes last function arguments and returned value.', () => {
      let count = 0;
      const add = memoize((a: number, b: number) => {
        count += 1;
        return a + b;
      });

      expect(add(1, 2)).toBe(3);
      expect(count).toBe(1);

      expect(add(1, 2)).toBe(3);
      expect(count).toBe(1);

      expect(add(2, 1)).toBe(3);
      expect(count).toBe(2);

      expect(add(2, 1)).toBe(3);
      expect(count).toBe(2);

      expect(add(2, 2)).toBe(4);
      expect(count).toBe(3);
    });
  });

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
});
