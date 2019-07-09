import { reduce } from './reduce';

describe('reduce', () => {
  test('iterates over own properties of an object', () => {
    const foo = Object.create({ foo: 1 });
    foo.bar = 2;
    foo.baz = 3;

    const keys: any = [];
    const that = {};

    const result = reduce(
      foo,
      function f(this: any, res, val, key, obj): number {
        expect(obj).toBe(foo);
        expect(val).toBe(obj[key]);
        expect(this).toBe(that);
        keys.push(key);
        return res + val;
      },
      1,
      that
    );

    expect(keys).toEqual(['bar', 'baz']);

    expect(result).toBe(6);
  });
});
