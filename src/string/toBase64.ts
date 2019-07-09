export const toBase64 = (s: string): string =>
  Buffer.from(s, 'utf8').toString('base64');
