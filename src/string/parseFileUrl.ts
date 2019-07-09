export const parseFileUrl = (
  path: string
): {
  ext: string;
  hash: string;
  name: string;
  path: string;
  search: string;
} => {
  const p = path || '';
  const lastSlash = p.lastIndexOf('/');

  const pathname = lastSlash >= 0 ? p.substring(0, lastSlash + 1) : '';

  const base = lastSlash >= 0 ? p.substring(lastSlash + 1) : p;

  let name = base;

  const hIndex = name.indexOf('#');

  const hash = hIndex >= 0 ? name.substring(hIndex) : '';

  if (hIndex >= 0) {
    name = name.substring(0, hIndex);
  }

  const qIndex = name.indexOf('?');

  const search = qIndex >= 0 ? name.substring(qIndex) : '';

  if (qIndex >= 0) {
    name = name.substring(0, qIndex);
  }

  const dotIndex = name.lastIndexOf('.');

  const ext = dotIndex >= 0 ? name.substring(dotIndex) : '';

  if (dotIndex >= 0) {
    name = name.substring(0, dotIndex);
  }

  return {
    ext,
    hash,
    name,
    path: pathname,
    search,
  };
};
