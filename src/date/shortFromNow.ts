export const shortFromNow = (ts: number | null, now = Date.now()): string => {
  if (ts == null) return '';
  const diff = ts - now;
  const sign = diff >= 0 ? '+' : '-';
  const abs = Math.abs(diff);

  const ms = abs;
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  const M = Math.floor(d / (365 / 12));
  const Y = Math.floor(d / 365);

  if (Y) {
    return `${sign}${Y}y`;
  }
  if (M) {
    return `${sign}${M}mo`;
  }
  if (d) {
    return `${sign}${d}d`;
  }
  if (h) {
    return `${sign}${h}h`;
  }
  if (m) {
    return `${sign}${m}m`;
  }
  if (s) {
    return `${sign}${s}s`;
  }
  return 'now';
};
