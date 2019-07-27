import { forEachProp } from './forEachProp';

describe('forEachProp', () => {
  test('iterates over own properties of an object', () => {
    const foo = Object.create({ foo: 1 });
    foo.bar = 2;
    foo.baz = 3;

    const keys: any = [];
    const thisp = {};

    forEachProp(
      foo,
      function f(this: any, val, key, obj): void {
        expect(obj).toBe(foo);
        expect(val).toBe(obj[key]);
        expect(this).toBe(thisp);
        keys.push(key);
      },
      thisp
    );

    expect(keys).toEqual(['bar', 'baz']);
  });
});
