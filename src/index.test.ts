import { array } from './index';

test('array.last', () => {
  expect(array.last([1, 2])).toBe(2);
});
