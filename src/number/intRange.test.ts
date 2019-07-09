import { intRange } from './intRange';

describe('intRange', () => {
  test('should create a range of numbers', () => {
    expect(intRange(-2, 3)).toEqual([-2, -1, 0, 1, 2, 3]);
  });
});
