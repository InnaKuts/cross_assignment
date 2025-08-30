import { colors } from './colors';
import { size } from './size';
import { semanticFonts } from './fonts';

export const ds = {
  colors,
  size,

  breakpoints: {
    phone: 0,
    tablet: 728,
    desktop: 1024,
  },

  spacing: {
    xxs: 6,
    xs: size[2],
    sm: size[3],
    md: size[4],
    lg: size[5],
    xl: size[6],
    xxl: size[7],
  },

  borderRadius: {
    xs: size[1],
    sm: size[2],
    md: size[3],
    lg: size[4],
    xl: size[5],
    xxl: size[6],
    full: 9999,
  },

  borderWidth: {
    xs: 1,
    sm: 1.5,
    md: 2,
    lg: 2.5,
    xl: 3,
  },

  font: semanticFonts,
} as const;
