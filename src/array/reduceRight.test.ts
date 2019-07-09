import { reduceRight } from './reduceRight';

test('reduceRight', () => {
  const args1: any = [];
  const args2: any = [];
  const arr = [5, 1, 0, 3, null, 9];
  const res1 = reduceRight(
    arr,
    (...args: any[]) => {
      args1.push(args);
      return args[0] + (args[1] || 0);
    },
    -1
  );
  const res2 = arr.reduceRight((...args: any[]) => {
    args2.push(args);
    return args[0] + (args[1] || 0);
  }, -1);
  expect(res1).toEqual(res2);
  expect(args1).toEqual(args2);
});
