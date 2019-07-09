import { concatArrays } from './concatArrays';

describe('concatArrays', () => {
  test('concat array of arrays into a new flat array', () => {
    expect(concatArrays([])).toEqual([]);
    expect(concatArrays([[]])).toEqual([]);
    expect(concatArrays([[], []])).toEqual([]);
    expect(concatArrays([[1], [2], [3]])).toEqual([1, 2, 3]);
    expect(concatArrays([[1], [2], [3], []])).toEqual([1, 2, 3]);
  });
});
