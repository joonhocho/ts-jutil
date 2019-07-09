import { inheritProp } from './inheritProp';

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
