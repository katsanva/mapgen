import { IColorResolvable } from '../interfaces/IColorResolvable';
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

  protected resolve(hex: string) {
    return 0;
  }
}
