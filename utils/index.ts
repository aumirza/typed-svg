import { RGBColor } from "react-color";

export const toRgbString = (rgb: RGBColor) =>
  `rgba(${rgb.r}, ${rgb.g}, ${rgb.b},${rgb.a})`;

export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: 1,
      }
    : { r: 0, g: 0, b: 0, a: 1 };
};
