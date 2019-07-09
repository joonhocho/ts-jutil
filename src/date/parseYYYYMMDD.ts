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
