import {
  capitalizeFirst,
  capitalizeWords,
  collapseWSMultiLine,
  collapseWSSingleLine,
  escapeRegExpChars,
  fromBase64,
  split,
  stringify,
  toBase64,
  truncate,
} from './string';

test('stringify', () => {
  expect(stringify({ a: 1 })).toBe('{\n  "a": 1\n}');
  expect(stringify({ a: 1, b: 2 })).toBe('{\n  "a": 1,\n  "b": 2\n}');
});

describe('truncate', () => {
  test('returns a truncated string to the max length', () => {
    expect(truncate('1234567890', 4)).toBe('1234');
    expect(truncate('1234567890', 4, '.')).toBe('123.');
    expect(truncate('1234567890', 4, '...')).toBe('1...');
    expect(truncate('1234567890', 12, '...')).toBe('1234567890');
    expect(truncate('1234567890', 10, '...')).toBe('1234567890');
    expect(truncate('1234567890', 9, '...')).toBe('123456...');
  });
});

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

describe('escapeRegExpChars', () => {
  test('should escape RegExp Characters', () => {
    expect(escapeRegExpChars('-')).toBe('\\-');
  });
});

describe('collapseWSSingleLine', () => {
  test("collapses all whitespace into ' '", () => {
    expect(collapseWSSingleLine(null as any)).toBe('');
    expect(collapseWSSingleLine('')).toBe('');
    expect(collapseWSSingleLine('  ')).toBe('');
    expect(collapseWSSingleLine(' a ')).toBe('a');
    expect(collapseWSSingleLine(' aa a   \n\r \n \t  a   \t a ')).toBe(
      'aa a a a'
    );
  });
});

describe('collapseWSMultiLine', () => {
  test("collapses all whitespace into ' '", () => {
    expect(collapseWSMultiLine(null as any)).toBe('');
    expect(collapseWSMultiLine('')).toBe('');
    expect(collapseWSMultiLine('  ')).toBe('');
    expect(collapseWSMultiLine(' a ')).toBe('a');
    expect(collapseWSMultiLine(' aa a   \n\r\r \n \t  a   \t a ')).toBe(
      'aa a\na a'
    );
  });
});

describe('capitalizeWords', () => {
  test('capitalizes words', () => {
    expect(capitalizeWords(null as any)).toBe('');
    expect(capitalizeWords('')).toBe('');
    expect(capitalizeWords(' ')).toBe(' ');
    expect(capitalizeWords('aaa bbb\tccc\nddd  \n\t eee.f. g,h, i')).toBe(
      'Aaa Bbb\tCcc\nDdd  \n\t Eee.f. G,h, I'
    );
    expect(capitalizeWords('AAA bBb CcC')).toBe('AAA BBb CcC');
  });
});

describe('capitalizeFirst', () => {
  test('capitalizes first letter', () => {
    expect(capitalizeFirst(null as any)).toBe('');
    expect(capitalizeFirst('')).toBe('');
    expect(capitalizeFirst(' ')).toBe(' ');
    expect(capitalizeFirst('a')).toBe('A');
    expect(capitalizeFirst(' a')).toBe(' a');
    expect(capitalizeFirst('ab')).toBe('Ab');
    expect(capitalizeFirst('ab c')).toBe('Ab c');
    expect(capitalizeFirst('AB C')).toBe('AB C');
  });
});

test('base64', () => {
  const s = '테스트test1234';
  expect(fromBase64(toBase64(s))).toBe(s);
  expect(toBase64(s)).toBe('7YWM7Iqk7Yq4dGVzdDEyMzQ=');
});
