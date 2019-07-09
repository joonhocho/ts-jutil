import { sleep } from './sleep';

test('sleep', async () => {
  const t = Date.now();
  await sleep(150);
  expect(Date.now() - t).toBeGreaterThanOrEqual(140);
});
