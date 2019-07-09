import { mapStructPartial } from './mapStructPartial';

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
