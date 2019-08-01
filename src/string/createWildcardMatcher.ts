import { returnTrue } from '_src/func/return';

// /a/**/b/*/c
// ** matches 0 or more parts
// *+ matches 1 or more parts
// * matches exactly part
// ** and *+ can appear only once

const tooManyTooWild = '*?, **, *+ can appear only once';

const wild = '*';
const wild01 = '*?';
const wild0p = '**';
const wild1p = '*+';

export const createWildcardMatcher = (
  pattern: string[]
): ((match: string[]) => boolean) => {
  let minLength = 0;
  let maxLength = 0;
  let tooWildCount = 0;
  const beforeTooWild: string[] = [];
  const afterTooWild: string[] = [];

  for (let i = 0, len = pattern.length; i < len; i += 1) {
    const part = pattern[i];
    switch (part) {
      case wild01:
        // 0 or 1
        maxLength += 1;
        if (tooWildCount > 0) {
          throw new Error(tooManyTooWild);
        }
        tooWildCount += 1;
        break;
      case wild0p:
        // 0 or more
        // minLength += 0;
        maxLength = Infinity;
        if (tooWildCount > 0) {
          throw new Error(tooManyTooWild);
        }
        tooWildCount += 1;
        break;
      case wild1p:
        // 1 or more
        minLength += 1;
        maxLength = Infinity;
        if (tooWildCount > 0) {
          throw new Error(tooManyTooWild);
        }
        tooWildCount += 1;
        break;
      case wild:
        // 1
        minLength += 1;
        maxLength += 1;
        (tooWildCount > 0 ? afterTooWild : beforeTooWild).push(part);
        break;
      default:
        minLength += 1;
        maxLength += 1;
        (tooWildCount > 0 ? afterTooWild : beforeTooWild).push(part);
    }
  }

  return (match: string[]): boolean => {
    const { length } = match;
    if (length >= minLength && length <= maxLength) {
      for (let i = 0, len = beforeTooWild.length; i < len; i += 1) {
        const item = beforeTooWild[i];
        if (item !== wild && item !== match[i]) {
          return false;
        }
      }

      for (
        let i = 0, len = afterTooWild.length, startIndex = length - len;
        i < len;
        i += 1
      ) {
        const item = afterTooWild[i];
        if (item !== wild && item !== match[startIndex + i]) {
          return false;
        }
      }

      return true;
    }
    return false;
  };
};

export const createWildcardStringMatcher = (
  pattern: string,
  separator = '/'
): ((match: string) => boolean) => {
  if (pattern === '**') {
    return returnTrue;
  }
  if (pattern.indexOf('*') === -1) {
    return (match: string): boolean => match === pattern;
  }
  const matcher = createWildcardMatcher(pattern.split(separator));
  return (match: string): boolean => matcher(match.split(separator));
};
