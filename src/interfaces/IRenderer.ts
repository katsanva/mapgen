import { Tile } from '../Tile';

export interface IRenderer {
  height: number;
  width: number;
  tileHeight: number;
  tileWidth: number;

  render(tile: Tile): void;
  clear(): void;
}
