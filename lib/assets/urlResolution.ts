/**
 * Pure URL resolution for public assets.
 */

export function isExternalImagePath(path: string | undefined | null): boolean {
  if (!path) return false;
  return path.startsWith('http') || path.startsWith('blob:') || path.startsWith('data:');
}

/**
 * Universal resolution for Next.js and standard tags.
 * Ensures all local assets are prefixed with the repository name and correct folder.
 */
export function resolvePublicImageUrl(path: string | undefined | null): string {
  if (!path) return '';

  // 1. External (http, blob, data) -> Return as is
  if (isExternalImagePath(path)) return path;

  // 2. Clean the path
  let cleanPath = path.trim();

  // Remove any double slashes at the start
  cleanPath = cleanPath.replace(/^\/+/, '/');

  // Strip any old or current repository prefixes to avoid doubling
  const REPO_PREFIXES = ['/dar-el-meamar-next', '/dar-elmeamar-next-v2'];
  for (const prefix of REPO_PREFIXES) {
    if (cleanPath.startsWith(prefix)) {
      cleanPath = cleanPath.substring(prefix.length);
    }
  }

  // Remove leading slash for consistent processing
  cleanPath = cleanPath.replace(/^\/+/, '');

  // In production (GitHub Pages), we need the repository name as a base path
  // In development, Next.js serves from the root
  const basePath = process.env.NODE_ENV === 'production' ? '/dar-elmeamar-next-v2' : '';

  // Prevent duplicate assets/ prefix
  if (cleanPath.startsWith('assets/')) {
    return `${basePath}/${cleanPath}`;
  }

  // Default to prepending /assets/ for project images
  return `${basePath}/assets/${cleanPath}`;
}

/**
 * Returns the same for now.
 */
export function resolveFullUrl(path: string | undefined | null): string {
  return resolvePublicImageUrl(path);
}
