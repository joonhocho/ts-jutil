import { reduceRightFunctions } from './reduceRightFunctions';

test('reduceRightFunctions', () => {
  expect(
    reduceRightFunctions(
      // tslint:disable-next-line typedef
      [(a: any) => a + 1, (a: any) => a * 2, (a: any) => a + 3] as any,
      7
    )
  ).toBe(1 + 2 * (3 + 7));
});
