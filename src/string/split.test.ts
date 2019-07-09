import { split } from './split';

describe('split', () => {
  test('should split a string to an array', () => {
    const list = split(',1,,2,3,,');
    expect(list).toEqual(['1', '2', '3']);
  });

  test('should split a string to an array', () => {
    const list = split(',1,,2,3,,'.split(','));
    expect(list).toEqual(['1', '2', '3']);
  });
});
