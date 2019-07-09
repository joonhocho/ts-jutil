import { join } from './join';

describe('join', () => {
  test('should insert a separator inbetween each item in the list', () => {
    expect(join([], 5)).toEqual([]);
    expect(join([1], 5)).toEqual([1]);
    expect(join([1, 2], 5)).toEqual([1, 5, 2]);
    expect(join([1, 2, 3], 5)).toEqual([1, 5, 2, 5, 3]);
  });
});
