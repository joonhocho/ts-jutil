import { withoutUndefined } from './withoutUndefined';

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
