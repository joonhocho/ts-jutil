import { collapseWSMultiLine } from './collapseWSMultiLine';

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
