export const uniqueByKey = <
  T extends { [k in K]: number | string },
  K extends string
>(
  list: T[],
  key: K
): T[] => {
  if (!list.length) {
    return [];
  }

  const exists: {
    [k: number]: 1;
    [k: string]: 1;
  } = {};

  return list.filter((x) => {
    const k = x[key];
    if (exists[k] === 1) {
      return false;
    }
    exists[k] = 1;
    return true;
  });
};
