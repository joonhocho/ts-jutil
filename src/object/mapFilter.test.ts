import { mapFilter } from './mapFilter';

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
