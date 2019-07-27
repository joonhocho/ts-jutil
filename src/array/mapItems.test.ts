import { mapItems } from './mapItems';

test('mapItems', () => {
  const args1: any = [];
  const args2: any = [];
  const arr = [5, 1, 0, 3, null, 9];
  const res1 = mapItems(arr, (...args: any[]) => {
    args1.push(args);
    return String(args[0]);
  });
  const res2 = arr.map((...args: any[]) => {
    args2.push(args);
    return String(args[0]);
  });
  expect(res1).toEqual(res2);
  expect(args1).toEqual(args2);
  expect(mapItems([], (x) => x)).toEqual([]);
  const src: any = [];
  expect(mapItems(src, (x) => x)).not.toBe(src);
});
