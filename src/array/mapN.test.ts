import { mapN } from './mapN';

describe('mapN', () => {
  test('calls function n times', () => {
    const list = mapN(3, (a) => a * 2, null);
    expect(list).toEqual([0, 2, 4]);
  });
  test('calls function n times', () => {
    const list = mapN(3, (a, b) => a + b, [1, 2]);
    expect(list).toEqual([3, 3, 3]);
  });
});
