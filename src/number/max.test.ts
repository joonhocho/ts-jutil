import { max } from './max';

test('max', () => {
  expect(max([-1, 0, 1, 2, 3, 4])).toEqual(4);
  expect(max([])).toBeNull();
});
