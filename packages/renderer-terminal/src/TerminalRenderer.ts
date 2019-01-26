import { IRenderer } from '@mapgen/mapgen/lib/interfaces/IRenderer';
import { Tile } from '@mapgen/mapgen/lib/Tile';
import { Terminal, ScreenBuffer } from 'terminal-kit';

import colors from '../colors.json';

const DEFAULT_TILE_SIZE = 1;
const DEFAULT_COLOR = 213;

function hexToRgb(hex: string) {
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

interface IRGBColor {
  r: number;
  g: number;
  b: number;
}

function findDistance(c1: IRGBColor, c2: IRGBColor) {
  const dR = c1.r - c2.r;
  const dG = c1.g - c2.g;
  const dB = c1.b - c2.b;
  const dR2 = Math.pow(dR, 2);
  const dG2 = Math.pow(dG, 2);
  const dB2 = Math.pow(dB, 2);
  const r = dR / 2;

  return Math.sqrt(2 * dR2 + 4 * dG2 + 3 * dB2 + (r * (dR2 - dB2)) / 256);
}

function resolveClosestColor(hex: string) {
  const found = colors.find((c) => c.hexString === hex);

  if (found) {
    return found.colorId;
  }

  const rgbColor = hexToRgb(hex);

  const res = colors.map((value) => ({
    color: value.rgb,
    distance: findDistance(value.rgb, rgbColor),
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

const colorsMapping = new Map();

function resolveClosestColorWithCache(hex: string) {
  if (colorsMapping.has(hex)) {
    return colorsMapping.get(hex);
  }

  const resolved = resolveClosestColor(hex);

  colorsMapping.set(hex, resolved);

  return resolved;
}

export class TerminalRenderer implements IRenderer {
  constructor(
    private output: Terminal,
    public tileHeight: number = DEFAULT_TILE_SIZE,
    public tileWidth: number = DEFAULT_TILE_SIZE,
  ) {}

  get height() {
    return this.output.height;
  }

  get width() {
    return this.output.width;
  }

  public render(tile: Tile) {
    const sb = new ScreenBuffer({ dst: this.output, x: tile.x + 1, y: tile.y, height: tile.height, width: tile.width });

    const color = resolveClosestColorWithCache(tile.terrain.color);

    sb.fill({ attr: { color, bgColor: color } });
    sb.draw();
  }

  public clear() {
    const sb = new ScreenBuffer({ dst: this.output });
    const color = DEFAULT_COLOR;

    sb.fill({ attr: { color, bgColor: color } });
    sb.draw();
  }
}
