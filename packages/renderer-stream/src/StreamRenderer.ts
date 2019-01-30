import { IRenderer } from '@mapgen/mapgen/lib/interfaces/IRenderer';
import { Tile } from '@mapgen/mapgen/lib/Tile';
import { hexToRGB } from '@mapgen/renderer-terminal/lib/color-resolvers/hexToRGB';
import { PNG } from 'pngjs';
import { WriteStream } from 'fs';

const DEFAULT_TILE_SIZE = 1;

// function toHex(num: number) {
//   let hexString = num.toString(16);

//   if (hexString.length % 2) {
//     hexString = '0' + hexString;
//   }

//   return hexString;
// }

export class StreamRenderer implements IRenderer {
  private png: PNG;
  constructor(
    private output: WriteStream,
    public tileHeight: number = DEFAULT_TILE_SIZE,
    public tileWidth: number = DEFAULT_TILE_SIZE,
    public height: number,
    public width: number,
  ) {
    const bgColor = hexToRGB('#ee82ee');
    this.png = new PNG({
      height,
      width,
      bgColor: {
        red: bgColor.r,
        green: bgColor.g,
        blue: bgColor.b,
      },
    });
  }

  public render(tile: Tile) {
    const color = hexToRGB(tile.terrain.color);

    for (let y = tile.y; y < tile.y + tile.height; y++) {
      for (let x = tile.x; x < tile.x + tile.width; x++) {
        const idx = (this.width * x + y) * 4;

        // console.log(idx, color);

        this.png.data[idx] = color.r;
        this.png.data[idx + 1] = color.g;
        this.png.data[idx + 2] = color.b;
        this.png.data[idx + 3] = 0xff;
      }
    }
  }

  public sync() {
    this.png.pack().pipe(this.output);
  }

  public clear() {
    return;
  }
}
