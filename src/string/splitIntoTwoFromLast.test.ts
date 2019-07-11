import { splitIntoTwoFromLast } from './splitIntoTwoFromLast';

test('splitIntoTwoFromLast', () => {
  expect(splitIntoTwoFromLast('', ',')).toEqual(['']);
  expect(splitIntoTwoFromLast(',', ',')).toEqual(['', '']);
  expect(splitIntoTwoFromLast(',a', ',')).toEqual(['', 'a']);
  expect(splitIntoTwoFromLast('a,', ',')).toEqual(['a', '']);
  expect(splitIntoTwoFromLast(',1,,2,3,,', ',')).toEqual([',1,,2,3,', '']);
  expect(splitIntoTwoFromLast('a,b', ',')).toEqual(['a', 'b']);
  expect(splitIntoTwoFromLast('a,,b', ',')).toEqual(['a,', 'b']);
  expect(splitIntoTwoFromLast('a,,b', ',,')).toEqual(['a', 'b']);
});
