import { toggle } from './toggle';

describe('toggle', () => {
  test('adds item if not exists', () => {
    const arr = [1, 2, 3];

    toggle(arr, 5);
    expect(arr).toEqual([1, 2, 3, 5]);

    toggle(arr, 5);
    expect(arr).toEqual([1, 2, 3]);
  });

  test('removes item if exists', () => {
    const arr = [1, 2, 3];
    toggle(arr, 2);
    expect(arr).toEqual([1, 3]);
  });
});
