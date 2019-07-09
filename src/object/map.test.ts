import { map } from './map';

describe('map', () => {
  test('iterates over own properties of an object', () => {
    const foo = Object.create({ foo: 1 });
    foo.bar = 2;
    foo.baz = 3;

    const keys: any = [];
    const that = {};

    const result = map(
      foo,
      function f(this: any, val, key, obj): number {
        expect(obj).toBe(foo);
        expect(val).toBe(obj[key]);
        expect(this).toBe(that);
        keys.push(key);
        return val * val;
      },
      that
    );

    expect(keys).toEqual(['bar', 'baz']);

    expect(result).not.toBe(foo);
    expect(result).toEqual({ bar: 4, baz: 9 });
  });
});
