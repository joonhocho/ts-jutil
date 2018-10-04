import {
  cloneDeep,
  deepMapArrayWithoutEmpty,
  deepMapObjectWithoutEmpty,
  mapStruct,
  mapStructPartial,
} from './json';

describe('cloneDeep', () => {
  test('clones simple values', () => {
    expect(cloneDeep(undefined)).toBe(undefined);
    expect(cloneDeep(null)).toBe(null);
    expect(cloneDeep(false)).toBe(false);
    expect(cloneDeep(true)).toBe(true);
    expect(cloneDeep(0)).toBe(0);
    expect(cloneDeep(1)).toBe(1);
    expect(cloneDeep('')).toBe('');
    expect(cloneDeep('a')).toBe('a');
    expect(cloneDeep([])).toEqual([]);
    expect(cloneDeep({})).toEqual({});
    expect(cloneDeep(NaN)).toBeNaN();
  });

  test('clones deeply', () => {
    const obj = {
      a: undefined,
      b: null,
      c: 0,
      d: false,
      e: [{ a: 1 }, null, undefined],
      f: { a: [3] },
    };

    const clone = cloneDeep(obj);

    expect(clone).not.toBe(obj);
    expect(clone).toEqual(obj);

    expect(clone.e).not.toBe(obj.e);
    expect(clone.e).toEqual(obj.e);
    expect(Array.isArray(clone.e)).toBe(true);

    expect(clone.e[0]).not.toBe(obj.e[0]);
    expect(clone.e[0]).toEqual(obj.e[0]);

    expect(clone.f).not.toBe(obj.f);
    expect(clone.f).toEqual(obj.f);
  });
});

test('deepMapObjectWithoutEmpty', () => {
  expect(deepMapObjectWithoutEmpty({}, (a) => a)).toBe(null);
  expect(deepMapObjectWithoutEmpty({ a: 1 }, (a) => a)).toEqual({ a: 1 });
  expect(deepMapObjectWithoutEmpty({ a: 1 }, (a) => 2 * a)).toEqual({ a: 2 });
  expect(deepMapObjectWithoutEmpty({ a: 1, b: 2 }, (a) => 2 * a)).toEqual({
    a: 2,
    b: 4,
  });
  expect(
    deepMapObjectWithoutEmpty(
      {
        a: 1,
        b: 2,
        c: null,
        d: undefined,
        e: '',
        f: { g: true },
        h: [{ i: 4 }, { j: ['k'] }],
      },
      (a) => !!a
    )
  ).toEqual({
    a: true,
    b: true,
    c: false,
    d: false,
    e: false,
    f: { g: true },
    h: [{ i: true }, { j: [true] }],
  });

  expect(
    deepMapObjectWithoutEmpty(
      {
        a: 1,
        b: 2,
        c: null,
        d: undefined,
        e: '',
        f: { g: true },
        h: [{ i: 4 }, { j: ['k'] }],
      },
      (a) => (typeof a === 'string' ? `${a}s` : null)
    )
  ).toEqual({ e: 's', h: [{ j: ['ks'] }] });

  expect(
    deepMapObjectWithoutEmpty(
      {
        z: 0,
        a: 1,
        b: 2,
        n: NaN,
        c: null,
        d: undefined,
        e: '',
        f: { g: true },
        h: [{ i: 4 }, { j: ['k'] }],
      },
      (a) => (typeof a === 'string' ? null : String(a))
    )
  ).toEqual({
    a: '1',
    b: '2',
    c: 'null',
    d: 'undefined',
    f: { g: 'true' },
    h: [{ i: '4' }],
    n: 'NaN',
    z: '0',
  });

  expect(
    deepMapObjectWithoutEmpty(
      {
        a: 1,
        b: 2,
        c: null,
        d: undefined,
        e: '',
        f: { g: true },
        h: [{ i: 4 }, { j: ['k'] }],
      },
      () => null
    )
  ).toEqual(null);

  expect(
    deepMapObjectWithoutEmpty(
      {
        a: 1,
        b: 2,
        c: null,
        d: undefined,
        e: '',
        f: { g: true },
        h: [{ i: 4 }, { j: ['k'] }],
      },
      (a) => (a ? a : null)
    )
  ).toEqual({ a: 1, b: 2, f: { g: true }, h: [{ i: 4 }, { j: ['k'] }] });
});

test('deepMapArrayWithoutEmpty', () => {
  expect(
    deepMapArrayWithoutEmpty(
      [
        8,
        { g: null, a: [null, NaN, null], k: { c: true } },
        {
          z: 0,
          a: 1,
          b: 2,
          n: NaN,
          c: null,
          d: undefined,
          e: '',
          f: { g: true },
          h: [{ i: 4 }, { j: ['k'] }],
        },
      ],
      (a) => a
    )
  ).toEqual([
    8,
    { k: { c: true } },
    { a: 1, b: 2, e: '', f: { g: true }, h: [{ i: 4 }, { j: ['k'] }], z: 0 },
  ]);

  expect(
    deepMapArrayWithoutEmpty(
      [
        8,
        { g: null, a: [null, null], k: { c: true } },
        {
          a: 1,
          b: 2,
          c: null,
          d: undefined,
          e: '',
          f: { g: true },
          h: [{ i: 4 }, { j: ['k'] }],
        },
      ],
      (a, key) => (key === 'g' ? false : a == null ? true : null)
    )
  ).toEqual([
    { a: [true, true], g: false },
    { c: true, d: true, f: { g: false } },
  ]);
});

test('mapStruct', () => {
  expect(
    mapStruct(
      {
        a: 1,
        b: 2,
        c: null,
        d: undefined,
        e: '',
        f: { g: true },
        h: [{ i: 4 }, { j: ['k'] }],
      },
      {
        a: String,
        b: Boolean,
        c: Number,
        d: String,
        e: Number,
        f: ({ g }: { g: boolean }): boolean => g,
        h: (x: any[]): number => x.length,
        // k: String, // ignored because no key on source
      }
    )
  ).toEqual({ a: '1', b: true, c: 0, d: 'undefined', e: 0, f: true, h: 2 });
});

test('mapStructPartial', () => {
  expect(
    mapStructPartial(
      {
        a: 1,
        b: 2,
        c: null,
        d: undefined,
        e: '',
        f: { g: true },
        h: [{ i: 4 }, { j: ['k'] }],
      },
      {
        a: String,
        b: Boolean,
        c: Number,
        d: String,
        e: Number,
        f: ({ g }: { g: boolean }): boolean => g,
        h: (x: any[]): number => x.length,
        k: String, // not ignored
      }
    )
  ).toEqual({
    a: '1',
    b: true,
    c: 0,
    d: 'undefined',
    e: 0,
    f: true,
    h: 2,
    k: 'undefined',
  });
});
