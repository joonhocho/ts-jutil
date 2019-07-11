import { splitIntoTwo } from './splitIntoTwo';

test('splitIntoTwo', () => {
  expect(splitIntoTwo('', ',')).toEqual(['']);
  expect(splitIntoTwo(',', ',')).toEqual(['', '']);
  expect(splitIntoTwo(',a', ',')).toEqual(['', 'a']);
  expect(splitIntoTwo('a,', ',')).toEqual(['a', '']);
  expect(splitIntoTwo(',1,,2,3,,', ',')).toEqual(['', '1,,2,3,,']);
  expect(splitIntoTwo('a,b', ',')).toEqual(['a', 'b']);
  expect(splitIntoTwo('a,,b', ',')).toEqual(['a', ',b']);
  expect(splitIntoTwo('a,,b', ',,')).toEqual(['a', 'b']);
});
