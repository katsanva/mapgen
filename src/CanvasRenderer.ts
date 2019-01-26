import { IRenderer } from './interfaces/IRenderer';
import { Tile } from './Tile';

export class CanvasRenderer implements IRenderer {
  private output: CanvasRenderingContext2D;

  constructor(private target: HTMLCanvasElement) {
    const context = target.getContext('2d');

    if (!context) {
      throw new Error('cannot get rendering context');
    }

    this.output = context;
  }

  public render(tile: Tile) {
    this.output.fillStyle = tile.terrain.color;
    this.output.fillRect(tile.x, tile.y, tile.width, tile.height);
  }

  public clear() {
    this.output.fillStyle = 'violet';
    this.output.fillRect(0, 0, this.target.height, this.target.width);
  }
}
