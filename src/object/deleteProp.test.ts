import { deleteProp } from './deleteProp';

test('deleteProp', () => {
  expect(deleteProp({}, 'a')).toEqual({});
  expect(deleteProp({ a: 1 }, 'a')).toEqual({});
  expect(deleteProp({ a: 1 }, 'b')).toEqual({ a: 1 });
  expect(deleteProp({ a: 1, b: 2 }, 'b')).toEqual({ a: 1 });
});
