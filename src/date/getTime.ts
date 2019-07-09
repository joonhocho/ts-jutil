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
