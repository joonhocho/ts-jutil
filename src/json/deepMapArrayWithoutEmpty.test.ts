import { deepMapArrayWithoutEmpty } from './deepMap';

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
