import { memoize } from './memoize';

describe('memoize', () => {
  it('memoizes last function arguments and returned value.', () => {
    let count = 0;
    const add = memoize((a: number, b: number) => {
      count += 1;
      return a + b;
    });

    expect(add(1, 2)).toBe(3);
    expect(count).toBe(1);

    expect(add(1, 2)).toBe(3);
    expect(count).toBe(1);

    expect(add(2, 1)).toBe(3);
    expect(count).toBe(2);

    expect(add(2, 1)).toBe(3);
    expect(count).toBe(2);

    expect(add(2, 2)).toBe(4);
    expect(count).toBe(3);
  });
});
