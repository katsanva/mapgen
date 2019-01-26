import { BaseColorResolver } from './BaseColorResolver';
import { RGBColor, closest } from 'color-diff';

export class CIEDE2000ColorResolver extends BaseColorResolver {
  private palette: RGBColor[];

  constructor() {
    super();

    this.palette = this.colors.reduce((acc: RGBColor[], color) => {
      acc.push({
        R: color.rgb.r,
        G: color.rgb.g,
        B: color.rgb.b,
      });

      return acc;
    }, []);
  }

  protected resolve(hex: string) {
    const found = this.colors.find((c) => c.hexString === hex);

    if (found) {
      return found.colorId;
    }

    const color = this.hexToRGBCD(hex);

    const closestColor = closest(color, this.palette);

    return this.palette.indexOf(closestColor);
  }

  private hexToRGBCD(hex: string): RGBColor {
    const t = super.hexToRGB(hex);

    return {
      R: t.r,
      G: t.g,
      B: t.b,
    };
  }
}
