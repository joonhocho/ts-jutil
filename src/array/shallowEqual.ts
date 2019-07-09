export const shallowEqual = <T>(a: T[] | null, b: T[] | null): boolean => {
  if (a === b) {
    return true;
  }
  if (
    !a !== !b ||
    !a ||
    !b ||
    typeof a !== 'object' ||
    typeof b !== 'object' ||
    a.length !== b.length
  ) {
    return false;
  }

  const len = a.length;
  for (let i = 0; i < len; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
