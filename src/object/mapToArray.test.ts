import { mapToArray } from './mapToArray';

describe('mapToArray', () => {
  test('iterates over own properties of an object', () => {
    const foo = Object.create({ foo: 1 });
    foo.bar = 2;
    foo.baz = 3;

    const keys: any = [];
    const that = {};

    const result = mapToArray(
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

    expect(result).toEqual([4, 9]);
  });
});
