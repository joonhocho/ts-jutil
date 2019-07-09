import { setter } from './setter';

describe('setter', () => {
  test('should safely get a value at deep path', () => {
    expect(setter('a')({}, 3)).toEqual({ a: 3 });
    const o = {};
    expect(setter('a')(o, 3)).toBe(o);
    expect(o).toEqual({ a: 3 });
    expect(setter('a.b')({}, 4)).toEqual({ a: { b: 4 } });
    expect(setter('a.b.c')({ a: {}, z: 'z' }, 5)).toEqual({
      a: { b: { c: 5 } },
      z: 'z',
    });
    expect(setter('a.b')({ a: { b: 2 } }, 3)).toEqual({
      a: { b: 3 },
    });
    expect(setter('a.1')({ a: [1] }, 2)).toEqual({
      a: [1, 2],
    });
    expect(setter('a.2')({ a: [1] }, 3)).toEqual({
      a: [1, , 3],
    });
    expect(
      setter('obj.array.0', (k) => {
        return k === 'array' ? [] : {};
      })({}, 3)
    ).toEqual({
      obj: { array: [3] },
    });
  });
});
