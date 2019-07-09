export const prependToSet = <T>(arr: T[], item: T): boolean => {
  if (arr.indexOf(item) === -1) {
    arr.unshift(item);
    return true;
  }
  return false;
};
