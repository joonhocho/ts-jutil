import { withoutKeys } from './withoutKeys';

describe('withoutKeys', () => {
  test('returns a new object with key-value pairs from the object filtered by the keys', () => {
    const foo = Object.create({ foo: 1 });
    foo.bar = 2;
    foo.baz = 3;
    foo.bae = 4;

    const result = withoutKeys(foo, ['foo', 'baz', 'boo']);
    expect(result).toEqual({ bar: 2, bae: 4 });
    expect(result).not.toBe(foo);
  });
});
