export const maybeAdd = <T>(arr: T[], item: T): number => {
  if (arr.indexOf(item) === -1) {
    arr.push(item);
    return arr.length - 1;
  }
  return -1;
};
