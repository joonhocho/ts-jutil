import { fromBase64 } from './fromBase64';
import { toBase64 } from './toBase64';

test('base64', () => {
  const s = '테스트test1234';
  expect(fromBase64(toBase64(s))).toBe(s);
  expect(toBase64(s)).toBe('7YWM7Iqk7Yq4dGVzdDEyMzQ=');
});
