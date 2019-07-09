import { filterKeys } from './filterKeys';

describe('filterKeys', () => {
  test('returns a new object with key-value pairs from the object filtered by the keys', () => {
    const foo = Object.create({ foo: 1 });
    foo.bar = 2;
    foo.baz = 3;
    foo.bae = 4;

    const result = filterKeys(foo, ['foo', 'baz', 'boo']);
    expect(result).toEqual({ baz: 3 });
    expect(result).not.toBe(foo);
  });
});
