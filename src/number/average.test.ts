import { average } from './average';

test('average', () => {
  expect(average([1, 2, 3, 4])).toEqual(2.5);
  expect(average([])).toBeNull();
});
