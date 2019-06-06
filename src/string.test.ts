import {
  capitalizeFirst,
  capitalizeWords,
  collapseWSMultiLine,
  collapseWSSingleLine,
  escapeHtmlChars,
  escapeRegExpChars,
  fromBase64,
  pad,
  padEnd,
  padStart,
  repeatString,
  split,
  stringify,
  toBase64,
  trim,
  trimLeft,
  trimRight,
  truncate,
  unescapeHtmlChars,
} from './string';

test('trim', () => {
  expect(trim('')).toBe('');
  expect(trim('a a')).toBe('a a');
  expect(trim(' a a')).toBe('a a');
  expect(trim(' a a ')).toBe('a a');
  expect(trim('  a a  ')).toBe('a a');
});

test('trimLeft', () => {
  expect(trimLeft('')).toBe('');
  expect(trimLeft('a a')).toBe('a a');
  expect(trimLeft(' a a')).toBe('a a');
  expect(trimLeft(' a a ')).toBe('a a ');
  expect(trimLeft('  a a  ')).toBe('a a  ');
});

test('trimRight', () => {
  expect(trimRight('')).toBe('');
  expect(trimRight('a a')).toBe('a a');
  expect(trimRight(' a a')).toBe(' a a');
  expect(trimRight(' a a ')).toBe(' a a');
  expect(trimRight('  a a  ')).toBe('  a a');
});

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

test('escapeHtmlChars / unescapeHtmlChars', () => {
  const src = '<script>&nbsp;</script>';
  const esc = escapeHtmlChars(src);
  expect(esc).toBe('&lt;script&gt;&amp;nbsp;&lt;/script&gt;');
  expect(unescapeHtmlChars(esc)).toBe(src);
});

test('escapeRegExpChars', () => {
  expect(escapeRegExpChars('-')).toBe('\\-');
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

test('repeatString', () => {
  expect(repeatString('123', 0)).toBe('');
  expect(repeatString('123', 1)).toBe('123');
  expect(repeatString('123', 2)).toBe('123123');
});

test('pad', () => {
  expect(pad('123', 0)).toBe('');
  expect(pad('123', 1)).toBe('1');
  expect(pad('123', 2)).toBe('12');
  expect(pad('123', 3)).toBe('123');
  expect(pad('123', 4)).toBe('1231');
  expect(pad('123', 5)).toBe('12312');
  expect(pad('123', 6)).toBe('123123');
});

test('padStart', () => {
  expect(padStart('abc', 0, '123')).toBe('abc');
  expect(padStart('abc', 1, '123')).toBe('abc');
  expect(padStart('abc', 2, '123')).toBe('abc');
  expect(padStart('abc', 3, '123')).toBe('abc');
  expect(padStart('abc', 4, '123')).toBe('1abc');
  expect(padStart('abc', 5, '123')).toBe('12abc');
  expect(padStart('abc', 6, '123')).toBe('123abc');
  expect(padStart('abc', 7, '123')).toBe('1231abc');
});

test('padEnd', () => {
  expect(padEnd('abc', 0, '123')).toBe('abc');
  expect(padEnd('abc', 1, '123')).toBe('abc');
  expect(padEnd('abc', 2, '123')).toBe('abc');
  expect(padEnd('abc', 3, '123')).toBe('abc');
  expect(padEnd('abc', 4, '123')).toBe('abc1');
  expect(padEnd('abc', 5, '123')).toBe('abc12');
  expect(padEnd('abc', 6, '123')).toBe('abc123');
  expect(padEnd('abc', 7, '123')).toBe('abc1231');
});
