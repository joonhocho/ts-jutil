const allWS = /\s+/g;

export const collapseWSSingleLine = (s: string): string => {
  if (s) {
    const t = s.trim();
    if (t) {
      return t.replace(allWS, ' ');
    }
  }
  return '';
};
