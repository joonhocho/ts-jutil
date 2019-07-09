import { collapseWSSingleLine } from './collapseWSSingleLine';

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
