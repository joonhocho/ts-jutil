import { getIsEqual } from '_src/func/return';

// * matches 0 or more chars
// ? matches exactly 1 char

export const getWildcardStringMatcher = (
  pattern: string
): ((match: string) => boolean) => {
  const segments: string[] = [];
  let starCount = 0;
  let minLength = 0;
  let maxLength = 0;

  let segStartIndex = 0;
  for (let i = 0, len = pattern.length; i < len; i += 1) {
    const char = pattern[i];
    if (char === '*' || char === '?') {
      if (char === '*') {
        starCount += 1;
      }
      if (i > segStartIndex) {
        segments.push(pattern.substring(segStartIndex, i));
      }
      segments.push(char);
      segStartIndex = i + 1;
    }
  }

  if (!segments.length) {
    // no wildcard
    return getIsEqual(pattern);
  }

  if (segStartIndex < pattern.length) {
    segments.push(pattern.substring(segStartIndex));
  }

  if (starCount) {
    minLength = pattern.length - starCount;
    maxLength = Infinity;
  } else {
    maxLength = minLength = pattern.length;
  }

  return (match: string): boolean => {
    const { length } = match;
    if (length < minLength || length > maxLength) {
      return false;
    }

    let lookLeft = true;
    let segLeftIndex = 0;
    let segRightIndex = segments.length - 1;
    let leftPos = 0;
    let rightPos = match.length - 1;
    let leftIsStar = false;
    let rightIsStar = false;

    while (true) {
      if (lookLeft) {
        const segment = segments[segLeftIndex];
        segLeftIndex += 1;
        if (segment === '*') {
          leftIsStar = true;
          if (rightIsStar) {
            // noop
          } else {
            lookLeft = false;
          }
        } else if (segment === '?') {
          if (leftPos > rightPos) {
            // not enough chars to match for ?
            return false;
          }
          if (match[leftPos] === '*') {
            // ? cannot match *
            return false;
          }
          // move one char
          leftPos += 1;
        } else {
          const index = match.indexOf(segment, leftPos);
          if (index === -1 || index > rightPos + 1 - segment.length) {
            return false;
          }
          if (leftIsStar) {
            leftPos = index + segment.length;
            leftIsStar = false;
          } else {
            if (index !== leftPos) {
              return false;
            }
            leftPos += segment.length;
          }
        }
      } else {
        const segment = segments[segRightIndex];
        segRightIndex -= 1;
        if (segment === '*') {
          rightIsStar = true;
          if (leftIsStar) {
            // noop
          } else {
            lookLeft = true;
          }
        } else if (segment === '?') {
          if (leftPos > rightPos) {
            // not enough chars to match for ?
            return false;
          }
          if (match[rightPos] === '*') {
            // ? cannot match *
            return false;
          }
          // move one char
          rightPos -= 1;
        } else {
          const lastIndex = rightPos + 1 - segment.length;
          const index = match.lastIndexOf(segment, lastIndex);
          if (index === -1 || index > lastIndex) {
            return false;
          }
          if (rightIsStar) {
            rightPos = index - 1;
            rightIsStar = false;
          } else {
            if (index !== lastIndex) {
              return false;
            }
            rightPos -= segment.length;
          }
        }
      }
      if (segLeftIndex > segRightIndex) {
        break;
      }
    }

    return true;
  };
};
