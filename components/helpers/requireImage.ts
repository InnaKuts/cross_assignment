import { Image, ImageSourcePropType } from 'react-native';

const imageMap: Record<string, any> = {
  '~/assets/images/card-image.jpg': require('~/assets/images/card-image.jpg'),
};

export function requireImage(path: string) {
  const source = imageMap[path];
  if (!source) {
    throw new Error(`Image not found: ${path}. Add it to the imageMap in requireImage.ts`);
  }

  const { width, height } = Image.resolveAssetSource(source);
  return { source, width, height };
}

// For cases where you already have the image source
export function getImageDimensions(source: ImageSourcePropType) {
  const resolvedSource = Image.resolveAssetSource(source);
  return {
    source,
    width: resolvedSource.width,
    height: resolvedSource.height,
  };
}
