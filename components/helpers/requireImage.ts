import { Image } from 'react-native';

const imageMap: Record<string, any> = {
  '~/assets/images/card-image.jpg': require('~/assets/images/card-image.jpg'),
};

export function requireImage(path: string) {
  const source = imageMap[path];
  if (!source) {
    throw new Error(`Image not found: ${path}. Add it to the imageMap in requireImage.ts`);
  }

  return Image.resolveAssetSource(source);
}
