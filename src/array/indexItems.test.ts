import { indexItems } from './indexItems';

describe('indexItems', () => {
  test('with key name', () => {
    const arr = [{ id: 1 }, {}, null, { id: 'a' }];
    expect(indexItems(arr, 'id' as any)).toEqual({
      1: arr[0],
      a: arr[3],
    });
  });

  test('with toKey function', () => {
    const arr = [{ id: 1 }, {}, null, { id: 'a' }, { id: 1, b: 1 }];
    expect(indexItems(arr, (x: any) => x && x.id)).toEqual({
      1: arr[4],
      a: arr[3],
    });
  });
});
