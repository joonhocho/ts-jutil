import { filter } from './filter';

describe('filter', () => {
  test('iterates over own properties of an object', () => {
    const foo = Object.create({ foo: 1 });
    foo.bar = 2;
    foo.baz = 3;

    const keys: any = [];
    const that = {};

    const result = filter(
      foo,
      function f(this: any, val, key, obj): boolean {
        expect(obj).toBe(foo);
        expect(val).toBe(obj[key]);
        expect(this).toBe(that);
        keys.push(key);
        return val > 2;
      },
      that
    );

    expect(keys).toEqual(['bar', 'baz']);

    expect(result).not.toBe(foo);
    expect(result).toEqual({ baz: 3 });
  });
});
