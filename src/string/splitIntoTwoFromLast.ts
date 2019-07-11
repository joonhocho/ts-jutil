export const splitIntoTwoFromLast = (
  str: string,
  delimiter: string
): [string] | [string, string] => {
  if (str) {
    const index = str.lastIndexOf(delimiter);
    if (index === -1) {
      return [str];
    }
    return [str.substring(0, index), str.substring(index + delimiter.length)];
  }
  return [''];
};
