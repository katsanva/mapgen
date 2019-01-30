import { IRenderer } from '@mapgen/mapgen/lib/interfaces/IRenderer';
import { Tile } from '@mapgen/mapgen/lib/Tile';
import { Terminal, ScreenBuffer } from 'terminal-kit';
import { IColorResolvable } from './interfaces/IColorResolvable';
import { EuclideanColorResolver } from './color-resolvers/EuclideanColorResolver';
import { CIEDE2000ColorResolver } from './color-resolvers/CIEDE2000ColorResolver';

const DEFAULT_TILE_SIZE = 1;
const DEFAULT_COLOR = 213;

export class TerminalRenderer implements IRenderer {
  public tileHeight: number;
  public tileWidth: number;

  constructor(
    private output: Terminal,
    private colorResolver: IColorResolvable = new EuclideanColorResolver(),
    tileHeight: number = DEFAULT_TILE_SIZE,
    tileWidth: number = DEFAULT_TILE_SIZE,
  ) {
    this.tileHeight = tileHeight || DEFAULT_TILE_SIZE;
    this.tileWidth = tileWidth || DEFAULT_TILE_SIZE;
  }

  get height() {
    return this.output.height;
  }

  get width() {
    return this.output.width;
  }

  public render(tile: Tile) {
    const sb = new ScreenBuffer({ dst: this.output, x: tile.x + 1, y: tile.y, height: tile.height, width: tile.width });

    const color = this.colorResolver.resolveCached(tile.terrain.color);

    sb.fill({ attr: { color, bgColor: color } });
    sb.draw();
  }

  public clear() {
    const sb = new ScreenBuffer({ dst: this.output });
    const color = DEFAULT_COLOR;

    sb.fill({ attr: { color, bgColor: color } });
    sb.draw();
  }

  public sync() {
    return;
  }
}

export { EuclideanColorResolver, CIEDE2000ColorResolver };
