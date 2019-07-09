export const fromBase64 = (s: string): string =>
  Buffer.from(s, 'base64').toString('utf8');
