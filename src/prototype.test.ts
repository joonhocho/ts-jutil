/* tslint:disable:max-classes-per-file */
import {
  defineLazyProp,
  defineMethod,
  defineProp,
  inheritClass,
  inheritProp,
  inheritProps,
} from './prototype';

test('defineProp', () => {
  const proto = {};
  expect(defineProp(proto, 'a', 3)).toBe(proto);
  expect(Object.getOwnPropertyDescriptor(proto, 'a')).toEqual({
    configurable: true,
    enumerable: true,
    value: 3,
    writable: true,
  });
  expect((proto as any).a).toBe(3);
});

test('defineMethod', () => {
  const proto = {};
  const fn = (): void => {
    // noop
  };
  expect(defineMethod(proto, 'a', fn)).toBe(proto);
  expect(Object.getOwnPropertyDescriptor(proto, 'a')).toEqual({
    configurable: true,
    enumerable: false,
    value: fn,
    writable: true,
  });
});

test('defineLazyProp', () => {
  const proto = {};
  let c = 0;
  expect(
    defineLazyProp(proto, 'a', () => {
      c += 1;
      return 3;
    })
  ).toBe(proto);
  expect(c).toBe(0);
  expect((proto as any).a).toBe(3);
  expect(c).toBe(1);
  expect((proto as any).a).toBe(3);
  expect(c).toBe(1);
  (proto as any).a = 4;
  expect((proto as any).a).toBe(4);
  expect(c).toBe(1);
});

describe('inheritProp', () => {
  test('should inherit a property', () => {
    const a = {};
    const b = {};

    Object.defineProperty(b, 'c', {
      configurable: false,
      enumerable: false,
      value: 1,
      writable: false,
    });

    inheritProp(a, b as any, 'c');

    expect(Object.getOwnPropertyDescriptor(a, 'c')).toEqual({
      configurable: false,
      enumerable: false,
      value: 1,
      writable: false,
    });

    inheritProp(a, b as any, 'c', 'd');

    expect(Object.getOwnPropertyDescriptor(a, 'd')).toEqual({
      configurable: false,
      enumerable: false,
      value: 1,
      writable: false,
    });
  });
});

describe('inheritProps', () => {
  test('should inherit all properties', () => {
    const a = {};

    const b = {
      d: 2,
      e: 3,
    };

    Object.defineProperty(b, 'c', {
      configurable: false,
      enumerable: false,
      value: 1,
      writable: false,
    });

    inheritProps(a, b, { e: 1 });

    expect(Object.getOwnPropertyDescriptor(a, 'c')).toEqual({
      configurable: false,
      enumerable: false,
      value: 1,
      writable: false,
    });

    expect(Object.getOwnPropertyDescriptor(a, 'd')).toEqual({
      configurable: true,
      enumerable: true,
      value: 2,
      writable: true,
    });

    expect(Object.getOwnPropertyDescriptor(a, 'e')).toBe(undefined);
  });
});

describe('inheritClass', () => {
  test('should inherit all static and prototype properties', () => {
    class A {
      public static a1 = 1;

      public static c1 = 1;

      public a2(): number {
        return 1;
      }

      public c2(): number {
        return 1;
      }
    }

    class B {
      public static b1 = 2;

      public static c1 = 2;

      public b2(): number {
        return 2;
      }

      public c2(): number {
        return 2;
      }
    }

    inheritClass(A, B);

    expect(Object.getOwnPropertyDescriptor(A, 'b1')).toEqual(
      Object.getOwnPropertyDescriptor(B, 'b1')
    );
    expect(Object.getOwnPropertyDescriptor(A.prototype, 'b2')).toEqual(
      Object.getOwnPropertyDescriptor(B.prototype, 'b2')
    );
    expect(Object.getOwnPropertyDescriptor(A, 'c1')).not.toEqual(
      Object.getOwnPropertyDescriptor(B, 'c1')
    );
    expect(Object.getOwnPropertyDescriptor(A.prototype, 'c2')).not.toEqual(
      Object.getOwnPropertyDescriptor(B.prototype, 'c2')
    );
    expect(A.c1).toBe(1);
    expect(A.prototype.c2()).toBe(1);
  });
});
