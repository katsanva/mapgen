import { World } from './World';
import { Terrain } from './Terrain';

// Tile Class

export class Tile{
  public canvas_x: number;
  public canvas_y: number;
  public tile_width: number;
  public tile_height: number;
  public c: CanvasRenderingContext2D;

  constructor(public terrain: Terrain, // {Object} containing terrain information
  public rowPos: number, // {Integer} the row in the World where the tile is placed
  public colPos: number, // {Integer} the column in the World where the tile is placed
  public world: World) { // {Object} the World on which the Tile is placed (needed for the drawing context)

  // The position on the World where the Tile is placed
  // This corrosponds to an index, World[row][col]
  this.rowPos = rowPos;
  this.colPos = colPos;

  // The position on the canvas where the Tile is placed
  this.canvas_x = world.colPostoCanvasX(colPos);
  this.canvas_y = world.rowPostoCanvasY(rowPos);

  // The size of the tile on the canvas
  this.tile_width = world.tile_width;
  this.tile_height = world.tile_height;

  // The Terrain of the Tile
  this.terrain = terrain;

  // The canvas
  this.c = world.c;
}

  // Renders the tile on the canvas
  render() {
    this.c.fillStyle = this.terrain.color;
    this.c.fillRect(this.canvas_x, this.canvas_y, this.tile_width, this.tile_height);
  }

};