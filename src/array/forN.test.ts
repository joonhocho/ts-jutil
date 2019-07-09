import { forN } from './forN';

describe('forN', () => {
  test('calls function n times', () => {
    const list: any = [];
    forN(
      3,
      function f(this: any[], i): void {
        this.push(2 * i);
      },
      list
    );
    expect(list).toEqual([0, 2, 4]);
  });
});
