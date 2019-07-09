import { AsyncQueue } from './AsyncQueue';
import { sleep } from './promise/sleep';

test('AsyncQueue', async () => {
  const q = new AsyncQueue();

  expect(q.count()).toBe(0);
  expect(q.running()).toBe(false);

  const t = Date.now();
  const arr = [];

  q.add(async () => {
    arr.push(1);
    await sleep(100);
    arr.push(2);
    expect(Date.now() - t).toBeGreaterThanOrEqual(95);
  });

  arr.push(3);

  q.add(async () => {
    arr.push(4);
    await sleep(100);

    arr.push(5);
    expect(Date.now() - t).toBeGreaterThanOrEqual(190);
  });

  arr.push(6);

  q.add(async () => {
    arr.push(7);
    await sleep(100);

    arr.push(8);
    expect(Date.now() - t).toBeGreaterThanOrEqual(285);
  });

  arr.push(9);
  expect(Date.now() - t).toBeLessThan(100);

  await q.wait();

  arr.push(10);
  expect(Date.now() - t).toBeGreaterThanOrEqual(285);

  await q.wait();
  arr.push(11);

  expect(arr).toEqual([1, 3, 6, 9, 2, 4, 5, 7, 8, 10, 11]);
});
