import { immutableSetter } from './immutableSetter';

describe('immutableSetter', () => {
  test('should safely get a value at deep path', () => {
    expect(immutableSetter('a')({}, 3)).toEqual({ a: 3 });
    const o = {};
    expect(immutableSetter('a')(o, 3)).not.toBe(o);
    expect(o).toEqual({});
    expect(immutableSetter('a.b')({}, 4)).toEqual({ a: { b: 4 } });
    expect(immutableSetter('a.b.c')({ a: {}, z: 'z' }, 5)).toEqual({
      a: { b: { c: 5 } },
      z: 'z',
    });
    expect(immutableSetter('a.b')({ a: { b: 2 } }, 3)).toEqual({
      a: { b: 3 },
    });
    expect(
      immutableSetter('obj.array.0', (cur, k) => {
        return k === 'array' ? (cur ? cur.slice() : []) : { ...cur };
      })({}, 3)
    ).toEqual({
      obj: { array: [3] },
    });

    const o1 = { a: { b: { c: 1 } }, d: {} };
    // same value => nothing happens
    expect(immutableSetter('a.b.c')(o1, 1)).toBe(o1);
    expect(o1).toEqual({ a: { b: { c: 1 } }, d: {} });

    const o2 = immutableSetter('a.b.c')(o1, 2);
    expect(o1).toEqual({ a: { b: { c: 1 } }, d: {} });
    expect(o2).toEqual({ a: { b: { c: 2 } }, d: {} });
    expect(o2).not.toBe(o1);
    expect(o2.a).not.toBe(o1.a);
    expect(o2.a.b).not.toBe(o1.a.b);
    expect(o2.a.b.c).not.toBe(o1.a.b.c);
    expect(o2.d).toBe(o1.d);

    const o3 = { obj: { array: [{ value: 1 }] }, obj2: {} };
    // same value => nothing happens
    const setter3 = immutableSetter('obj.array.0.value', (obj, key) => {
      if (key === 'array') {
        return obj ? obj.slice() : [];
      }
      return { ...obj };
    });
    expect(setter3(o3, 1)).toBe(o3);
    expect(o3).toEqual({ obj: { array: [{ value: 1 }] }, obj2: {} });

    const o4 = setter3(o3, 2);
    expect(o3).toEqual({ obj: { array: [{ value: 1 }] }, obj2: {} });
    expect(o4).toEqual({ obj: { array: [{ value: 2 }] }, obj2: {} });
    expect(o4).not.toEqual({ obj: { array: { 0: { value: 2 } } }, obj2: {} });
    expect(o4).not.toBe(o3);
    expect(o4.obj).not.toBe(o3.obj);
    expect(o4.obj.array).not.toBe(o3.obj.array);
    expect(o4.obj2).toBe(o3.obj2);
  });
});
