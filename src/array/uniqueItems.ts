export const uniqueItems = <T extends number | string>(list: T[]): T[] => {
  if (!list.length) {
    return [];
  }

  const exists: {
    [k: number]: 1;
    [k: string]: 1;
  } = {};

  return list.filter((x) => {
    if (exists[x] === 1) {
      return false;
    }
    exists[x] = 1;
    return true;
  });
};
