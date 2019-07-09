import { memoizeArg } from './memoizeArg';

describe('memoizeArg', () => {
  it('memoizes last function argument and returned value.', () => {
    let count = 0;
    const times2 = memoizeArg((a: number) => {
      count += 1;
      return 2 * a;
    });

    expect(times2(1)).toBe(2);
    expect(count).toBe(1);

    expect(times2(1)).toBe(2);
    expect(count).toBe(1);

    expect(times2(2)).toBe(4);
    expect(count).toBe(2);

    expect(times2(2)).toBe(4);
    expect(count).toBe(2);
  });
});
