/**
 * Pure URL resolution for public assets.
 */

export function isExternalImagePath(path: string | undefined | null): boolean {
  if (!path) return false;
  return path.startsWith('http') || path.startsWith('blob:') || path.startsWith('data:');
}

/**
 * Universal resolution for Next.js and standard tags.
 * Ensures all local assets start with /assets/
 */
export function resolvePublicImageUrl(path: string | undefined | null): string {
  if (!path) return '';
  
  // 1. External (http, blob, data) -> Return as is
  if (isExternalImagePath(path)) return path;

  // 2. Clean the path
  let cleanPath = path.trim();
  
  // Remove any double slashes at the start
  cleanPath = cleanPath.replace(/^\/+/, '/');

  // Strip the old prefix if it exists
  const PREFIX = '/dar-elmeamar-next-v2';
  if (cleanPath.startsWith(PREFIX)) {
    cleanPath = cleanPath.substring(PREFIX.length);
  }

  // Ensure it starts with /
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }

  // Now we have something like /modern-villa-v3.jpg or /assets/modern-villa-v3.jpg
  if (cleanPath.startsWith('/assets/')) {
    return cleanPath;
  }

  // Prepend /assets
  return `/assets${cleanPath}`;
}

/**
 * Returns the same for now since basePath is disabled.
 */
export function resolveFullUrl(path: string | undefined | null): string {
  return resolvePublicImageUrl(path);
}
