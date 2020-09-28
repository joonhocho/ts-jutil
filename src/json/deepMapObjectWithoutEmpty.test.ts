import { deepMapObjectWithoutEmpty } from './deepMap';

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
