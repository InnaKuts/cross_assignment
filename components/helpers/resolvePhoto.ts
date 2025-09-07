import { Image } from '~/data/models';

export function resolvePhoto(
  photo: Image | Record<string, never> | null | undefined
): Image | null {
  if (!photo || Object.keys(photo).length === 0) {
    return null;
  }

  return {
    uri: photo.uri,
    width: photo.width,
    height: photo.height,
  };
}
