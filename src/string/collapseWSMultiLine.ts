const allWS = /\s+/g;
const newline = /[\r\n]/;

const replaceCollapsedWS = (s: string): string =>
  newline.test(s) ? '\n' : ' ';

export const collapseWSMultiLine = (s: string): string => {
  if (s) {
    const t = s.trim();
    if (t) {
      return t.replace(allWS, replaceCollapsedWS);
    }
  }
  return '';
};
