export const getProp = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
