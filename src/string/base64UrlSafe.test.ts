import { Buffer } from 'buffer';
import { base64FromUrlSafe } from './base64FromUrlSafe';
import { base64ToUrlSafe } from './base64ToUrlSafe';

test('base64ToUrlSafe, base64FromUrlSafe', () => {
  for (let i = 0; i < 1000; i += 1) {
    const s = String(i * i * i);
    const b64 = Buffer.from(s, 'utf8').toString('base64');
    const s64 = base64ToUrlSafe(b64);
    const b64s = base64FromUrlSafe(s64);
    expect(s64).toMatch(/^[a-z0-9_-]+$/i);
    expect(b64).toBe(b64s);
    Buffer.from(b64, 'base64').toString('utf8');
  }
});
