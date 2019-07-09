import { uniqueByKey } from './uniqueByKey';

test('uniqueByKey', () => {
  expect(uniqueByKey([], 'v')).toEqual([]);
  expect(uniqueByKey([1, 2, 3, 2, 1].map((v) => ({ v })), 'v')).toEqual(
    [1, 2, 3].map((v) => ({ v }))
  );
});
