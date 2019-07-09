export const maybeRemoveLast = <T>(arr: T[], item: T): number => {
  const index = arr.lastIndexOf(item);
  if (index !== -1) {
    arr.splice(index, 1);
  }
  return index;
};
