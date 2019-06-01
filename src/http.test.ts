import { getAuthorizationBearerToken } from './http';

test('getAuthorizationBearerToken', () => {
  expect(getAuthorizationBearerToken(undefined)).toBe(null);
  expect(getAuthorizationBearerToken(null)).toBe(null);
  expect(getAuthorizationBearerToken('')).toBe(null);
  expect(getAuthorizationBearerToken('a')).toBe('');
  expect(getAuthorizationBearerToken('Bearer')).toBe('');
  expect(getAuthorizationBearerToken('Bearer ')).toBe('');
  expect(getAuthorizationBearerToken('Bearer a')).toBe('a');
  expect(getAuthorizationBearerToken('Bearer abc')).toBe('abc');
});
