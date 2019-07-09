import { withoutNil } from './withoutNil';

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
