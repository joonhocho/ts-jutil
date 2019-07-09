import { mapToUniqueString } from './mapToUniqueString';

test('mapToUniqueString', () => {
  expect(mapToUniqueString([5, 0, null, 0, 9, 5], String)).toEqual([
    '5',
    '0',
    'null',
    '9',
  ]);
  expect(
    mapToUniqueString([5, 0, null, 0, 9, 5], (x) => (x && String(x)) || null)
  ).toEqual(['5', '9']);
});
