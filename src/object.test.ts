import {
  assignDefined,
  assignKeys,
  copy,
  deepSortedCopy,
  deleteProp,
  enums,
  filter,
  filterKeys,
  forEach,
  get,
  getKeys,
  getter,
  getterMap,
  hasOwnProp,
  immutableSetter,
  isEmpty,
  isObject,
  isPlain,
  map,
  mapFilter,
  mapKeys,
  mapToArray,
  reduce,
  setProp,
  setter,
  sortedCopy,
  values,
  withoutKeys,
  withoutNil,
  withoutUndefined,
} from './object';

describe('object', () => {
  test('isObject', () => {
    expect(isObject(undefined)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject('')).toBe(false);
    expect(isObject(0)).toBe(false);
    expect(isObject(1)).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(false)).toBe(false);
    expect(isObject([])).toBe(true);
    expect(isObject(new Date())).toBe(true);
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
    expect(isObject(Object.create(null))).toBe(true);
    expect(isObject(Object.create({}))).toBe(true);
    expect(isObject(new Object())).toBe(true);
  });

  test('isPlain', () => {
    expect(isPlain(undefined)).toBe(false);
    expect(isPlain(null)).toBe(false);
    expect(isPlain('')).toBe(false);
    expect(isPlain(0)).toBe(false);
    expect(isPlain(1)).toBe(false);
    expect(isPlain(true)).toBe(false);
    expect(isPlain(false)).toBe(false);
    expect(isPlain([])).toBe(false);
    expect(isPlain(new Date())).toBe(false);
    expect(isPlain({})).toBe(true);
    expect(isPlain({ a: 1 })).toBe(true);
    expect(isPlain(Object.create(null))).toBe(true);
    expect(isPlain(Object.create({}))).toBe(true);
    expect(isPlain(new Object())).toBe(true);
  });

  test('hasOwnProp', () => {
    expect(hasOwnProp({}, 'a')).toBe(false);
    expect(hasOwnProp({ a: 1 }, 'a')).toBe(true);
    expect(hasOwnProp([1], '0')).toBe(true);
    expect(hasOwnProp([], '0')).toBe(false);
    const o = Object.create(null);
    expect(hasOwnProp(o, 'a')).toBe(false);
    o.a = 1;
    expect(hasOwnProp(o, 'a')).toBe(true);
  });

  describe('isEmpty', () => {
    test('returns true if the given object is empty', () => {
      expect(isEmpty({})).toBe(true);
      expect(isEmpty({ a: 1 })).toBe(false);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty([1])).toBe(false);
    });
  });

  describe('values', () => {
    test('returns an array of values of the object', () => {
      const foo = Object.create({ foo: 1 });
      foo.bar = 2;
      foo.baz = 3;

      const result = values(foo);
      expect(result).toEqual([2, 3]);
    });
  });

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

  describe('forEach', () => {
    test('iterates over own properties of an object', () => {
      const foo = Object.create({ foo: 1 });
      foo.bar = 2;
      foo.baz = 3;

      const keys: any = [];
      const thisp = {};

      forEach(
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

  test('mapFilter', () => {
    expect(
      mapFilter({ a: 1, b: '', c: null, d: undefined }, (a) => a, undefined)
    ).toEqual({
      a: 1,
      b: '',
      c: null,
    });

    expect(
      mapFilter(
        { a: 1, b: '', c: null, d: undefined },
        (a) => a || undefined,
        undefined
      )
    ).toEqual({
      a: 1,
    });

    expect(
      mapFilter(
        { a: 1, b: '', c: null, d: undefined },
        (a) => a && String(a),
        undefined
      )
    ).toEqual({
      a: '1',
      b: '',
      c: null,
    });

    expect(
      mapFilter(
        { a: 1, b: '', c: null, d: undefined },
        (a) => a && String(a),
        null
      )
    ).toEqual({
      a: '1',
      b: '',
      d: undefined,
    });

    expect(
      mapFilter({ a: 1, b: '', c: null, d: undefined }, (_a, k) => k, 'b')
    ).toEqual({
      a: 'a',
      c: 'c',
      d: 'd',
    });
  });

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

  describe('withoutUndefined', () => {
    test('filters out undefined', () => {
      expect(
        withoutUndefined({
          a: undefined,
          b: null,
          c: false,
          d: true,
          e: 0,
          f: 1,
          g: '',
          h: 'a',
          i: [],
          j: {},
          k: NaN,
        })
      ).toEqual({
        b: null,
        c: false,
        d: true,
        e: 0,
        f: 1,
        g: '',
        h: 'a',
        i: [],
        j: {},
        k: NaN,
      });
    });
  });

  describe('withoutNil', () => {
    test('filters out null or undefined', () => {
      expect(
        withoutNil({
          a: undefined,
          b: null,
          c: false,
          d: true,
          e: 0,
          f: 1,
          g: '',
          h: 'a',
          i: [],
          j: {},
          k: NaN,
        })
      ).toEqual({
        c: false,
        d: true,
        e: 0,
        f: 1,
        g: '',
        h: 'a',
        i: [],
        j: {},
        k: NaN,
      });
    });
  });

  describe('assignDefined', () => {
    test('copy values of the given keys', () => {
      expect(
        assignDefined({}, { a: 3, b: 1, c: null, d: undefined }, ['a', 'b'])
      ).toEqual({ a: 3, b: 1 });
    });

    test('does not copy undefined values', () => {
      const obj = { a: 3, b: 1, c: null, d: undefined };

      expect(assignDefined({}, obj, getKeys(obj))).toEqual({
        a: 3,
        b: 1,
        c: null,
      });
    });
  });

  describe('assignKeys', () => {
    test('copy values of the given keys', () => {
      const obj = { a: 3, b: 1, c: null, d: undefined };
      expect(assignKeys({}, obj, ['a', 'b'])).toEqual({ a: 3, b: 1 });
    });

    test('does not copy undefined values', () => {
      const obj = { a: 3, b: 1, c: null, d: undefined };

      expect(assignKeys({}, obj, Object.keys(obj))).toEqual({
        a: 3,
        b: 1,
        c: null,
      });
    });
  });

  test('copy', () => {
    expect(copy({}, { a: 1 }, ['a'])).toEqual({ a: 1 });
    expect(copy({}, { a: 1 }, ['a', 'b'])).toEqual({ a: 1 });
    expect(copy({}, { a: 1, b: 2 }, ['a', 'b'])).toEqual({ a: 1, b: 2 });
    expect(copy({}, { a: 1, b: undefined }, ['a', 'b'])).toEqual({
      a: 1,
      b: undefined,
    });
    expect(copy({}, { a: 1, b: null }, ['a', 'b'])).toEqual({ a: 1, b: null });

    const dest = {};
    expect(copy(dest, { a: 1, b: 2, z: 3 }, ['a', 'b', 'c'])).toBe(dest);
    expect(dest).toEqual({ a: 1, b: 2 });

    expect(copy({}, { a: 1, b: 2 })).toEqual({ a: 1, b: 2 });
    expect(copy({}, {}, ['hasOwnProperty'])).toEqual({});
    expect(copy({}, {}, ['hasOwnProperty'], false)).toEqual({
      hasOwnProperty: {}.hasOwnProperty,
    });
  });

  test('mapKeys', () => {
    expect(mapKeys({}, { a: 'aa' })).toEqual({});
    expect(mapKeys({ a: 1 }, { a: 'aa' })).toEqual({ aa: 1 });
    expect(mapKeys({ a: 1, b: 2 }, { a: 'aa' })).toEqual({ aa: 1 });
    expect(mapKeys({ a: 1, b: 2, c: 3 }, { a: 'aa', c: 'a' })).toEqual({
      a: 3,
      aa: 1,
    });

    const dest = { e: 4 };
    expect(mapKeys({ a: 1, b: 2, c: 3 }, { a: 'aa', c: 'a' }, dest)).toBe(dest);
    expect(dest).toEqual({ aa: 1, a: 3, e: 4 });
    expect(mapKeys({ a: 1 }, { hasOwnProperty: 'aa' } as any)).toEqual({});
    expect(
      mapKeys({ a: 1 }, { hasOwnProperty: 'aa' } as any, {}, false)
    ).toEqual({
      aa: {}.hasOwnProperty,
    });
  });

  describe('get', () => {
    test('should safely get a value at deep path', () => {
      expect(get(null, 'a')).toBe(undefined);
      expect(get({ a: { b: { c: 1 } } }, 'a.b.c')).toBe(1);
      expect(get({ a: { b: { c: 1 } } }, 'a.b.d')).toBe(undefined);
      expect(get({ a: { b: { c: 1 } } }, 'a.b.c.d')).toBe(undefined);
      expect(get({ a: { b: { c: 1 } } }, 'b.c.d')).toBe(undefined);
      expect(get({ a: { b: [{}, { c: 1 }] } }, 'a.b.1.c')).toBe(1);
      expect(get({ a: { b: [{}, { c: 1 }] } }, 'a.b.3.c')).toBe(undefined);
    });
  });

  describe('getter', () => {
    test('should safely get a value at deep path', () => {
      expect(getter('a')(null)).toBe(undefined);
      expect(getter('a.b.c')({ a: { b: { c: 1 } } })).toBe(1);
      expect(getter('a.b.d')({ a: { b: { c: 1 } } })).toBe(undefined);
      expect(getter('a.b.c.d')({ a: { b: { c: 1 } } })).toBe(undefined);
      expect(getter('b.c.d')({ a: { b: { c: 1 } } })).toBe(undefined);
      expect(getter('a.b.1.c')({ a: { b: [{}, { c: 1 }] } })).toBe(1);
      expect(getter('a.b.3.c')({ a: { b: [{}, { c: 1 }] } })).toBe(undefined);
    });
  });

  describe('getterMap', () => {
    test('should safely get a value at deep path', () => {
      const transform = getterMap({
        a: 'a1.a2.a3',
        b: 'b1.b2',
        c: 'c1',
      });

      expect(
        transform({
          a1: { a2: { a3: { a4: 1 } } },
          b1: { b2: { b3: 2 } },
          c1: { c2: 3 },
        })
      ).toEqual({
        a: { a4: 1 },
        b: { b3: 2 },
        c: { c2: 3 },
      });

      expect(
        transform({
          a1: { a2: { a3: 1 } },
          b1: { b2: 2 },
          c1: 3,
        })
      ).toEqual({
        a: 1,
        b: 2,
        c: 3,
      });

      expect(transform({})).toEqual({
        a: undefined,
        b: undefined,
        c: undefined,
      });
    });
  });

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

  describe('enums', () => {
    test('should create an enum map from an array', () => {
      expect(enums(['a', 'b'])).toEqual({ a: 1, b: 2 });
      expect(enums(['a', 'b'], 0)).toEqual({ a: 0, b: 1 });
    });
  });

  describe('sortedCopy', () => {
    test('should sort object props by keys', () => {
      const src = {
        b: '2',
        a: '1',
        c: '3',
      };
      const sorted = sortedCopy(src);

      expect(Object.keys(src)).toEqual(['b', 'a', 'c']);
      expect(Object.keys(sorted)).toEqual(['a', 'b', 'c']);
      expect(src).toEqual(sorted);
      expect(src).not.toBe(sorted);
    });
  });

  describe('deepSortedCopy', () => {
    test('should sort object props by keys', () => {
      const src = {
        b: '2',
        a: '1',
        c: '3',
      };
      const sorted = deepSortedCopy(src);

      expect(Object.keys(src)).toEqual(['b', 'a', 'c']);
      expect(Object.keys(sorted)).toEqual(['a', 'b', 'c']);
      expect(src).toEqual(sorted);
      expect(src).not.toBe(sorted);
    });

    test('should sort objects deeply by keys', () => {
      const src = {
        b: [{ c: 3, a: 1, b: 2 }, { c2: 3, a2: 1, b2: 2 }],
        a: '1',
        c: { c3: 3, a3: 1, b3: 2 },
      };
      const sorted = deepSortedCopy(src);

      expect(Object.keys(src)).toEqual(['b', 'a', 'c']);
      expect(Object.keys(sorted)).toEqual(['a', 'b', 'c']);
      expect(src).toEqual(sorted);
      expect(src).not.toBe(sorted);

      expect(src.b).not.toBe(sorted.b);
      expect(src.b[0]).not.toBe(sorted.b[0]);
      expect(src.b[1]).not.toBe(sorted.b[1]);
      expect(src.c).not.toBe(sorted.c);
      expect(Object.keys(sorted.b[0])).toEqual(['a', 'b', 'c']);
      expect(Object.keys(sorted.b[1])).toEqual(['a2', 'b2', 'c2']);
      expect(Object.keys(sorted.c)).toEqual(['a3', 'b3', 'c3']);
    });
  });

  test('setProp', () => {
    expect(setProp({}, 'a', 1)).toEqual({ a: 1 });
    expect(setProp({ a: 1 }, 'b', 2)).toEqual({ a: 1, b: 2 });
    expect(setProp({ a: 1 }, 'a', 'hi')).toEqual({ a: 'hi' });
  });

  test('deleteProp', () => {
    expect(deleteProp({}, 'a')).toEqual({});
    expect(deleteProp({ a: 1 }, 'a')).toEqual({});
    expect(deleteProp({ a: 1 }, 'b')).toEqual({ a: 1 });
    expect(deleteProp({ a: 1, b: 2 }, 'b')).toEqual({ a: 1 });
  });
});
