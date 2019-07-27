import { everyItem } from './everyItem';

test('everyItem', () => {
  const args1: any = [];
  const args2: any = [];
  const arr = [5, 1, 0, 3, null, 9];
  const res1 = everyItem(arr, (...args: any[]) => {
    args1.push(args);
    return args[0];
  });
  const res2 = arr.every((...args: any[]) => {
    args2.push(args);
    return args[0];
  });
  expect(res1).toEqual(res2);
  expect(args1).toEqual(args2);
});
