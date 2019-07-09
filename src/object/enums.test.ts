import { enums } from './enums';

describe('enums', () => {
  test('should create an enum map from an array', () => {
    expect(enums(['a', 'b'])).toEqual({ a: 1, b: 2 });
    expect(enums(['a', 'b'], 0)).toEqual({ a: 0, b: 1 });
  });
});
