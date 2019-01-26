import { BaseColorResolver } from './BaseColorResolver';
import { IRGBColor } from '../interfaces/IRGBColor';

export class EuclideanColorResolver extends BaseColorResolver {
  private static findDistance(c1: IRGBColor, c2: IRGBColor) {
    const dR = c1.r - c2.r;
    const dG = c1.g - c2.g;
    const dB = c1.b - c2.b;
    const dR2 = Math.pow(dR, 2);
    const dG2 = Math.pow(dG, 2);
    const dB2 = Math.pow(dB, 2);
    const r = dR / 2;

    return Math.sqrt(2 * dR2 + 4 * dG2 + 3 * dB2 + (r * (dR2 - dB2)) / 256);
  }

  protected resolve(hex: string) {
    const found = this.colors.find((c) => c.hexString === hex);

    if (found) {
      return found.colorId;
    }

    const rgbColor = this.hexToRGB(hex);

    const res = this.colors.map((value) => ({
      color: value.rgb,
      distance: EuclideanColorResolver.findDistance(value.rgb, rgbColor),
      colorId: value.colorId,
    }));

    const min = res.reduce(
      (acc: any, val) => {
        if (val.distance < acc.distance) {
          return val;
        }

        return acc;
      },
      { distance: Number.POSITIVE_INFINITY, color: null },
    );

    return min.colorId;
  }
}
