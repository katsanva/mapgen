import { IColorResolvable } from '../interfaces/IColorResolvable';
import { IRGBColor } from '../interfaces/IRGBColor';
import { ITerminalColor } from '../interfaces/ITerminalColor';

import definitions from '../colors.json';

export abstract class BaseColorResolver implements IColorResolvable {
  private cache: Map<string, number>;

  constructor(protected colors: ITerminalColor[] = definitions) {
    this.cache = new Map();
  }

  public resolveCached(hex: string) {
    if (this.cache.has(hex)) {
      return this.cache.get(hex) as number;
    }

    const resolved = this.resolve(hex);

    this.cache.set(hex, resolved);

    return resolved;
  }

  protected hexToRGB(hex: string): IRGBColor {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) {
      throw new Error('Improbable color string provided');
    }

    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }

  protected resolve(hex: string) {
    return 0;
  }
}
