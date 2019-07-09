import { mapFilter } from './mapFilter';

test('mapFilter', () => {
  expect(
    mapFilter(
      [5, 1, 0, 3, null, 9],
      (v: any) => (v > 0 ? String(v) : undefined),
      undefined
    )
  ).toEqual(['5', '1', '3', '9']);

  expect(mapFilter([5, 1, 0, 3, null, 9], String, '3')).toEqual([
    '5',
    '1',
    '0',
    'null',
    '9',
  ]);

  expect(mapFilter([5, 1, 0, 3, null, 9], (x) => x, 1)).toEqual([
    5,
    0,
    3,
    null,
    9,
  ]);

  expect(mapFilter([5, 1, 0, 3, null, 9], Boolean, true)).toEqual([
    false,
    false,
  ]);

  expect(
    mapFilter([5, 1, 0, 3, null, 9], (x, i) => String(x) + i, undefined)
  ).toEqual(['50', '11', '02', '33', 'null4', '95']);
  const src: any = [];
  expect(mapFilter([], (x) => x, undefined)).toEqual([]);
  expect(mapFilter(src, (x) => x, undefined)).not.toBe(src);
});
