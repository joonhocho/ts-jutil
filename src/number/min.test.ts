import { min } from './min';

test('min', () => {
  expect(min([-1, 0, 1, 2, 3, 4])).toEqual(-1);
  expect(min([])).toBeNull();
});
