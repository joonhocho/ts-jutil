import { createBatcher } from './createBatcher';

describe('createBatcher', () => {
  test('batch simple math operation', async () => {
    const times2 = createBatcher((argsList) =>
      Promise.resolve(argsList.map(([v]: any) => v * 2))
    );

    expect(
      await Promise.all([times2(1), times2(2), times2(3), times2(4), times2(5)])
    ).toEqual([2, 4, 6, 8, 10]);

    expect(await Promise.all([times2(3), times2(6), times2(9)])).toEqual([
      6,
      12,
      18,
    ]);
  });

  const shouldNotBeHere = (): never => {
    throw new Error('should not be here');
  };

  test('throws error', async () => {
    const batcher = createBatcher((args) => {
      throw args.map(([v]) => v);
    });

    const p1 = batcher(1).then(shouldNotBeHere, (e) => {
      expect(e).toBe(1);
      return 2;
    });
    const p2 = batcher(3).then(shouldNotBeHere, (e) => {
      expect(e).toBe(3);
      return 4;
    });

    expect(await Promise.all([p1, p2])).toEqual([2, 4]);
  });

  test('throws error', async () => {
    const batcher = createBatcher(() => {
      throw new Error('same error');
    });

    const p1 = batcher(1).then(shouldNotBeHere, (e) => {
      expect(e.message).toBe('same error');
      return 2;
    });
    const p2 = batcher(3).then(shouldNotBeHere, (e) => {
      expect(e.message).toBe('same error');
      return 4;
    });

    expect(await Promise.all([p1, p2])).toEqual([2, 4]);
  });
});
