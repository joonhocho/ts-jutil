import { decodeURIComponentSafe, decodeURISafe } from './decodeURISafe';

test('decodeURIComponentSafe', () => {
  expect(decodeURIComponentSafe('')).toBe('');
  expect(decodeURIComponentSafe('%%20Visitors')).toBe('% Visitors');
  expect(decodeURIComponentSafe('%Directory%20Name%')).toBe('%Directory Name%');
  expect(decodeURIComponentSafe('%')).toBe('%');
  expect(decodeURIComponentSafe('%1')).toBe('%1');
  expect(decodeURIComponentSafe('%3F')).toBe('?');
  expect(decodeURIComponentSafe(encodeURIComponent(''))).toBe('');
  expect(decodeURIComponentSafe(encodeURIComponent('1'))).toBe('1');
  expect(decodeURIComponentSafe(encodeURIComponent('1a'))).toBe('1a');
  expect(decodeURIComponentSafe(encodeURIComponent('1a%'))).toBe('1a%');
  expect(decodeURIComponentSafe(encodeURIComponent('1a%?'))).toBe('1a%?');
  expect(decodeURIComponentSafe(encodeURIComponent('1a%?='))).toBe('1a%?=');
  expect(decodeURIComponentSafe(encodeURIComponent('1a%?=a'))).toBe('1a%?=a');
  expect(
    decodeURIComponentSafe(encodeURIComponent('https://www.talksub.com'))
  ).toBe('https://www.talksub.com');
});

test('decodeURISafe', () => {
  expect(decodeURISafe('')).toBe('');
  expect(decodeURISafe('%%20Visitors')).toBe('% Visitors');
  expect(decodeURISafe('%Directory%20Name%')).toBe('%Directory Name%');
  expect(decodeURISafe('%')).toBe('%');
  expect(decodeURISafe('%1')).toBe('%1');
  expect(decodeURISafe('%3F')).toBe('%3F');
  expect(decodeURISafe(encodeURI(''))).toBe('');
  expect(decodeURISafe(encodeURI('1'))).toBe('1');
  expect(decodeURISafe(encodeURI('1a'))).toBe('1a');
  expect(decodeURISafe(encodeURI('1a%'))).toBe('1a%');
  expect(decodeURISafe(encodeURI('1a%?'))).toBe('1a%?');
  expect(decodeURISafe(encodeURI('1a%?='))).toBe('1a%?=');
  expect(decodeURISafe(encodeURI('1a%?=a'))).toBe('1a%?=a');
  expect(decodeURISafe(encodeURI('https://www.talksub.com'))).toBe(
    'https://www.talksub.com'
  );
});
