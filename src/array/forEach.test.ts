import { forEach } from './forEach';

test('forEach', () => {
  const args1: any = [];
  const args2: any = [];
  const arr = [5, 1, 0, 3, null, 9];
  forEach(arr, (...args: any[]) => args1.push(args));
  arr.forEach((...args: any[]) => args2.push(args));
  expect(args1).toEqual(args2);
});
