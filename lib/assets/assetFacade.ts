import { resolvePublicImageUrl, resolveFullUrl } from './urlResolution';
import { preloadImages } from '@/utils/imageUtils';

/**
 * Facade for asset resolution and preloading.
 * Keeps a single import surface for UI; delegates side effects to imageUtils.
 */
export const assets = {
  resolveUrl: resolvePublicImageUrl,
  resolveFullUrl: resolveFullUrl,
  preloadMany: (paths: string[]) => preloadImages(paths),
} as const;

export type AssetFacade = typeof assets;
