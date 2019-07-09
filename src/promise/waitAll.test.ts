import { waitAll } from './waitAll';

describe('waitAll', () => {
  test('waits for all promises including rejected ones.', async () => {
    const [r1, r2, r3, r4, r5] = await waitAll([
      undefined,
      null,
      1,
      Promise.resolve(2),
      Promise.reject(3),
    ] as any);

    expect(r1).toEqual({
      data: undefined,
      error: null,
      resolved: true,
    });

    expect(r2).toEqual({
      data: null,
      error: null,
      resolved: true,
    });

    expect(r3).toEqual({
      data: 1,
      error: null,
      resolved: true,
    });

    expect(r4).toEqual({
      data: 2,
      error: null,
      resolved: true,
    });

    expect(r5).toEqual({
      data: null,
      error: 3,
      resolved: false,
    });
  });
});
