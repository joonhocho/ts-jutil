import { sleep } from './promise';
import { UpdateRunner } from './UpdateRunner';

test('UpdateRunner', async () => {
  let c = 0;
  const arr: string[] = [];

  const q = new UpdateRunner(
    async (): Promise<void> => {
      arr.push(`${c}0`);
      await sleep(100);
      arr.push(`${c}1`);
    }
  );

  expect(q.queued()).toBe(false);
  expect(q.running()).toBe(false);
  expect(arr).toEqual([]);

  q.queue();
  c = 1;

  expect(q.queued()).toBe(false);
  expect(q.running()).toBe(true);
  expect(arr).toEqual(['00']);

  q.queue();
  c = 2;

  expect(q.queued()).toBe(true);
  expect(q.running()).toBe(true);
  expect(arr).toEqual(['00']);

  q.queue();
  c = 3;

  expect(q.queued()).toBe(true);
  expect(q.running()).toBe(true);
  expect(arr).toEqual(['00']);

  await q.wait();

  expect(q.queued()).toBe(false);
  expect(q.running()).toBe(false);
  expect(arr).toEqual(['00', '31', '30', '31']);

  await q.wait();

  expect(q.queued()).toBe(false);
  expect(q.running()).toBe(false);
  expect(arr).toEqual(['00', '31', '30', '31']);

  c = 4;
  q.queue();
  c = 5;

  expect(q.queued()).toBe(false);
  expect(q.running()).toBe(true);
  expect(arr).toEqual(['00', '31', '30', '31', '40']);

  c = 6;
  q.queue();
  c = 7;

  expect(q.queued()).toBe(true);
  expect(q.running()).toBe(true);
  expect(arr).toEqual(['00', '31', '30', '31', '40']);

  await q.wait();
  c = 8;

  expect(q.queued()).toBe(false);
  expect(q.running()).toBe(false);
  expect(arr).toEqual(['00', '31', '30', '31', '40', '71', '70', '71']);
});
