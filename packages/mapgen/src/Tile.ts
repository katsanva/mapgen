import { World } from './World';
import { Terrain } from './Terrain';

export class Tile {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  /**
   * Tile Class
   * @param terrain {Object} containing terrain information
   * @param rowPos {Integer} the row in the World where the tile is placed
   * @param colPos  {Integer} the column in the World where the tile is placed
   * @param world {Object} the World on which the Tile is placed (needed for the drawing context)
   */
  constructor(public terrain: Terrain, rowPos: number, colPos: number, world: World) {
    // The position on the World where the Tile is placed
    // This corrosponds to an index, World[row][col]

    // The position on the canvas where the Tile is placed
    this.x = world.colPostoCanvasX(colPos);
    this.y = world.rowPostoCanvasY(rowPos);

    // The size of the tile on the canvas
    this.width = world.width;
    this.height = world.height;
  }
}
