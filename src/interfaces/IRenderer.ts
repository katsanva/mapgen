import { Tile } from '../Tile';

export interface IRenderer {
  render(tile: Tile): void;
  clear(): void;
}
