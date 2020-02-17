export const truncateWords = (
  str: string,
  preferredLength: number,
  maxLength: number,
  suffix = '...',
  regex?: RegExp
): string => {
  if (str.length > maxLength) {
    const reg = regex || /\s+/g;
    // truncate to 500 chars, but allow until 600 chars
    let match: RegExpExecArray | null;
    // tslint:disable-next-line: no-conditional-assignment
    while ((match = reg.exec(str))) {
      if (match.index >= preferredLength) {
        // if there is enough left to truncate, truncate
        return `${str.substring(0, match.index)}${suffix}`;
      }
    }
  }
  return str;
};
