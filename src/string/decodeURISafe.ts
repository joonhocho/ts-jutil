const malformedRegex = /%(?![0-9][0-9a-fA-F]+)/g;

export const decodeURISafe = (s: string): string =>
  s && decodeURI(s.replace(malformedRegex, '%25'));

export const decodeURIComponentSafe = (s: string): string =>
  s && decodeURIComponent(s.replace(malformedRegex, '%25'));
