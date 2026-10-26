export function getAssetUrl(path: string | undefined): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Handle legacy paths
  let clean = path;
  if (clean.startsWith('/src/assets/images/')) {
    clean = clean.replace('/src/assets/images/', '/assets/');
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = clean.startsWith('/') ? clean.slice(1) : clean;
  const cleanBase = base.endsWith('/') ? base : `${base}/`;

  // If path already starts with the base path, avoid double prefixing
  const baseSegment = cleanBase.replace(/^\/|\/$/g, '');
  if (baseSegment && cleanPath.startsWith(baseSegment + '/')) {
    return `/${cleanPath}`;
  }

  return `${cleanBase}${cleanPath}`;
}
