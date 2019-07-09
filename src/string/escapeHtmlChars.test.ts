import { escapeHtmlChars } from './escapeHtmlChars';
import { unescapeHtmlChars } from './unescapeHtmlChars';

test('escapeHtmlChars / unescapeHtmlChars', () => {
  const src = '<script>&nbsp;</script>';
  const esc = escapeHtmlChars(src);
  expect(esc).toBe('&lt;script&gt;&amp;nbsp;&lt;/script&gt;');
  expect(unescapeHtmlChars(esc)).toBe(src);
});
