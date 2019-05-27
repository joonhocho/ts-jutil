const pattern = /^\d{4}-\d{1,2}-\d{1,2}$/;

export const parseYYYYMMDD = (value: string): Date | null => {
  if (pattern.test(value)) {
    const [y, m, d] = value.split('-');
    const year = parseInt(y, 10);
    const month = parseInt(m, 10);
    const day = parseInt(d, 10);
    const date = new Date(year, month - 1, day);
    if (
      !isNaN(date.getTime()) &&
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    ) {
      return date;
    }
  }
  return null;
};

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

export const getTime = (d: number | string | Date | null): number | null => {
  if (d == null) {
    return null;
  }
  if (typeof d === 'number') {
    return d;
  }
  if (typeof d === 'string') {
    return new Date(d).getTime() || null;
  }
  if (d.getTime) {
    return d.getTime() || null;
  }
  return null;
};
