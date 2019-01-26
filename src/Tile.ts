import { World } from './World';
import { Terrain } from './Terrain';

export class Tile {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public c: CanvasRenderingContext2D;

  /**
   * Tile Class
   * @param terrain {Object} containing terrain information
   * @param rowPos {Integer} the row in the World where the tile is placed
   * @param colPos  {Integer} the column in the World where the tile is placed
   * @param world {Object} the World on which the Tile is placed (needed for the drawing context)
   */
  constructor(public terrain: Terrain, public rowPos: number, public colPos: number, public world: World) {
    // The position on the World where the Tile is placed
    // This corrosponds to an index, World[row][col]
    this.rowPos = rowPos;
    this.colPos = colPos;

    // The position on the canvas where the Tile is placed
    this.x = world.colPostoCanvasX(colPos);
    this.y = world.rowPostoCanvasY(rowPos);

    // The size of the tile on the canvas
    this.width = world.width;
    this.height = world.height;

    // The Terrain of the Tile
    this.terrain = terrain;

    // The canvas
    this.c = world.c;
  }

  // Renders the tile on the canvas
  public render() {
    this.c.fillStyle = this.terrain.color;
    this.c.fillRect(this.x, this.y, this.width, this.height);
  }
}
