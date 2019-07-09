import { inheritProps } from './inheritProps';

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
