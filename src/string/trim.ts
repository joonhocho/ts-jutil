export const trimPattern = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

export const trim = (str: string): string => str.replace(trimPattern, '');
