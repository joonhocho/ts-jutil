import { values } from './values';

describe('values', () => {
  test('returns an array of values of the object', () => {
    const foo = Object.create({ foo: 1 });
    foo.bar = 2;
    foo.baz = 3;

    const result = values(foo);
    expect(result).toEqual([2, 3]);
  });
});
