import { sleep } from './sleep';
import { withTimeout } from './withTimeout';

// jest.useFakeTimers();

test('withTimeout timeout', async () => {
  await expect(withTimeout(sleep(200), 100)).rejects.toMatchObject(
    new Error('timeout')
  );
});

test('withTimeout good', async () => {
  await expect(withTimeout(sleep(100), 200)).resolves.toBe(undefined);
});
